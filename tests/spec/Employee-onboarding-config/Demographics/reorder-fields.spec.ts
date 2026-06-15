import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { ReorderFieldsRequest } from '../../../models/request/employee-onboarding-config/demographics/reorder-fields';

test.describe('REORDER FIELDS API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Reorder Fields 200', async () => {
    // URL: /onboarding/config/sections//fields/reorder
    const payload: ReorderFieldsRequest = []; // TODO: Populate payload
    const response = await api.put('/onboarding/config/sections//fields/reorder', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
