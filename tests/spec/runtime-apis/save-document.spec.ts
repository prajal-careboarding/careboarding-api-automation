import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { SaveDocumentRequest, SaveDocumentMissingRequiredFields400Request, SaveDocumentEmptyDocumentsArray400Request, SaveDocumentEXPIRINGTemplateMissingExpiryDate422Request, SaveDocumentMimeTypeNotAllowed422Request, SaveDocumentSizeExceedsMaxSizeMb422Request } from '../../models/request/runtime-apis/save-document';


test.describe('SAVE DOCUMENT API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Save Document', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentRequest = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Document — Missing required fields (400)', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentMissingRequiredFields400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Document — Empty documents array (400)', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentEmptyDocumentsArray400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Document — EXPIRING template missing expiryDate (422)', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentEXPIRINGTemplateMissingExpiryDate422Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Document — mimeType not allowed (422)', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentMimeTypeNotAllowed422Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Save Document — size exceeds maxSizeMb (422)', async () => {
    // URL: /onboarding/tasks//documents
    const payload: SaveDocumentSizeExceedsMaxSizeMb422Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/tasks//documents', payload);
    expect(response.ok()).toBeTruthy();
  });
});
