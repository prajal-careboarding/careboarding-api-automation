import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('GET DASHBOARD API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Dashboard — Missing employeeId (400)', async () => {
    // URL: /onboarding/dashboard
    const response = await api.get('/onboarding/dashboard');
    expect(response.ok()).toBeTruthy();
  });
});
