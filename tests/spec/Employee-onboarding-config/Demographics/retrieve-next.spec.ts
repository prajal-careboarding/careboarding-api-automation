import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('RETRIEVE NEXT API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Retrieve next order of Field', async () => {
    // URL: /onboarding/config/fields/:sectionId
    const response = await api.get('/onboarding/config/fields/:sectionId');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Retrieve next order of Section', async () => {
    // URL: /onboarding/config/sections/:templateId
    const response = await api.get('/onboarding/config/sections/:templateId');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
