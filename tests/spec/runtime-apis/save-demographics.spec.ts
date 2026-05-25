import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { SaveDemographicsFirstSaveDraftRequest, SaveDemographicsFollowUpDraftRequest, SaveDemographicsSubmitRequest, SaveDemographicsMissingMinimumSix422Request, SaveDemographicsSlotIndexedKeysDraftRequest, SaveDemographicsLockedFieldMutationCheckRequest, SaveDemographicsSubmitWithRefFields422MissingRequiredRequest } from '../../models/request/runtime-apis/save-demographics';


test.describe('SAVE DEMOGRAPHICS API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Save Demographics — First Save (draft)', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsFirstSaveDraftRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Follow-up (draft)', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsFollowUpDraftRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Submit', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsSubmitRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Missing minimum-six (422)', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsMissingMinimumSix422Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Slot-indexed keys (draft)', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsSlotIndexedKeysDraftRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Locked field mutation check', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsLockedFieldMutationCheckRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Demographics — Submit with ref fields (422 — missing required)', async () => {
    // URL: /onboarding/demographics
    const payload: SaveDemographicsSubmitWithRefFields422MissingRequiredRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/demographics', payload);
    expect(response.ok()).toBeTruthy();
  });
});
