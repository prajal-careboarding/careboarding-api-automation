import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('GET ONBOARDING API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Onboarding Dashboard', async () => {
    // URL: /onboarding/dashboard?employeeId=
    const response = await api.get('/onboarding/dashboard?employeeId=');
    expect(response.ok()).toBeTruthy();
  });
});
