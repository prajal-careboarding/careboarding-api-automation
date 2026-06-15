import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('GET ALL POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get all Position Templates PositionId', async () => {
    // URL: /onboarding/config/position-templates
    const response = await api.get('/onboarding/config/position-templates');
    expect(response.ok()).toBeTruthy();
  });

  test('Get all Position Templates without PositionId 404', async () => {
    // URL: /onboarding/config/position-templates
    const response = await api.get('/onboarding/config/position-templates');
    expect(response.ok()).toBeTruthy();
  });

  test('Get all Position Templates HHA', async () => {
    // URL: /onboarding/config/position-templates/?tab=FORMS
    const response = await api.get('/onboarding/config/position-templates/?tab=FORMS');
    expect(response.ok()).toBeTruthy();
  });
});
