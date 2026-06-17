import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { SystemTemplateIds, SystemTemplateNames } from 'tests/enums/system-templates.enums';
import { SchemaValidator } from '@helpers/schema-validator';
import { DataHelper } from '@helpers/data-helper';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { logger } from '@utils/logger';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { DataTarget } from 'tests/enums/field.enums';

test.describe('LIST TEMPLATES API', () => {
  let api: ApiClient;
  let ajv = new Ajv();
  addFormats(ajv);
  let demographicsSchema = SchemaValidator.loadSchema('list-demographics.schema.json');

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  test('List Templates DEMOGRAPHICS - Check Schema', async () => {
    const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
    const data = await response.json();
    console.dir(data, { depth: null });
    const isValid = ajv.validate(demographicsSchema, data);
    if (!isValid) {
      console.log(ajv.errorsText());
    }
    expect(isValid).toBeTruthy();
  });

  test('List Templates DEMOGRAPHICS - Check Default Seeded Section and Fields', async () => {
    const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
    const data = await response.json();

    // Validate schema
    const isValid = ajv.validate(demographicsSchema, data);
    if (!isValid) {
      console.log(ajv.errorsText());
    }
    expect(isValid).toBeTruthy();

    // Load static seeded template data
    const seededData = DataHelper.loadStaticData<{ success: boolean; message: string; data: any[] }>(
      'get-template-data-seeded.json'
    );

    // Validate overall response structure
    expect(data.success).toBe(seededData.success);
    expect(data.message).toBe(seededData.message);
    expect(data.data).toBeInstanceOf(Array);

    const actualTemplate = data.data.find((t: any) => t.type === 'DEMOGRAPHICS');
    const expectedTemplate = seededData.data.find((t: any) => t.type === 'DEMOGRAPHICS');

    expect(actualTemplate).toBeDefined();
    expect(expectedTemplate).toBeDefined();

    // Helper to sanitize dynamic fields for a deep equality comparison
    const sanitizeTemplate = (template: any) => {
      const copy = JSON.parse(JSON.stringify(template));
      delete copy.createdAt;
      delete copy.updatedAt;
      delete copy.deletedAt;
      return copy;
    };

    expect(sanitizeTemplate(actualTemplate)).toEqual(sanitizeTemplate(expectedTemplate));
  });
});
