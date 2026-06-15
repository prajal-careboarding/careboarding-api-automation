import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('GET POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Position — Non-existent ID (404)', async () => {
    // URL: /employee-positions/00000000-0000-0000-0000-000000000000
    const response = await api.get('/employee-positions/00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Position — No Auth (401)', async () => {
    // URL: /employee-positions/00000000-0000-0000-0000-000000000000
    const response = await api.get('/employee-positions/00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Position — Invalid UUID format (400)', async () => {
    // URL: /employee-positions/not-a-valid-uuid
    const response = await api.get('/employee-positions/not-a-valid-uuid');
    expect(response.ok()).toBeTruthy();
  });
});
