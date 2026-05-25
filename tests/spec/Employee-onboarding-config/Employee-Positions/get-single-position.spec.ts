import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('GET SINGLE POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Single Position', async () => {
    // URL: /employee-positions/fa03352f-bcd9-4a57-98da-b07ca3c7bec5
    const response = await api.get('/employee-positions/fa03352f-bcd9-4a57-98da-b07ca3c7bec5');
    expect(response.ok()).toBeTruthy();
  });
});
