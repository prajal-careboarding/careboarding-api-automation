import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('LIST CATEGORIES API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List Categories - Filter non-existing category', async () => {
    // URL: /onboarding/config/template-categories?templateType=qwyeiuqw
    const response = await api.get('/onboarding/config/template-categories?templateType=qwyeiuqw');
    expect(response.ok()).toBeTruthy();
  });

  test('List Categories — Filter POLICY', async () => {
    // URL: /onboarding/config/template-categories?templateType=POLICY
    const response = await api.get('/onboarding/config/template-categories?templateType=POLICY');
    expect(response.ok()).toBeTruthy();
  });

  test('List Categories — Filter DOCUMENT_REQUIREMENT', async () => {
    // URL: /onboarding/config/template-categories?templateType=DOCUMENT_REQUIREMENT
    const response = await api.get('/onboarding/config/template-categories?templateType=DOCUMENT_REQUIREMENT');
    expect(response.ok()).toBeTruthy();
  });
});
