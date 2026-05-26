import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { CreateSectionResponse } from '../../../models/response/Employee-onboarding-config/Demographics/create-section';
import { CreateSectionRequest } from '../../../models/request/Employee-onboarding-config/Demographics/create-section';
import { SchemaValidator } from '../../../helpers/SchemaValidator';
import { LoginHelper } from '@helpers/loginHelper';
import { SystemTemplateIds } from 'tests/enums/SystemTemplates.enums';
import { faker } from '@faker-js/faker';
import { FillerRole } from 'tests/enums/Field.enums';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { getNextOrder } from '@helpers/sectionHelper';

// ─── Schemas ──────────────────────────────────────────────────────────────────
const successSchema = SchemaValidator.loadSchema('create-section-response.schema.json');
const errorSchema = SchemaValidator.loadSchema('api-error-response.schema.json');

test.describe('CREATE SECTION API', () => {
  let api: ApiClient;
  const demographicsTemplateId: string = SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS;

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  // ─── 201 HAPPY PATH ─────────────────────────────────────────────────────────

  test('Create Section - 201', async () => {
    const payload: CreateSectionRequest = {
      name: '[Automation] - ' + faker.lorem.words(2),
      description: '',
      order: await getNextOrder(api, demographicsTemplateId),
      requiredRole: FillerRole.ANY,
      isRepeatable: true,
      isRehireOnly: false,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody: CreateSectionResponse = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toBe('Form Section created successfully');
    expect(responseBody.data).toBeDefined();
    expect(typeof responseBody.data.id).toBe('string');
    expect(responseBody.data.templateId).toBe(demographicsTemplateId);
    expect(typeof responseBody.data.organizationId).toBe('string');
    expect(responseBody.data.name).toBe(payload.name);
    expect(responseBody.data.description).toBe(payload.description);
    expect(responseBody.data.order).toBe(payload.order);
    expect(responseBody.data.isSystem).toBe(false);
    expect(responseBody.data.isRepeatable).toBe(payload.isRepeatable);
    expect(responseBody.data.isVisible).toBe(true);
    expect(responseBody.data.requiredRole).toBe(payload.requiredRole);
    expect(responseBody.data.isRehireOnly).toBe(payload.isRehireOnly);
  });

  test('Create Section EMPLOYER ONLY - 201', async () => {
    const payload: CreateSectionRequest = {
      name: '[Automation] EMPLOYER - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: await getNextOrder(api),
      requiredRole: FillerRole.EMPLOYER,
      isRepeatable: false,
      isRehireOnly: false,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody: CreateSectionResponse = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.requiredRole).toBe(FillerRole.EMPLOYER);
    expect(responseBody.data.name).toBe(payload.name);
    expect(responseBody.data.description).toBe(payload.description);
    expect(responseBody.data.isRepeatable).toBe(false);
    expect(responseBody.data.isSystem).toBe(false);
  });

  test('Create Section With Inline Field - 201', async () => {
    const payload: CreateSectionRequest = {
      name: '[Automation] Inline - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: await getNextOrder(api),
      requiredRole: FillerRole.ANY,
      isRepeatable: false,
      isRehireOnly: false,
      fields: [],
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody: CreateSectionResponse = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.name).toBe(payload.name);
    expect(responseBody.data.isRepeatable).toBe(false);
    expect(responseBody.data.isSystem).toBe(false);
  });

  test('Create Section With PHI - 201', async () => {
    const payload: CreateSectionRequest = {
      name: '[Automation] PHI - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: await getNextOrder(api),
      requiredRole: FillerRole.EMPLOYEE,
      isRepeatable: false,
      isRehireOnly: true,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody: CreateSectionResponse = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.isRehireOnly).toBe(true);
    expect(responseBody.data.requiredRole).toBe(FillerRole.EMPLOYEE);
    expect(responseBody.data.isSystem).toBe(false);
  });

  test('Create Section FULL SECTIONS - 201', async () => {
    const payload: CreateSectionRequest = {
      name: '[Automation] Full - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: await getNextOrder(api),
      requiredRole: FillerRole.ANY,
      isRepeatable: true,
      isRehireOnly: true,
      isVisible: true,
      fields: [],
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody: CreateSectionResponse = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.isRepeatable).toBe(true);
    expect(responseBody.data.isRehireOnly).toBe(true);
    expect(responseBody.data.isVisible).toBe(true);
    expect(responseBody.data.requiredRole).toBe(FillerRole.ANY);
    expect(responseBody.data.isSystem).toBe(false);
  });

  // ─── 400 BAD REQUEST ────────────────────────────────────────────────────────

  test('Create Section Missing Name - 400', async () => {
    const payload: Partial<CreateSectionRequest> = {
      description: faker.lorem.sentence(),
      order: 1,
      requiredRole: FillerRole.ANY,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Missing Required Key - 400', async () => {
    // Omit both name and order — minimum required fields absent
    const payload: Partial<CreateSectionRequest> = {
      description: faker.lorem.sentence(),
      requiredRole: FillerRole.ANY,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Missing DataTarget - 400', async () => {
    // Sections require `order`; sending without it triggers validation error
    const payload: Partial<CreateSectionRequest> = {
      name: '[Automation] No Order - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      requiredRole: FillerRole.ANY,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Missing isRequired - 400', async () => {
    // Empty payload — all required fields absent
    const payload: Partial<CreateSectionRequest> = {};

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Invalid Field Type - 400', async () => {
    // `requiredRole` must be one of ANY | EMPLOYEE | EMPLOYER
    const payload = {
      name: '[Automation] Invalid Role - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: 1,
      requiredRole: 'INVALID_ROLE',
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Invalid Role - 400', async () => {
    // Numeric value for requiredRole — invalid type
    const payload = {
      name: '[Automation] Numeric Role - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: 1,
      requiredRole: 999,
    };

    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Duplicate Name - 400', async () => {
    const sectionName = '[Automation] Dup Name - ' + faker.lorem.words(2);

    // First creation — should succeed
    await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, {
      name: sectionName,
      description: '',
      order: await getNextOrder(api),
      requiredRole: FillerRole.ANY,
    });

    // Second creation with the same name — should fail
    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, {
      name: sectionName,
      description: '',
      order: await getNextOrder(api),
      requiredRole: FillerRole.ANY,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Duplicate Order - 400', async () => {
    const fixedOrder = await getNextOrder(api);

    // First creation with the order
    await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, {
      name: '[Automation] Dup Order A - ' + faker.lorem.words(2),
      description: '',
      order: fixedOrder,
      requiredRole: FillerRole.ANY,
    });

    // Second creation with the same order — should fail
    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, {
      name: '[Automation] Dup Order B - ' + faker.lorem.words(2),
      description: '',
      order: fixedOrder,
      requiredRole: FillerRole.ANY,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(400);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  // ─── 403 / 404 ──────────────────────────────────────────────────────────────

  test('Create Section System Templates - 403', async () => {
    // System templates are read-only; adding sections should be forbidden
    const systemTemplateId = SystemTemplateIds.I9_EMPLOYMENT_ELIGIBILITY;
    const payload: CreateSectionRequest = {
      name: '[Automation] System - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: 1,
      requiredRole: FillerRole.ANY,
    };

    const response = await api.post(`/onboarding/config/templates/${systemTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(403);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });

  test('Create Section Non-Existing TemplateId - 404', async () => {
    const nonExistingTemplateId = '1e06f5c9-b68a-4027-9e4d-148a497cf853';
    const payload: CreateSectionRequest = {
      name: '[Automation] 404 - ' + faker.lorem.words(2),
      description: faker.lorem.sentence(),
      order: 1,
      requiredRole: FillerRole.ANY,
    };

    const response = await api.post(`/onboarding/config/templates/${nonExistingTemplateId}/sections`, payload);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(404);

    // Schema validation
    SchemaValidator.validate(responseBody as unknown as Record<string, unknown>, errorSchema);

    // Value assertions
    expect(responseBody.success).toBe(false);
    expect(responseBody.error).toBeDefined();
    expect(responseBody.message).toBeDefined();
  });
});
