import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { CreateReferenceQuestion201Request, CreateReferenceQuestionInvalidKeyFormat400Request, CreateReferenceQuestionDuplicateKey409Request, CreateReferenceQuestionSELECTWithoutOptions400Request, CreateReferenceQuestionRejectedTypeFILE400Request } from '../../models/request/reference-config-9-5/create-reference-question';


test.describe('CREATE REFERENCE QUESTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Reference Question (201)', async () => {
    // URL: /onboarding/config/reference/questions
    const payload: CreateReferenceQuestion201Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/questions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Reference Question — Invalid key format (400)', async () => {
    // URL: /onboarding/config/reference/questions
    const payload: CreateReferenceQuestionInvalidKeyFormat400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/questions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Reference Question — Duplicate key (409)', async () => {
    // URL: /onboarding/config/reference/questions
    const payload: CreateReferenceQuestionDuplicateKey409Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/questions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Reference Question — SELECT without options (400)', async () => {
    // URL: /onboarding/config/reference/questions
    const payload: CreateReferenceQuestionSELECTWithoutOptions400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/questions', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Reference Question — Rejected type FILE (400)', async () => {
    // URL: /onboarding/config/reference/questions
    const payload: CreateReferenceQuestionRejectedTypeFILE400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/questions', payload);
    expect(response.ok()).toBeTruthy();
  });
});
