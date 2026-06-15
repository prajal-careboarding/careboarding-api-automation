import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { CreatePositionRequest } from '../../../models/request/employee-onboarding-config/employee-positions/create-position';

test.describe('CREATE POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Position', async () => {
    // URL: /employee-positions
    const payload: CreatePositionRequest = {
      name: 'Test Position',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Missing name (400)', async () => {
    // URL: /employee-positions
    const payload: any = {
      description: 'Missing Name',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Empty name (400)', async () => {
    // URL: /employee-positions
    const payload: CreatePositionRequest = {
      name: '',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Invalid branchId (400)', async () => {
    // URL: /employee-positions
    const payload: CreatePositionRequest = {
      name: 'Invalid Branch',
      branchId: 'invalid-branch-uuid',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Empty body (400)', async () => {
    // URL: /employee-positions
    const payload = {}; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Max name length (400)', async () => {
    // URL: /employee-positions
    const payload: CreatePositionRequest = {
      name: 'a'.repeat(256),
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Duplicate name (409)', async () => {
    // URL: /employee-positions
    const payload: CreatePositionRequest = {
      name: 'Duplicate Position',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Position — Extra unknown fields (200)', async () => {
    // URL: /employee-positions
    const payload: any = {
      name: 'Extra Fields Position',
      unknownField: 'value',
    }; // TODO: Populate payload
    const response = await api.post('/employee-positions', payload);
    expect(response.ok()).toBeTruthy();
  });
});
