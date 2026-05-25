import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE DELETED CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete deleted Category - (404)', async () => {
    // URL: /onboarding/config/template-categories/a142ca48-8f71-47fb-a9b1-d995dcb62dbe
    const response = await api.delete('/onboarding/config/template-categories/a142ca48-8f71-47fb-a9b1-d995dcb62dbe');
    expect(response.ok()).toBeTruthy();
  });
});
