import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../../tests/helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { assertGeneralSuccessResponse, assertGeneralErrorResponse } from '@helpers/assertion-helper';
import { SchemaValidator } from '@helpers/schema-validator';
import { createNewTestSection, getSectionsNextOrder } from '@helpers/section-helper';
import {
  checkTestableTemplateExists,
  createNewTestTemplate,
  getTestTemplateId,
} from '@helpers/template-helper';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';
import { RandomGenerator } from '@utils/random-generator';
import {
  allFieldTypesTestCases,
  CreateFieldTestCase,
  multiSectionMultiFieldTestCases,
  qaEdgeCasesScenarios,
} from '../../../test-data/providers/create-employee-form-fields.provider';
import Ajv from 'ajv';
import { logger } from '@utils/logger';
import addFormats from 'ajv-formats';

const random = new RandomGenerator();
const successSchema = SchemaValidator.loadSchema('create-template.schema.json');
const ajv = new Ajv();
addFormats(ajv);

async function runTestCase(api: ApiClient, tc: CreateFieldTestCase, sectionId?: string) {
  const payload = typeof tc.payload === 'function' ? await tc.payload(api, sectionId ?? '') : tc.payload;

  console.log('Payload : ', JSON.stringify(payload, null, 2));

  const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);

  console.log('Response : ', JSON.stringify(await response.json(), null, 2));

  const expected = tc.expected;
  const result = await response.json();
  if (tc.expected.success) {
    const result = await assertGeneralSuccessResponse(response, {
      statusCode: tc.expected.status,
      message: tc.expected.message,
    });
    if (tc.expected.validateSchema) {
      const isValid = ajv.validate(successSchema, result);
      if (!isValid) {
        logger.error(`Schema validation failed: ${ajv.errorsText()}`);
        expect(isValid).toBeTruthy();
      }
    }
    if (tc.expected.assertCount) {
      expect(result.data.count).toBe(payload.length);
    }
  } else {
    await assertGeneralErrorResponse(response, {
      statusCode: tc.expected.status,
    });
  }
}

async function setupTestTemplate(request: any) {
  const api = new ApiClient(request);
  const templateId = (await checkTestableTemplateExists(request, OnboardingTemplateType.AGENCY_FORM))
    ? await getTestTemplateId(request, OnboardingTemplateType.AGENCY_FORM)
    : await createNewTestTemplate(request, `QA_TEST_TEMPLATE`, OnboardingTemplateType.AGENCY_FORM);

  return templateId;
}

async function setupTestSection(request: any): Promise<string> {
  const templateId = await setupTestTemplate(request);
  const api = new ApiClient(request);
  const createSection = await api.post(ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(templateId), {
    name: `QA_SCENARIO_SECTION_${random.integer(5)}`,
    description: 'section for qa scenarios',
    order: await getSectionsNextOrder(api, templateId),
    isRepeatable: false,
  });
  const res = await createSection.json();
  return res.data.id;
}

// ─── All Field Types in One Section ───────────────────────────────────────────
// Valid and running properly //
test.describe('CREATE ALL FIELD TYPES IN ONE SECTION', () => {
  test.describe.configure({ mode: 'serial' });

  let api: ApiClient;
  let templateId: string;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
  });

  for (const tc of allFieldTypesTestCases) {
    test(tc.name, async () => {
      await runTestCase(api, tc);
    });
  }
});

// ─── All Field Types in One Section ───────────────────────────────────────────
// Valid and running properly //
test.describe('CREATE MULTIPLE FIELDS IN MULTIPLE SECTION', () => {
  test.describe.configure({ mode: 'serial' });

  let api: ApiClient;
  let templateId: string;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
  });

  for (const tc of multiSectionMultiFieldTestCases) {
    test(tc.name, async () => {
      await runTestCase(api, tc);
    });
  }
});
// ─── Basic Field Type Creation ────────────────────────────────────────────────

// test.describe('BASIC FIELD TYPE CREATION', () => {
//   test.describe.configure({ mode: 'serial' });

//   let api: ApiClient;
//   let sectionId: string;

//   test.beforeEach(async ({ request }) => {
//     await new LoginHelper(request).login();
//     api = new ApiClient(request);
//     sectionId = await setupTestSection(request);
//   });

//   for (const tc of basicFieldTypeTestCases) {
//     test(tc.name, async () => {
//       await runTestCase(api, tc.sectionId ?? sectionId, tc);
//     });
//   }
// });

// ─── QA Scenarios ─────────────────────────────────────────────────────────────
// Valid and running properly //
test.describe('QA - Edge Cases Scenarios', () => {
  test.describe.configure({ mode: 'serial' });

  let api: ApiClient;
  let sectionId: string;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
    sectionId = await setupTestSection(request);
  });

  for (const tc of qaEdgeCasesScenarios) {
    test(tc.name, async () => {
      await runTestCase(api, tc, tc.sectionId ?? sectionId);
    });
  }
});
