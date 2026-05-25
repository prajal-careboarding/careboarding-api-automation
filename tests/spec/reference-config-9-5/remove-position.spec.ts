import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('REMOVE POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Remove Position Reference Override (204)', async () => {
    // URL: /onboarding/config/reference/position-templates//
    const response = await api.delete('/onboarding/config/reference/position-templates//');
    expect(response.ok()).toBeTruthy();
  });
});
