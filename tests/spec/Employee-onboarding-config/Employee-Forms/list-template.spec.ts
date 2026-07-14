import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';

test.describe('LIST TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
  });

  test('List Default Templates - FORMS', async () => {
    // URL: /onboarding/config/templates?type=AGENCY_FORM
    const response = await api.get(
      ENDPOINTS.TEMPLATES.GET_TEMPLATE(OnboardingTemplateType.GOVERNMENT_FORM, true)
    );
    console.dir(await response.json(), { depth: null });
    expect(response.ok()).toBeTruthy();
  });

  test('List Template - FORMS', async () => {
    // URL: /onboarding/config/templates?type=AGENCY_FORM
    const response = await api.get(
      ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE(OnboardingTemplateType.AGENCY_FORM)
    );
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
