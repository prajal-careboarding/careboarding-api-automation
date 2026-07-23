import { test, expect, request } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { checkTestableSectionExists, getTestSectionId } from '@helpers/section-helper';
import { getTestTemplateId } from '@helpers/template-helper';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';
import { SystemSectionIds } from 'tests/enums/system-sections.enums';
import { SystemTemplateCategoryIds } from 'tests/enums/system-template-categories.enums';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';

test.describe('RETRIEVE NEXT API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
  });

  test('Retrieve next order of Field', async ({ request }) => {
    let sectionId = await getTestSectionId(api, OnboardingTemplateType.DEMOGRAPHICS);
    const response = await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER_FIELDS(sectionId));
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Retrieve next order of Section', async () => {
    const response = await api.get(
      ENDPOINTS.SECTIONS.NEXT_ORDER_SECTIONS(SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS)
    );
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
