import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { ReorderFieldsRequest } from '../../../models/request/Employee-onboarding-config/Demographics/reorder-fields';

test.describe('FAIL REORDER API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('[Fail] Reorder Fields Same Order 409', async () => {
    // URL: /onboarding/config/sections//fields/reorder
    const payload: ReorderFieldsRequest = []; // TODO: Populate payload
    const response = await api.put('/onboarding/config/sections//fields/reorder', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
