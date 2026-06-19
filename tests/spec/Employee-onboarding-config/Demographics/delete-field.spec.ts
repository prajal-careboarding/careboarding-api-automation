import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import {
  checkTestableSectionExists,
  createNewTestSection,
  getFieldsNextOrder,
  getTestSectionId,
} from '@helpers/section-helper';
import { getDemographicsFixtures } from '@fixtures/demographics.fixture';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
import { createNewTestField } from '@helpers/field-helper';
import { DataTarget, FieldType } from 'tests/enums/field.enums';
import { RandomGenerator } from '@utils/random-generator';

test.describe('DELETE FIELD API', () => {
  // test.describe.configure({ mode: 'serial' });
  let api: ApiClient;
  let testSectionId: string;
  let deleteableFieldId: string;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);

    // Get testable section
    testSectionId = (await checkTestableSectionExists(request))
      ? await getTestSectionId(request)
      : await createNewTestSection(
          request,
          await getDemographicsFixtures(request),
          SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
        );

    const payload = [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Short Text Field ' + new RandomGenerator().integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, testSectionId),
      },
    ];

    // Create deleteable field and get that fieldId
    deleteableFieldId = await createNewTestField(request, payload, testSectionId);
  });

  test('Delete Field', async () => {
    const response = await api.delete(ENDPOINTS.FIELDS.DELETE_FIELDS(deleteableFieldId));
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Field Non-Existing Id 404', async () => {
    const response = await api.delete(ENDPOINTS.FIELDS.DELETE_FIELDS('00000000-0000-0000-0000-999999999999'));
    expect(response.ok()).toBeFalsy();
  });

  test('Delete Field SYSTEM FIELD 403', async () => {
    const response = await api.delete(ENDPOINTS.FIELDS.DELETE_FIELDS('00000000-0000-0000-0002-000000000001'));

    expect(response.ok()).toBeFalsy();
  });
});
