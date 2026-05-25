import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('GET TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Template by ID - 200', async () => {
    // URL: /onboarding/config/templates/
    const response = await api.get('/onboarding/config/templates/');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Template by ID', async () => {
    // URL: /onboarding/config/templates/:templateId
    const response = await api.get('/onboarding/config/templates/:templateId');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Template by ID - non existing Id', async () => {
    // URL: /onboarding/config/templates/
    const response = await api.get('/onboarding/config/templates/');
    expect(response.ok()).toBeTruthy();
  });
});
