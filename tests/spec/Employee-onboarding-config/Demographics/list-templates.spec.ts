import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('LIST TEMPLATES API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List Templates DEMOGRAPHICS', async () => {
    // URL: /onboarding/config/templates?type=DEMOGRAPHICS
    const response = await api.get('/onboarding/config/templates?type=DEMOGRAPHICS');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
