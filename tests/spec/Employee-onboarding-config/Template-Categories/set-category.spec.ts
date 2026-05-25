import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { SetCategoryRequirementsRequest } from '../../../models/request/Employee-onboarding-config/Template-categories/set-category';

test.describe('SET CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Set Category Requirements REQUIRED', async () => {
    // URL: /onboarding/config/template-categories/88742f92-fc96-402d-8e75-bdcc95c6b798/requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch(
      '/onboarding/config/template-categories/88742f92-fc96-402d-8e75-bdcc95c6b798/requirements',
      payload
    );
    expect(response.ok()).toBeTruthy();
  });

  test('Set Category Requirements OR', async () => {
    // URL: /onboarding/config/template-categories/03c6a513-769b-49c8-8f09-0eb40507a730/requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch(
      '/onboarding/config/template-categories/03c6a513-769b-49c8-8f09-0eb40507a730/requirements',
      payload
    );
    expect(response.ok()).toBeTruthy();
  });

  test('Set Category Requirements AND', async () => {
    // URL: /onboarding/config/template-categories/a268be7d-767e-4853-a90f-87a1938fbf0d/requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch(
      '/onboarding/config/template-categories/a268be7d-767e-4853-a90f-87a1938fbf0d/requirements',
      payload
    );
    expect(response.ok()).toBeTruthy();
  });

  test('Set Category Requirements — Clear (200)', async () => {
    // URL: /onboarding/config/template-categories//requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories//requirements', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Set Category Requirements — Invalid minDocuments (400)', async () => {
    // URL: /onboarding/config/template-categories//requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories//requirements', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Set Category Requirements — OR rule with 1 group (400)', async () => {
    // URL: /onboarding/config/template-categories//requirements
    const payload: SetCategoryRequirementsRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories//requirements', payload);
    expect(response.ok()).toBeTruthy();
  });
});
