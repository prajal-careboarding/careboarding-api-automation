import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { UpdateReferenceTemplate204Request, UpdateReferenceTemplateSystemTemplate403Request } from '../../models/request/reference-config-9-5/update-reference-template';


test.describe('UPDATE REFERENCE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Reference Template (204)', async () => {
    // URL: /onboarding/config/reference/templates/
    const payload: UpdateReferenceTemplate204Request = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/reference/templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Reference Template — System template (403)', async () => {
    // URL: /onboarding/config/reference/templates/00000000-0000-4000-8000-000020000001
    const payload: UpdateReferenceTemplateSystemTemplate403Request = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/reference/templates/00000000-0000-4000-8000-000020000001', payload);
    expect(response.ok()).toBeTruthy();
  });
});
