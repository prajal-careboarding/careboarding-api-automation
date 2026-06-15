import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { SaveTaskFormDraftRequest, SaveTaskFormSubmitRequest, SaveTaskPolicyAcknowledgeRequest, SaveTaskPolicySignatureBasedEMPLOYEESignsRequest, SaveTaskPolicySigningHRCountersignsRequest, SaveTaskSigningEmptyAnnotations400Request, SaveTaskSigningRecordStillAWAITING403Request } from '../../models/request/runtime-apis/save-task';


test.describe('SAVE TASK API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Save Task — Form (draft)', async () => {
    // URL: /onboarding/tasks/
    const payload: SaveTaskFormDraftRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Form (submit)', async () => {
    // URL: /onboarding/tasks/
    const payload: SaveTaskFormSubmitRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Policy (acknowledge)', async () => {
    // URL: /onboarding/tasks/
    const payload: SaveTaskPolicyAcknowledgeRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks/', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Policy (signature-based) EMPLOYEE signs', async () => {
    // URL: /onboarding/policy-signing-records//submit
    const payload: SaveTaskPolicySignatureBasedEMPLOYEESignsRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/policy-signing-records//submit', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Policy signing: HR countersigns', async () => {
    // URL: /onboarding/policy-signing-records//submit
    const payload: SaveTaskPolicySigningHRCountersignsRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/policy-signing-records//submit', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Signing: empty annotations (400)', async () => {
    // URL: /onboarding/policy-signing-records//submit
    const payload: SaveTaskSigningEmptyAnnotations400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/policy-signing-records//submit', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Task — Signing: record still AWAITING (403)', async () => {
    // URL: /onboarding/policy-signing-records//submit
    const payload: SaveTaskSigningRecordStillAWAITING403Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/policy-signing-records//submit', payload);
    expect(response.ok()).toBeTruthy();
  });
});
