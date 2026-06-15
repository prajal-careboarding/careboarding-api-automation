import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { BulkSavePositionTemplatesRequest } from '../../../models/request/employee-onboarding-config/employee-position-templates/bulk-save';

test.describe('BULK SAVE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Bulk Save Position Templates Assign POLICIES 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'POLICIES',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates Assign FORMS 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'FORMS',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates Assign Deleted FORMS', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'FORMS',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates Assign DOCUMENTS 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'DOCUMENTS',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates Assign DOCUMENTS Newly Created template 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'DOCUMENTS',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates Assign POLICIES Retroactive assignment 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'POLICIES',
      templateIds: [],
      retroactive: true,
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save Position Templates — Remove All 200', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'POLICIES',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save — Missing tab (400)', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: any = {
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Bulk Save — Invalid tab (400)', async () => {
    // URL: /onboarding/config/position-templates/
    const payload: BulkSavePositionTemplatesRequest = {
      tab: 'INVALID_TAB',
      templateIds: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/position-templates/', payload);
    expect(response.ok()).toBeTruthy();
  });
});
