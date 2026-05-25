import { Faker, faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/ApiClient';
import { test, expect } from '@playwright/test';
import { RandomGenerator } from '@utils/randomGenerator';

test('Create employee position', async ({ request }) => {
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
  const apiClient = new ApiClient(request);
  const count = 10;

  for (let i = 0; i < count; i++) {
    const createPayload = {
      name: '[Automation] Test Position' + '' + RandomGenerator.integer(5),
      description: '[Created by API automation suite]' + ' ' + faker.lorem.words(100),
    };
    const res = await apiClient.post('/employee-positions', createPayload);
    const resBody = await res.json();
    console.dir(resBody);
  }
});
