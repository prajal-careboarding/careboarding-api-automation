import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('LIST ALL API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List All Positions', async () => {
    // URL: /employee-positions
    const response = await api.get('/employee-positions');
    expect(response.ok()).toBeTruthy();
  });
});
