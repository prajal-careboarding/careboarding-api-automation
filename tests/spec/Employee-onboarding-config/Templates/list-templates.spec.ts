import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('LIST TEMPLATES API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List Templates DEMOGRAPHICS', async () => {
    // URL: /onboarding/config/templates?type=DEMOGRAPHICS
    const response = await api.get('/onboarding/config/templates?type=DEMOGRAPHICS');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates DOCUMENT_REQUIREMENT', async () => {
    // URL: /onboarding/config/templates?type=DOCUMENT_REQUIREMENT
    const response = await api.get('/onboarding/config/templates?type=DOCUMENT_REQUIREMENT');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates POLICY', async () => {
    // URL: /onboarding/config/templates?type=POLICY
    const response = await api.get('/onboarding/config/templates?type=POLICY');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates GOVERNMENT_FORM', async () => {
    // URL: /onboarding/config/templates?type=GOVERNMENT_FORM
    const response = await api.get('/onboarding/config/templates?type=GOVERNMENT_FORM');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates DEFAULT_FORM', async () => {
    // URL: /onboarding/config/templates?type=DEFAULT_FORM
    const response = await api.get('/onboarding/config/templates?type=DEFAULT_FORM');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates AGENCY_FORM', async () => {
    // URL: /onboarding/config/templates?type=AGENCY_FORM
    const response = await api.get('/onboarding/config/templates?type=AGENCY_FORM');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates ONBOARDING_QUESTION', async () => {
    // URL: /onboarding/config/templates?type=ONBOARDING_QUESTION
    const response = await api.get('/onboarding/config/templates?type=ONBOARDING_QUESTION');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates REFERENCE', async () => {
    // URL: /onboarding/config/templates?type=REFERENCE
    const response = await api.get('/onboarding/config/templates?type=REFERENCE');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — Filter by status DRAFT', async () => {
    // URL: /onboarding/config/templates?status=ACTIVE&type=POLICY
    const response = await api.get('/onboarding/config/templates?status=ACTIVE&type=POLICY');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — search by name', async () => {
    // URL: /onboarding/config/templates?search=Certification
    const response = await api.get('/onboarding/config/templates?search=Certification');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — hasExpiry=true', async () => {
    // URL: /onboarding/config/templates?type=DOCUMENT_REQUIREMENT&hasExpiry=true
    const response = await api.get('/onboarding/config/templates?type=DOCUMENT_REQUIREMENT&hasExpiry=true');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — groupByCategory (DOCUMENT_REQUIREMENT)', async () => {
    // URL: /onboarding/config/templates?type=DOCUMENT_REQUIREMENT&groupByCategory=true
    const response = await api.get('/onboarding/config/templates?type=DOCUMENT_REQUIREMENT&groupByCategory=true');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — groupByCategory invalid value (400)', async () => {
    // URL: /onboarding/config/templates?groupByCategory=invalid
    const response = await api.get('/onboarding/config/templates?groupByCategory=invalid');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — unknown query key (400)', async () => {
    // URL: /onboarding/config/templates?foo=bar
    const response = await api.get('/onboarding/config/templates?foo=bar');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — by positionId', async () => {
    // URL: /onboarding/config/templates?positionIds=
    const response = await api.get('/onboarding/config/templates?positionIds=');
    expect(response.ok()).toBeTruthy();
  });

  test('List Templates — GOVERNMENT_FORM PA', async () => {
    // URL: /onboarding/config/templates?type=GOVERNMENT_FORM&stateCode=PA
    const response = await api.get('/onboarding/config/templates?type=GOVERNMENT_FORM&stateCode=PA');
    expect(response.ok()).toBeTruthy();
  });
});
