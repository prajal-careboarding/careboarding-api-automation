import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { UpdateCategoryRequest } from '../../../models/request/Employee-onboarding-config/Template-categories/update-category';

test.describe('UPDATE CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Category (200)', async () => {
    // URL: /onboarding/config/template-categories/
    const payload: UpdateCategoryRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Category min Name (400))', async () => {
    // URL: /onboarding/config/template-categories/
    const payload: UpdateCategoryRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Category — with Conditional Logic', async () => {
    // URL: /onboarding/config/template-categories/
    const payload: UpdateCategoryRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Category — Unknown key (strict schema) (400)', async () => {
    // URL: /onboarding/config/template-categories/
    const payload: UpdateCategoryRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/template-categories/', payload);
    expect(response.ok()).toBeTruthy();
  });
});
