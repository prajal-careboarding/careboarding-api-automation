const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, '..', 'Onboarding Configuration API V4.postman_collection.json');
const baseTestDir = path.join(__dirname, '..', 'tests', 'spec');
const baseModelReqDir = path.join(__dirname, '..', 'tests', 'models', 'request');
const baseModelResDir = path.join(__dirname, '..', 'tests', 'models', 'response');

if (!fs.existsSync(collectionPath)) {
  console.error("Collection file not found at", collectionPath);
  process.exit(1);
}

const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

function cleanName(name) {
  if (!name) return 'unknown';
  return name.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function cleanInterfaceName(name) {
    if (!name) return 'Unknown';
    let cleaned = name.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    if (!cleaned) return "AnyType";
    if (/^\d/.test(cleaned)) cleaned = 'T' + cleaned;
    return cleaned;
}

function getGroupName(reqName) {
    if (!reqName) return 'unknown';
    // Remove (201), (400) etc to get clean action name
    let clean = reqName.replace(/\(\d{3}\)/g, '').trim();
    // Special handling for common prefixes
    const prefixes = ["Create", "Update", "Delete", "Get", "List", "Set", "Remove", "Submit"];
    const words = clean.split(' ');
    
    if (words.length >= 2 && prefixes.includes(words[0])) {
        // e.g., "Create Fields" -> "create-fields"
        // Also handle "Create Template Category" -> "create-template-category" (take up to 3 words if it makes sense, but 2 is safer)
        let endIdx = 2;
        if (words.length >= 3 && (words[2].toLowerCase() === 'category' || words[2].toLowerCase() === 'template' || words[2].toLowerCase() === 'question' || words[2].toLowerCase() === 'position')) {
            endIdx = 3;
        }
        return cleanName(words.slice(0, endIdx).join('-')).toLowerCase();
    }
    return cleanName(words.slice(0, 2).join('-')).toLowerCase();
}

function generateInterface(jsonString, interfaceName) {
    try {
        const obj = JSON.parse(jsonString);
        let props = [];
        if (Array.isArray(obj)) {
            return `export type ${interfaceName} = any[];\n`;
        }
        for (const [key, value] of Object.entries(obj)) {
            let type = typeof value;
            if (Array.isArray(value)) type = 'any[]';
            else if (value === null) type = 'any';
            const validKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
            props.push(`  ${validKey}?: ${type};`);
        }
        return `export interface ${interfaceName} {\n${props.join('\n')}\n}\n`;
    } catch (e) {
        return `// Could not parse JSON for ${interfaceName}\nexport interface ${interfaceName} {}\n`;
    }
}

function ensureDirSync(dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }
}

function extractUrl(request) {
    if (!request || !request.url) return '/';
    let raw = request.url.raw || (typeof request.url === 'string' ? request.url : '');
    return raw.replace(/\{\{[^}]+\}\}/g, '').replace(/^\/+/, '/');
}

// Data structure:
// folderSpecs[folderName][groupName] = { tests: [], reqInterfaces: Set, resInterfaces: Set }
const folderSpecs = {};

function processItem(items, currentPath = []) {
    items.forEach(item => {
        if (item.item) {
            processItem(item.item, [...currentPath, item.name || 'Folder']);
        } else {
            const folderName = currentPath.length > 0 ? cleanName(currentPath.join('-')).toLowerCase() : 'root';
            const reqName = item.name || 'Unnamed Request';
            const groupName = getGroupName(reqName);
            
            if (!folderSpecs[folderName]) folderSpecs[folderName] = {};
            if (!folderSpecs[folderName][groupName]) {
                folderSpecs[folderName][groupName] = {
                    tests: [],
                    reqInterfaces: new Map(), // name -> TS string
                    resInterfaces: new Map()
                };
            }
            
            const group = folderSpecs[folderName][groupName];
            
            const method = item.request ? item.request.method : 'GET';
            const url = extractUrl(item.request);
            
            // Append a unique identifier if multiple requests have same name but different payload
            const baseInterfaceName = cleanInterfaceName(reqName);
            let reqInterfaceName = baseInterfaceName + 'Request';
            let resInterfaceName = baseInterfaceName + 'Response';

            let reqImport = '';
            let resImport = '';

            // Request Body
            if (item.request && item.request.body && item.request.body.raw && item.request.body.mode === 'raw') {
                const ts = generateInterface(item.request.body.raw, reqInterfaceName);
                if (!group.reqInterfaces.has(reqInterfaceName)) {
                    group.reqInterfaces.set(reqInterfaceName, ts);
                }
                reqImport = reqInterfaceName;
            }

            // Response Body
            if (item.response && item.response.length > 0 && item.response[0].body) {
                const ts = generateInterface(item.response[0].body, resInterfaceName);
                if (!group.resInterfaces.has(resInterfaceName)) {
                    group.resInterfaces.set(resInterfaceName, ts);
                }
                resImport = resInterfaceName;
            }

            group.tests.push(`
  test('${reqName.replace(/'/g, "\\'")}', async () => {
    // URL: ${url}
    ${reqImport ? `const payload: ${reqImport} = {}; // TODO: Populate payload\n    ` : ''}const response = await api.${method.toLowerCase()}('${url}'${reqImport ? `, payload` : ''});
    expect(response.ok()).toBeTruthy();
  });`);
        }
    });
}

processItem(collection.item);

// Write files
for (const [folderName, groups] of Object.entries(folderSpecs)) {
    const specDir = path.join(baseTestDir, folderName);
    const modelReqDir = path.join(baseModelReqDir, folderName);
    const modelResDir = path.join(baseModelResDir, folderName);
    
    ensureDirSync(specDir);
    ensureDirSync(modelReqDir);
    ensureDirSync(modelResDir);
    
    for (const [groupName, data] of Object.entries(groups)) {
        let importsBlock = '';
        
        // Write consolidated Request models for this group
        if (data.reqInterfaces.size > 0) {
            const reqContent = Array.from(data.reqInterfaces.values()).join('\n');
            fs.writeFileSync(path.join(modelReqDir, `${groupName}.ts`), reqContent);
            const interfaceNames = Array.from(data.reqInterfaces.keys()).join(', ');
            importsBlock += `import { ${interfaceNames} } from '../../models/request/${folderName}/${groupName}';\n`;
        }
        
        // Write consolidated Response models for this group
        if (data.resInterfaces.size > 0) {
            const resContent = Array.from(data.resInterfaces.values()).join('\n');
            fs.writeFileSync(path.join(modelResDir, `${groupName}.ts`), resContent);
            const interfaceNames = Array.from(data.resInterfaces.keys()).join(', ');
            importsBlock += `import { ${interfaceNames} } from '../../models/response/${folderName}/${groupName}';\n`;
        }
        
        const specContent = `import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
${importsBlock}

test.describe('${groupName.replace(/-/g, ' ').toUpperCase()} API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });
${data.tests.join('\n')}
});
`;
        fs.writeFileSync(path.join(specDir, `${groupName}.spec.ts`), specContent);
    }
}

console.log("Generation complete!");
