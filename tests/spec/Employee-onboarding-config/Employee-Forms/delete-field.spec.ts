import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE FIELD API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Field', async () => {
    // URL: /onboarding/config/fields/3afda956-866a-4dc3-b46f-3ed11cbfa251
    const response = await api.delete('/onboarding/config/fields/3afda956-866a-4dc3-b46f-3ed11cbfa251');
    expect(response.ok()).toBeTruthy();
  });
});
