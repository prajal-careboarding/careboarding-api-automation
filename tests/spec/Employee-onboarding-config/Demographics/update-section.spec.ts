import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { UpdateSectionRequest } from '../../../models/request/employee-onboarding-config/demographics/update-section';

test.describe('UPDATE SECTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Section DEMOGRAPHICS', async () => {
    // URL: /onboarding/config/sections/
    const payload: UpdateSectionRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/sections/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Section Copy', async () => {
    // URL: /onboarding/config/sections/
    const payload: UpdateSectionRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/sections/', payload);
    expect(response.ok()).toBeTruthy();
  });
});
