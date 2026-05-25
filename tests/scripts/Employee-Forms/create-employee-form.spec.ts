import { Faker, faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/ApiClient';
import { test, expect } from '@playwright/test';

test('Create random employee forms', async ({ request }) => {
  const apiClient = new ApiClient(request);

  const createPayload = {
    name: '[Automation] Test AGENCY FORM' + ' ' + faker.number.int({ min: 10, max: 10000 }),
    type: 'AGENCY_FORM',
    description: 'Created by API automation suite' + ' ' + faker.lorem.words(100),
  };

  const res = await apiClient.post('/onboarding/config/templates', createPayload);
  const resBody = await res.json();
  console.dir(resBody);
});

test('Create multiple random employee forms', async ({ request }) => {
  const apiClient = new ApiClient(request);

  for (let i = 0; i < 20; i++) {
    const createPayload = {
      name: '[Automation] Test AGENCY FORM' + ' ' + faker.number.int({ min: 10, max: 10000 }),
      type: 'AGENCY_FORM',
      description: 'Created by API automation suite' + ' ' + faker.lorem.words(100),
    };
    const res = await apiClient.post('/onboarding/config/templates', createPayload);
    const resBody = await res.json();
    console.dir(resBody);
  }
});
