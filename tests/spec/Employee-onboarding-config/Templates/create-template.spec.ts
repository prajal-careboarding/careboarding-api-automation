import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { CreateTemplateRequest } from '../../../models/request/employee-onboarding-config/templates/create-template';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { RandomGenerator } from '@utils/random-generator';

test.describe('CREATE TEMPLATE API', () => {
  let api: ApiClient;
  let randomNumber = new RandomGenerator().integer(5);

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
  });

  test('Create Template — POLICY (201)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Policy Template' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('POLICY (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DEFAULT_FORM (201)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Default Form Template' + randomNumber,
      type: 'DEFAULT_FORM',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('DEFAULT_FORM (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — GOVERNMENT_FORM (201)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Government Form Template' + randomNumber,
      type: 'GOVERNMENT_FORM',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('GOVERNMENT_FORM (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DOCUMENT_REQUIREMENT (201)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Document Requirement Template' + randomNumber,
      type: 'DOCUMENT_REQUIREMENT',
      config: { lifecycle: 'ONBOARDING' },
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('DOCUMENT_REQUIREMENT (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — AGENCY_FORM (201)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Agency Form Template' + randomNumber,
      type: 'AGENCY_FORM',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('AGENCY_FORM (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DEMOGRAPHICS - Should be blocked (400)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Demographics Template' + randomNumber,
      type: 'DEMOGRAPHICS',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('DEMOGRAPHICS (400):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — REFERENCE - Should be blocked (400)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Reference Template' + randomNumber,
      type: 'REFERENCE',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('REFERENCE (400):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — ONBOARDING_QUESTION - Should be blocked (400)', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Onboarding Question Template' + randomNumber,
      type: 'ONBOARDING_QUESTION',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('ONBOARDING_QUESTION (400):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — POLICY Non-existing categoryId', async () => {
    const payload: Partial<CreateTemplateRequest> = {
      name: 'Automation Policy Bad Category' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
      categoryId: '00000000-0000-0000-0000-000000000000',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('POLICY Non-existing categoryId:', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — POLICY Duplicate Name', async () => {
    const duplicateName = `Automation Duplicate Policy ${Date.now()}`;
    const originalPayload: CreateTemplateRequest = {
      name: duplicateName,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
    };
    const createResponse = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, originalPayload);
    console.log('POLICY Duplicate Name (first):', createResponse.status(), await createResponse.text());

    const duplicatePayload: CreateTemplateRequest = {
      name: duplicateName,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, duplicatePayload);
    console.log('POLICY Duplicate Name (duplicate):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — POLICY without policyType (400)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Policy No PolicyType' + randomNumber,
      type: 'POLICY',
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('POLICY without policyType (400):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });

  test('Create Template — Signees: Orphan signee (no annotations) (422)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Signee Orphan' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
      signees: [{ role: 'MANAGER', order: 1 }],
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('Signees Orphan (422):', response.status(), await response.text());
    expect(response.status()).toBe(422);
  });

  test('Create Template — Signees: Non-contiguous orders (422)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Signee NonContiguous' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
      signees: [
        { role: 'EMPLOYEE', order: 1, annotations: [] },
        { role: 'MANAGER', order: 3, annotations: [] },
      ],
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('Signees Non-contiguous (422):', response.status(), await response.text());
    expect(response.status()).toBe(422);
  });

  test('Create Template — Signees: Missing EMPLOYEE (422)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Signee NoEmployee' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
      signees: [{ role: 'MANAGER', order: 1, annotations: [] }],
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('Signees Missing EMPLOYEE (422):', response.status(), await response.text());
    expect(response.status()).toBe(422);
  });

  test('Create Template — POLICY with signees (signature-based) (201)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Policy With Signees' + randomNumber,
      type: 'POLICY',
      policyType: 'COMPANY_POLICY',
      requiresAcknowledgement: true,
      signees: [{ role: 'EMPLOYEE', order: 1, annotations: [] }],
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('POLICY with signees (201):', response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Template — DOCUMENT_REQUIREMENT invalid lifecycle (400)', async () => {
    const payload: CreateTemplateRequest = {
      name: 'Automation Document Requirement Invalid Lifecycle' + randomNumber,
      type: 'DOCUMENT_REQUIREMENT',
      config: { lifecycle: 'INVALID_LIFECYCLE_VALUE' },
    };
    const response = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);
    console.log('DOCUMENT_REQUIREMENT invalid lifecycle (400):', response.status(), await response.text());
    expect(response.status()).toBe(400);
  });
});
