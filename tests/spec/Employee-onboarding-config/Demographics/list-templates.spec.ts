import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { SystemTemplateIds, SystemTemplateNames } from 'tests/enums/system-templates.enums';
import { SchemaValidator } from '@helpers/schema-validator';
import Ajv from 'ajv';
import { logger } from '@utils/logger';

test.describe('LIST TEMPLATES API', () => {
  let api: ApiClient;
  let demographicsTemplateId: string = SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS;
  let demographicsTemplateName: string = SystemTemplateNames.EMPLOYEE_DEMOGRAPHICS;
  let ajv = new Ajv({ strict: false });

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  test('List Templates DEMOGRAPHICS', async () => {
    const response = await api.get('/onboarding/config/templates?type=DEMOGRAPHICS');
    const data = await response.json();
    const isValid = ajv.validate(SchemaValidator.loadSchema('list-demographics.schema.json'), data);
    if (!isValid) {
      logger.error(ajv.errorsText());
    }
    expect(isValid).toBeTruthy();
  });
});
