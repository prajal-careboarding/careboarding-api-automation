import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { CreateSectionResponse } from '../../../models/response/employee-onboarding-config/demographics/create-section';
import { CreateSectionsRequest } from '../../../models/request/employee-onboarding-config/demographics/create-section';
import { SchemaValidator } from '../../../helpers/schema-validator';
import { LoginHelper } from '@helpers/login-helper';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
import { faker } from '@faker-js/faker';
import { FillerRole } from 'tests/enums/field.enums';
import { getSectionsNextOrder } from '@helpers/section-helper';
import { assertGeneralErrorResponse, assertGeneralSuccessResponse } from '@helpers/assertion-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import Ajv from 'ajv';

test.describe('CREATE SECTION API', () => {
  let api: ApiClient;
  const demographicsTemplateId: string = SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS;
  const successSchema = SchemaValidator.loadSchema('create-section.schema.json');
  const errorSchema = SchemaValidator.loadSchema('error-response.schema.json');
  const ajv = new Ajv();

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
  });

  // ─── 201 HAPPY PATH ─────────────────────────────────────────────────────────

  test('Create Section - 201', async () => {
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] - ' + faker.lorem.words(2),
        description: '',
        order: await getSectionsNextOrder(api, demographicsTemplateId),
        requiredRole: FillerRole.ANY,
        isRepeatable: false,
        isRehireOnly: false,
      },
    ];

    const response = await api.post(
      ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(demographicsTemplateId),
      payload
    );
    console.log(await response.json());
    const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
      statusCode: 201,
      message: 'Form Section created successfully',
    });

    // Schema validation (full response envelope)
    ajv.validate(successSchema, result);
    if (ajv.errors) {
      console.error(ajv.errors);
    }
    // Value assertions
    expect(result.data[0].requiredRole).toBe(FillerRole.ANY);
    expect(result.data[0].name).toBe(payload[0].name);
    expect(result.data[0].description).toBe(payload[0].description);
    expect(result.data[0].isRepeatable).toBe(true);
    expect(result.data[0].isSystem).toBe(false);
  });

  test('Create Section EMPLOYER ONLY - 201', async () => {
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] EMPLOYER - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1,
        requiredRole: FillerRole.EMPLOYER,
        isRepeatable: false,
        isRehireOnly: false,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );

    const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
      statusCode: 201,
    });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(result.data[0].requiredRole).toBe(FillerRole.EMPLOYER);
    expect(result.data[0].name).toBe(payload[0].name);
    expect(result.data[0].description).toBe(payload[0].description);
    expect(result.data[0].isRepeatable).toBe(false);
    expect(result.data[0].isSystem).toBe(false);
  });

  test('Create Section With Inline Field - 201', async () => {
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] Inline - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1,
        requiredRole: FillerRole.ANY,
        isRepeatable: false,
        isRehireOnly: false,
        fields: [],
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
      statusCode: 201,
    });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(result.data[0].name).toBe(payload[0].name);
    expect(result.data[0].isRepeatable).toBe(false);
    expect(result.data[0].isSystem).toBe(false);
  });

  test('Create Section With PHI - 201', async () => {
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] PHI - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1,
        requiredRole: FillerRole.EMPLOYEE,
        isRepeatable: false,
        isRehireOnly: true,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
      statusCode: 201,
    });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(result.data[0].isRehireOnly).toBe(true);
    expect(result.data[0].requiredRole).toBe(FillerRole.EMPLOYEE);
    expect(result.data[0].isSystem).toBe(false);
  });

  test('Create Section FULL SECTIONS - 201', async () => {
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] Full - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1,
        requiredRole: FillerRole.ANY,
        isRepeatable: false,
        isRehireOnly: false,
        isVisible: true,
        fields: [],
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
      statusCode: 201,
    });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, successSchema);

    // Value assertions
    expect(result.data[0].isRepeatable).toBe(true);
    expect(result.data[0].isRehireOnly).toBe(true);
    expect(result.data[0].isVisible).toBe(true);
    expect(result.data[0].requiredRole).toBe(FillerRole.ANY);
    expect(result.data[0].isSystem).toBe(false);
  });

  // ─── 400 BAD REQUEST ────────────────────────────────────────────────────────

  test('Create Section Missing Name - 400', async () => {
    const payload = [
      {
        description: faker.lorem.sentence(),
        order: 1,
        requiredRole: FillerRole.ANY,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Missing Required Key - 400', async () => {
    // Omit both name and order — minimum required fields absent
    const payload = [
      {
        description: faker.lorem.sentence(),
        requiredRole: FillerRole.ANY,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
  });

  test('Create Section Missing DataTarget - 400', async () => {
    // Sections require `order`; sending without it triggers validation error
    const payload = [
      {
        name: '[Automation] No Order - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        requiredRole: FillerRole.ANY,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Missing isRequired - 400', async () => {
    // Empty payload — all required fields absent
    const payload = [{}];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Invalid Field Type - 400', async () => {
    // `requiredRole` must be one of ANY | EMPLOYEE | EMPLOYER
    const payload = [
      {
        name: '[Automation] Invalid Role - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order: 1,
        requiredRole: 'INVALID_ROLE',
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Invalid Role - 400', async () => {
    // Numeric value for requiredRole — invalid type
    const payload = [
      {
        name: '[Automation] Numeric Role - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order: 1,
        requiredRole: 999,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${demographicsTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Duplicate Name - 400', async () => {
    const sectionName = '[Automation] Dup Name - ' + faker.lorem.words(2);

    // First creation — should succeed
    const firstResponse = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, [
      {
        name: sectionName,
        description: '',
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1,
        requiredRole: FillerRole.ANY,
      },
    ]);
    const firstResult = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(firstResponse, {
      statusCode: 201,
    });
    SchemaValidator.validate(firstResult as unknown as Record<string, unknown>, successSchema);

    // Second creation with the same name — should fail
    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, [
      {
        name: sectionName,
        description: '',
        order:
          (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 1000,
        requiredRole: FillerRole.ANY,
      },
    ]);

    const result = await assertGeneralErrorResponse(response, { statusCode: 409 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Duplicate Order - 400', async () => {
    const fixedOrder =
      (await getSectionsNextOrder(api, demographicsTemplateId)) + Math.floor(Math.random() * 1000) + 500;

    // First creation with the order
    const firstResponse = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, [
      {
        name: '[Automation] Dup Order A - ' + faker.lorem.words(2),
        description: '',
        order: fixedOrder,
        requiredRole: FillerRole.ANY,
      },
    ]);
    const firstResult = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(firstResponse, {
      statusCode: 201,
    });
    SchemaValidator.validate(firstResult as unknown as Record<string, unknown>, successSchema);

    // Second creation with the same order — should fail
    const response = await api.post(`/onboarding/config/templates/${demographicsTemplateId}/sections`, [
      {
        name: '[Automation] Dup Order B - ' + faker.lorem.words(2),
        description: '',
        order: fixedOrder,
        requiredRole: FillerRole.ANY,
      },
    ]);

    const result = await assertGeneralErrorResponse(response, { statusCode: 400 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  // ─── 403 / 404 ──────────────────────────────────────────────────────────────

  test('Create Section System Templates - 403', async () => {
    // System templates are read-only; adding sections should be forbidden
    const systemTemplateId = SystemTemplateIds.I9_EMPLOYMENT_ELIGIBILITY;
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] System - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order: 9999,
        requiredRole: FillerRole.ANY,
      },
    ];

    const response = await api.post(`/onboarding/config/templates/${systemTemplateId}/sections`, payload);
    const result = await assertGeneralErrorResponse(response, { statusCode: 403 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });

  test('Create Section Non-Existing TemplateId - 404', async () => {
    const nonExistingTemplateId = '1e06f5c9-b68a-4027-9e4d-148a497cf853';
    const payload: CreateSectionsRequest = [
      {
        name: '[Automation] 404 - ' + faker.lorem.words(2),
        description: faker.lorem.sentence(),
        order: 1,
        requiredRole: FillerRole.ANY,
      },
    ];

    const response = await api.post(
      `/onboarding/config/templates/${nonExistingTemplateId}/sections`,
      payload
    );
    const result = await assertGeneralErrorResponse(response, { statusCode: 404 });
    SchemaValidator.validate(result as unknown as Record<string, unknown>, errorSchema);
  });
});
