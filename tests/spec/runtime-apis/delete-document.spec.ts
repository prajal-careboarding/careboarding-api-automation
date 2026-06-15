import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('DELETE DOCUMENT API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Document', async () => {
    // URL: /onboarding/tasks//documents/
    const response = await api.delete('/onboarding/tasks//documents/');
    expect(response.ok()).toBeTruthy();
  });
});
