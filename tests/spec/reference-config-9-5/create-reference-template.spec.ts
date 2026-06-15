import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { CreateReferenceTemplate201Request, CreateReferenceTemplateMissingName400Request } from '../../models/request/reference-config-9-5/create-reference-template';


test.describe('CREATE REFERENCE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Reference Template (201)', async () => {
    // URL: /onboarding/config/reference/templates
    const payload: CreateReferenceTemplate201Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Reference Template — Missing name (400)', async () => {
    // URL: /onboarding/config/reference/templates
    const payload: CreateReferenceTemplateMissingName400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/templates', payload);
    expect(response.ok()).toBeTruthy();
  });
});
