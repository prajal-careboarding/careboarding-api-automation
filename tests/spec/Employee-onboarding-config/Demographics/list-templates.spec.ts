import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { LoginHelper } from '@helpers/loginHelper';

test.describe('LIST TEMPLATES API', () => {
  let api: ApiClient;
  let demographicsTemplateId: string;

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  test('List Templates DEMOGRAPHICS', async () => {
    // URL: /onboarding/config/templates?type=DEMOGRAPHICS
    console.time('start-time');
    const response = await api.get('/onboarding/config/templates?system=true&status=ACTIVE');
    console.log(await response.body());
    console.timeEnd('start-time');

    expect(response.ok()).toBeTruthy();
  });
});
