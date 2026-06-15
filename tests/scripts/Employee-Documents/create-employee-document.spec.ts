import { faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/api-client';
import { test, expect } from '@playwright/test';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums.ts';
import { SystemPositionIds } from 'tests/enums/system-positions.enums';
import {
  SystemTemplateCategoryIds,
  SystemTemplateCategoryNames,
} from 'tests/enums/system-template-categories.enums';

const createPayload = {
  name: '[Automation] Test Document' + ' ' + faker.number.int({ min: 10000, max: 99999 }),
  type: 'DOCUMENT_REQUIREMENT',
  categoryId: 'a519cb42-9ef6-41cc-8cb0-8ee609eb4bae',
  assignPositions: [SystemPositionIds.HHA],
  config: { lifecycle: 'ONE_TIME' },
};

test('Create employee Documents', async ({ request }) => {
  const createPayload = {
    name: `[Automation] Test Document ${SystemTemplateCategoryNames.BACKGROUND_SCREENING} ${faker.number.int({ min: 10000, max: 99999 })}`,
    type: OnboardingTemplateType.DOCUMENT_REQUIREMENT,
    categoryId: '', // A categoryId is required
    assignPositions: [SystemPositionIds.HHA],
    config: { lifecycle: 'ONE_TIME' },
  };

  const apiClient = new ApiClient(request);
  const res = await apiClient.post('/onboarding/config/templates', createPayload);
  const resBody = await res.json();
  console.dir(resBody);
});

test('Create employee Documents under [BACKGROUND_SCREENING]', async ({ request }) => {
  const createPayload = {
    name: `[Automation] Test Document ${SystemTemplateCategoryNames.BACKGROUND_SCREENING} ${faker.number.int({ min: 10000, max: 99999 })}`,
    type: OnboardingTemplateType.DOCUMENT_REQUIREMENT,
    categoryId: SystemTemplateCategoryIds.BACKGROUND_SCREENING,
    assignPositions: [SystemPositionIds.HHA],
    config: { lifecycle: 'ONE_TIME' },
  };

  const apiClient = new ApiClient(request);
  const res = await apiClient.post('/onboarding/config/templates', createPayload);
  const resBody = await res.json();
  console.dir(resBody);
});

test('Create multiple employee Documents [AGENCY FORM]', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const count = 10;

  for (let i = 0; i < count; i++) {
    const createPayload = {
      name: '[Automation] Test Document' + ' ' + faker.number.int({ min: 10, max: 10000 }),
      type: 'DOCUMENT_REQUIREMENT',
      categoryId: 'a519cb42-9ef6-41cc-8cb0-8ee609eb4bae', // Test Category ID
      assignPositions: [SystemPositionIds.HHA],
      config: { lifecycle: 'ONE_TIME' },
    };
    const res = await apiClient.post('/onboarding/config/templates', createPayload);
    const resBody = await res.json();
    console.dir(resBody);
  }
  console.log('Created ' + count + ' documents');
});
