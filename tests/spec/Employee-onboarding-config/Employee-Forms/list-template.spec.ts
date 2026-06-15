import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('LIST TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List Template - FORMS', async () => {
    // URL: /onboarding/config/templates?type=AGENCY_FORM
    const response = await api.get('/onboarding/config/templates?type=AGENCY_FORM');
    expect(response.ok()).toBeTruthy();
  });
});
