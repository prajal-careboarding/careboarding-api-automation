import { Faker, faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/ApiClient';
import { test, expect } from '@playwright/test';

test.describe('Create template-categories', () => {
  test('Create category [DOCUMENT_REQUIREMETN]', async ({ request }) => {
    const apiClient = new ApiClient(request);
    const createPayload = {
      name: '[Automation] Test Document Category' + ' ' + faker.number.int({ min: 10, max: 10000 }),
      templateType: 'DOCUMENT_REQUIREMENT',
    };

    const res = await apiClient.post('/onboarding/config/template-categories', createPayload);
    const resBody = await res.json();
    console.dir(resBody);
  });
});
