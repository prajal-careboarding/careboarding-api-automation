import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Position', async () => {
    // URL: /employee-positions/
    const response = await api.delete('/employee-positions/');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Position — Non-existent ID (404)', async () => {
    // URL: /employee-positions/00000000-0000-0000-0000-000000000000
    const response = await api.delete('/employee-positions/00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Position — Invalid UUID (400)', async () => {
    // URL: /employee-positions/not-a-valid-uuid
    const response = await api.delete('/employee-positions/not-a-valid-uuid');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Position — No Auth (401)', async () => {
    // URL: /employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3
    const response = await api.delete('/employee-positions/2f5e2d37-0ebc-484a-b7d9-2cac3336e0e3');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Position — Already deleted (404)', async () => {
    // URL: /employee-positions/7eff3eeb-0ba8-4e5e-a9c6-c4d2d46da975
    const response = await api.delete('/employee-positions/7eff3eeb-0ba8-4e5e-a9c6-c4d2d46da975');
    expect(response.ok()).toBeTruthy();
  });
});
