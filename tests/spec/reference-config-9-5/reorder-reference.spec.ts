import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { ReorderReferenceQuestions204Request } from '../../models/request/reference-config-9-5/reorder-reference';


test.describe('REORDER REFERENCE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Reorder Reference Questions (204)', async () => {
    // URL: /onboarding/config/reference/questions/reorder
    const payload: ReorderReferenceQuestions204Request = []; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/reference/questions/reorder', payload);
    expect(response.ok()).toBeTruthy();
  });
});
