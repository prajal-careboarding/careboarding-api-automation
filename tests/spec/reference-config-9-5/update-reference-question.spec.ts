import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { UpdateReferenceQuestion204Request, UpdateReferenceQuestionSystemQuestion403Request } from '../../models/request/reference-config-9-5/update-reference-question';


test.describe('UPDATE REFERENCE QUESTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Reference Question (204)', async () => {
    // URL: /onboarding/config/reference/questions/
    const payload: UpdateReferenceQuestion204Request = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/reference/questions/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Reference Question — System question (403)', async () => {
    // URL: /onboarding/config/reference/questions/
    const payload: UpdateReferenceQuestionSystemQuestion403Request = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/reference/questions/', payload);
    expect(response.ok()).toBeTruthy();
  });
});
