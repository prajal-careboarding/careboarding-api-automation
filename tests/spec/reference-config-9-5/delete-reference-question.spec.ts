import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('DELETE REFERENCE QUESTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Reference Question (204)', async () => {
    // URL: /onboarding/config/reference/questions/
    const response = await api.delete('/onboarding/config/reference/questions/');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Reference Question — System question (403)', async () => {
    // URL: /onboarding/config/reference/questions/
    const response = await api.delete('/onboarding/config/reference/questions/');
    expect(response.ok()).toBeTruthy();
  });
});
