import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('DELETE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Template', async () => {
    // URL: /onboarding/config/templates/:templateId
    const response = await api.delete('/onboarding/config/templates/:templateId');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Template Already Deleted', async () => {
    // URL: /onboarding/config/templates/21592126-3177-46bc-8623-d61ca8a17c33
    const response = await api.delete('/onboarding/config/templates/21592126-3177-46bc-8623-d61ca8a17c33');
    expect(response.ok()).toBeTruthy();
  });
});
