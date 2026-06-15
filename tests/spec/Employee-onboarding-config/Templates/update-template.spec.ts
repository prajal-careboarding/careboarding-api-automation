import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { UpdateTemplateRequest } from '../../../models/request/employee-onboarding-config/templates/update-template';

test.describe('UPDATE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Template', async () => {
    // URL: /onboarding/config/templates/
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template FORMS', async () => {
    // URL: /onboarding/config/templates/491fbfff-2f76-46cf-89a9-c5d60999fb66
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/491fbfff-2f76-46cf-89a9-c5d60999fb66', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template — toggle Status', async () => {
    // URL: /onboarding/config/templates/:templateId
    const payload: UpdateTemplateRequest = {}; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/:templateId', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template — Assign to positions', async () => {
    // URL: /onboarding/config/templates/
    const payload: UpdateTemplateRequest = {
      assignPositions: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template — Assign to Non-Existing Positions', async () => {
    // URL: /onboarding/config/templates/
    const payload: UpdateTemplateRequest = {
      assignPositions: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Template — Remove from all positions', async () => {
    // URL: /onboarding/config/templates/
    const payload: UpdateTemplateRequest = {
      assignPositions: [],
    }; // TODO: Populate payload
    const response = await api.put('/onboarding/config/templates/', payload);
    expect(response.ok()).toBeTruthy();
  });
});
