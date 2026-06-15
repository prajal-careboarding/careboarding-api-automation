import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { CreateTemplateRequest } from '../../../models/request/employee-onboarding-config/employee-forms/create-template';

test.describe('CREATE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Template', async () => {
    // URL: /onboarding/config/templates
    const payload: CreateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });
});
