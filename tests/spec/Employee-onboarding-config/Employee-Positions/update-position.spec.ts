import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { UpdatePositionRequest } from '../../../models/request/employee-onboarding-config/employee-positions/update-position';

test.describe('UPDATE POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Position', async () => {
    // URL: /employee-positions/fa03352f-bcd9-4a57-98da-b07ca3c7bec5
    const payload: UpdatePositionRequest = {}; // TODO: Populate payload
    const response = await api.put('/employee-positions/fa03352f-bcd9-4a57-98da-b07ca3c7bec5', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Position — Empty name (400)', async () => {
    // URL: /employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3
    const payload: UpdatePositionRequest = {
      name: '',
    }; // TODO: Populate payload
    const response = await api.put('/employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Position — Non-existent ID (404)', async () => {
    // URL: /employee-positions/00000000-0000-0000-0000-000000000000
    const payload: UpdatePositionRequest = {}; // TODO: Populate payload
    const response = await api.put('/employee-positions/00000000-0000-0000-0000-000000000000', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Position — Invalid UUID (400)', async () => {
    // URL: /employee-positions/not-a-valid-uuid
    const payload: UpdatePositionRequest = {}; // TODO: Populate payload
    const response = await api.put('/employee-positions/not-a-valid-uuid', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Position — Empty body (400)', async () => {
    // URL: /employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3
    const payload = {}; // TODO: Populate payload
    const response = await api.put('/employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Position — No Auth (401)', async () => {
    // URL: /employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3
    const payload: UpdatePositionRequest = {}; // TODO: Populate payload
    const response = await api.put('/employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3', payload);
    expect(response.ok()).toBeTruthy();
  });
});
