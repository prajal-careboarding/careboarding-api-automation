import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { UpdateTemplateRequest } from '../../../models/request/employee-onboarding-config/employee-forms/update-template';

test.describe('UPDATE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Template FORMS', async () => {
    // URL: /onboarding/config/templates/:templateId
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/:templateId', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template Section', async () => {
    // URL: /onboarding/config/templates/14bdfc65-3b62-436f-9539-857395462aa0
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/14bdfc65-3b62-436f-9539-857395462aa0', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template Field', async () => {
    // URL: /onboarding/config/templates/14bdfc65-3b62-436f-9539-857395462aa0
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/14bdfc65-3b62-436f-9539-857395462aa0', payload);
    expect(response.ok()).toBeTruthy();
  });
});
