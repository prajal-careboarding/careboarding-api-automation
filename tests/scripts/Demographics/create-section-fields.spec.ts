import { ApiClient } from '@helpers/ApiClient';
import { LoginHelper } from '@helpers/loginHelper';
import { DataHelper } from '@helpers/DataHelper';
import { test, expect } from '@playwright/test';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';

const testSectionId = 'eadd4124-f24b-41be-abe6-c8c151f3d673';

test.describe('Demographics - Section and Fields', () => {
  test.beforeAll(async ({ request }) => {
    const login = new LoginHelper(request);
    await login.login();
  });

  test('Create Section /Fields', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const uniqueLabel = DataHelper.uniqueName('Field');
    const createPayload = [
      {
        key: uniqueLabel.toLowerCase().replace(/\s+/g, '_'),
        component: 'TextInput',
        type: 'SHORT_TEXT',
        label: uniqueLabel,
        isRequired: false,
        dataTarget: 'EAV',
        order: 13,
      },
    ];

    const res = await apiClient.post(ENDPOINTS.FIELDS.CREATE_FIELDS(testSectionId), createPayload);
    const resBody = await res.json();
    console.dir(resBody);
  });
});
