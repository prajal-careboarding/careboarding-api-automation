import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('LOAD TASK API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Load Task', async () => {
    // URL: /onboarding/tasks/
    const response = await api.get('/onboarding/tasks/');
    expect(response.ok()).toBeTruthy();
  });
});
