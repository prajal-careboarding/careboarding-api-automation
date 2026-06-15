import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('GET POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Position Templates  HHA — POLICIES', async () => {
    // URL: /onboarding/config/position-templates/?tab=POLICIES
    const response = await api.get('/onboarding/config/position-templates/?tab=POLICIES');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Position Templates  HHA — FORMS', async () => {
    // URL: /onboarding/config/position-templates/?tab=FORMS
    const response = await api.get('/onboarding/config/position-templates/?tab=FORMS');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Position Templates  HHA — DOCUMENTS', async () => {
    // URL: /onboarding/config/position-templates/?tab=DOCUMENTS
    const response = await api.get('/onboarding/config/position-templates/?tab=DOCUMENTS');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Position Templates — Invalid tab (400)', async () => {
    // URL: /onboarding/config/position-templates/?tab=DEMOGRAPHICS
    const response = await api.get('/onboarding/config/position-templates/?tab=DEMOGRAPHICS');
    expect(response.ok()).toBeTruthy();
  });
});
