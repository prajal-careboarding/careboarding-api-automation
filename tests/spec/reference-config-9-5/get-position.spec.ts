import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('GET POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Position Reference Config', async () => {
    // URL: /onboarding/config/reference/position-config/
    const response = await api.get('/onboarding/config/reference/position-config/');
    expect(response.ok()).toBeTruthy();
  });
});
