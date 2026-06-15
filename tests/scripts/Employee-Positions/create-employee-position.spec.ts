import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { Faker, faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { test, expect } from '@playwright/test';
import { RandomGenerator } from '@utils/random-generator';

const random = new RandomGenerator();
test.describe('[Scripts] CREATE EMPLOYEE POSITIONß', () => {
  test('Create single employee position', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const createPayload = {
      name: '[Automation] Test Position' + ' ' + faker.number.int({ min: 10, max: 10000 }),
      description: '[Created by API automation suite]' + ' ' + faker.lorem.words(100),
    };

    const res = await apiClient.post('/employee-positions', createPayload);
    const resBody = await res.json();

    expect(res.ok()).toBeTruthy();
    console.dir(resBody);
  });

  test('Create multiple employee positions', async ({ request }) => {
    const login = new LoginHelper(request);
    await login.login();
    const apiClient = new ApiClient(request);
    const count = 25;

    for (let i = 0; i < count; i++) {
      const createPayload = {
        name: '[Automation] Test Position' + ' ' + random.integer(5),
        description: '[Created by API automation suite]' + ' ' + faker.lorem.words(100),
      };
      const res = await apiClient.post(ENDPOINTS.EMPLOYEE_POSITIONS.CREATE_EMPLOYEE_POSITION, createPayload);
      const resBody = await res.json();
      console.dir(resBody);
    }
  });
});
