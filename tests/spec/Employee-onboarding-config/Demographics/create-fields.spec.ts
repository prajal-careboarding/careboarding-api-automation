import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { CreateFieldsRequest } from '../../../models/request/Employee-onboarding-config/Demographics/create-fields';
import { LoginHelper } from '@helpers/loginHelper';

test.describe('CREATE FIELDS API', () => {
  let api: ApiClient;

  let testSectionId: string = '';
  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  test('Create Fields in a Section', async () => {
    // URL: /onboarding/config/sections/:sectionId/fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections/:sectionId/fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SHORT_TEXT 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SHORT_TEXT + HelpText 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SHORT_TEXT + Regex 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SHORT_TEXT + maxMin Validations 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section LONG_TEXT 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SELECT field with options 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section SELECT with visibilityRules (conditional show) 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section  MULTI_SELECT field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section DATE field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section DATE field No- expiry Validation 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section NUMBER Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section RADIO Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section RADIO Field 201 Copy', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section CHECKBOXES Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section FileUpload Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section HEADING Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Multiple fields in one  Field 201', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section visibilityRules — in operator (multi-value condition)', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Empty Array 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section MIssing Keys 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Missing Component 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Missing Type 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Missing Label 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Missing dataTargert 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Missing isRequired 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Invalid FieldType ENUM 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields in a Section Invalid dataTarget 400', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: any[] = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields — Duplicate key within same call 409', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields — SYSTEM SECTIONS 403', async () => {
    // URL: /onboarding/config/sections/00000000-0000-0000-0001-000000000001/fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post(
      '/onboarding/config/sections/00000000-0000-0000-0001-000000000001/fields',
      payload
    );
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields — NON_EXISTING SECTIONS 404', async () => {
    // URL: /onboarding/config/sections/aa88e7a1-0473-4c1b-8a45-262d5e87ea67/fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post(
      '/onboarding/config/sections/aa88e7a1-0473-4c1b-8a45-262d5e87ea67/fields',
      payload
    );
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('Create Fields — File Field without fileConfig', async () => {
    // URL: /onboarding/config/sections//fields
    const payload: CreateFieldsRequest = []; // TODO: Populate payload
    const response = await api.post('/onboarding/config/sections//fields', payload);
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });
});
