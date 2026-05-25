import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { ReorderSectionsRequest } from '../../../models/request/Employee-onboarding-config/Demographics/reorder-sections';

test.describe('REORDER SECTIONS API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Reorder Sections', async () => {
    // URL: /onboarding/config/templates//sections/reorder
    const payload: ReorderSectionsRequest = []; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates//sections/reorder', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Reorder Sections Duplicate Order', async () => {
    // URL: /onboarding/config/templates//sections/reorder
    const payload: ReorderSectionsRequest = []; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates//sections/reorder', payload);
    expect(response.ok()).toBeTruthy();
  });
});
