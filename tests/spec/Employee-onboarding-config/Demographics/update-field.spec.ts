import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { UpdateFieldRequest } from '../../../models/request/employee-onboarding-config/demographics/update-field';

test.describe('UPDATE FIELD API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Update Field', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Label 200', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Toggle isRequired 200', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Select options 200', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Attempt to update keys 400', async () => {
    // URL: /onboarding/config/fields/96cb892a-0667-498e-9755-5d8797ab86d3
    const payload: any = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/96cb892a-0667-498e-9755-5d8797ab86d3', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Attempt to update DataTarget 400', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field setVisibility Rule 200', async () => {
    // URL: /onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/7cc93a4d-b3f9-4b9f-9d36-93a72f8fb562', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Update non-existingId 404', async () => {
    // URL: /onboarding/config/fields/00000000-0000-0000-9999-000000000001
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/00000000-0000-0000-9999-000000000001', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Update Field Modify SYSTEM_FIELDS 403', async () => {
    // URL: /onboarding/config/fields/00000000-0000-0000-0002-000000000001
    const payload: UpdateFieldRequest = {}; // TODO: Populate payload
    const response = await api.patch('/onboarding/config/fields/00000000-0000-0000-0002-000000000001', payload);
    expect(response.ok()).toBeTruthy();
  });
});
