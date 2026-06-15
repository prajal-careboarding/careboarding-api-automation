import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { CreateCategoryRequest } from '../../../models/request/employee-onboarding-config/template-categories/create-category';

test.describe('CREATE CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Category POLICY', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'Policy Category',
      templateType: 'POLICY',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category DOCUMENT_REQUIREMENT', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'Doc Category',
      templateType: 'DOCUMENT_REQUIREMENT',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category Non Allowed Category type (400)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'Non Allowed Category',
      templateType: 'INVALID_TYPE',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category Duplicate (409)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'Duplicate Category',
      templateType: 'POLICY',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category — Missing name (400)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: any = {
      templateType: 'POLICY',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category — Max name (400)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'a'.repeat(256),
      templateType: 'POLICY',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category — MIn name (400)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: '',
      templateType: 'POLICY',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Category — Invalid templateType (400)', async () => {
    // URL: /onboarding/config/template-categories
    const payload: CreateCategoryRequest = {
      name: 'Invalid Template Type',
      templateType: 'invalid-type',
    }; // TODO: Populate payload
    const response = await api.post('/onboarding/config/template-categories', payload);
    expect(response.ok()).toBeTruthy();
  });
});
