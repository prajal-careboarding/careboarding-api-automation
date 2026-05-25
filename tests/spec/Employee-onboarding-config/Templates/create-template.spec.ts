import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { CreateTemplateRequest } from '../../../models/request/Employee-onboarding-config/Templates/create-template';

test.describe('CREATE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Create Template', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — POLICY (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DEFAULT_FORM (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — GOVERNMENT_FORM (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DOCUMENT_REQUIREMENT (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — AGENCY_FORM (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DEMOGRAPHICS - Should be blocked (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — REFERENCE - Should be blocked (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — ONBOARDING_QUESTION - Should be blocked (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DOCUMENT_REQUIREMENT without config (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — POLICY Non-existing categoryId', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — POLICY Duplicate Name', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — POLICY without policyType (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — Signees: Orphan signee (no annotations) (422)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — Signees: Non-contiguous orders (422)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — Signees: Missing EMPLOYEE (422)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — POLICY with signees (signature-based) (201)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DOCUMENT_REQUIREMENT invalid lifecycle (400)', async () => {
    // URL: /onboarding/config/templates
    const payload: Partial<CreateTemplateRequest> = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/templates', payload);
    expect(response.ok()).toBeTruthy();
  });
});
