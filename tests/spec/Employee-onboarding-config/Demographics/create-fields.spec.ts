import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { assertGeneralSuccessResponse, assertGeneralErrorResponse } from '@helpers/assertion-helper';
import { SchemaValidator } from '@helpers/schema-validator';
import megaPayload from '../../../test-data/static/create-field-mega-payload.json';
import { checkTestableSectionExists, createNewTestSection, getTestSectionId } from '@helpers/section-helper';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
import { getDemographicsFixtures } from '@fixtures/demographics.fixture';
import {
  createFieldTestCasesBasicFields,
  createFieldTestCasesErrorCases,
  createFieldTestCasesWithAttributes,
} from '../../../test-data/providers/create-fields.provider';
import Ajv from 'ajv';
import { logger } from '@utils/logger';

// ─── Data-Driven CREATE FIELDS Tests ─────────────────────────────────────────
test.describe('Create Fields test cases', () => {
  test.describe('CREATE BASIC FIELDS', () => {
    test.describe.configure({ mode: 'serial' });

    let api: ApiClient;
    let testSectionId: string;
    const successSchema = SchemaValidator.loadSchema('create-fields.schema.json');
    const ajv = new Ajv();

    test.beforeEach(async ({ request }) => {
      await new LoginHelper(request).login();
      api = new ApiClient(request);

      testSectionId = (await checkTestableSectionExists(request))
        ? await getTestSectionId(request)
        : await createNewTestSection(
            request,
            await getDemographicsFixtures(request),
            SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
          );
    });

    for (const tc of createFieldTestCasesBasicFields) {
      test(`Create Fields — ${tc.name}`, async () => {
        const sectionId = tc.sectionId ?? testSectionId;
        const payload = Array.isArray(tc.payload) ? tc.payload : await tc.payload(api, sectionId);

        const response = await api.post(ENDPOINTS.FIELDS.CREATE_FIELDS(sectionId), payload);
        console.log(await response.json());

        if (tc.expected.success) {
          const result = await assertGeneralSuccessResponse(response, {
            statusCode: tc.expected.status,
            message: tc.expected.message,
          });
          if (tc.expected.validateSchema) {
            const isValid = ajv.validate(successSchema, result);
            if (!isValid) {
              logger.error(`Schema validation failed: ${ajv.errorsText()}`);
            }
          }
          if (tc.expected.assertCount) {
            expect(result.data.count).toBe(payload.length);
          }
        } else {
          await assertGeneralErrorResponse(response, { statusCode: tc.expected.status });
        }
      });
    }
  });

  test.describe('CREATE FIELDS WITH CONFIGURATIONS', () => {
    test.describe.configure({ mode: 'serial' });

    let api: ApiClient;
    let testSectionId: string;
    const successSchema = SchemaValidator.loadSchema('create-fields.schema.json');
    const ajv = new Ajv();

    test.beforeEach(async ({ request }) => {
      await new LoginHelper(request).login();
      api = new ApiClient(request);

      testSectionId = (await checkTestableSectionExists(request))
        ? await getTestSectionId(request)
        : await createNewTestSection(
            request,
            await getDemographicsFixtures(request),
            SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
          );
    });

    for (const tc of createFieldTestCasesWithAttributes) {
      test(`Create Fields — ${tc.name}`, async () => {
        const sectionId = tc.sectionId ?? testSectionId;
        const payload = Array.isArray(tc.payload) ? tc.payload : await tc.payload(api, sectionId);

        const response = await api.post(ENDPOINTS.FIELDS.CREATE_FIELDS(sectionId), payload);
        console.log(await response.json());

        if (tc.expected.success) {
          const result = await assertGeneralSuccessResponse(response, {
            statusCode: tc.expected.status,
            message: tc.expected.message,
          });
          if (tc.expected.validateSchema) {
            const isValid = ajv.validate(successSchema, result);
            if (!isValid) {
              logger.error(`Schema validation failed: ${ajv.errorsText()}`);
            }
          }
          if (tc.expected.assertCount) {
            expect(result.data.count).toBe(payload.length);
          }
        } else {
          await assertGeneralErrorResponse(response, { statusCode: tc.expected.status });
        }
      });
    }
  });

  test.describe('CREATE FIELDS ERROR CASES', () => {
    test.describe.configure({ mode: 'parallel' });

    let api: ApiClient;
    let testSectionId: string;
    const errorSchema = SchemaValidator.loadSchema('error-response.schema.json');
    const ajv = new Ajv();

    test.beforeEach(async ({ request }) => {
      await new LoginHelper(request).login();
      api = new ApiClient(request);

      testSectionId = (await checkTestableSectionExists(request))
        ? await getTestSectionId(request)
        : await createNewTestSection(
            request,
            await getDemographicsFixtures(request),
            SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
          );
    });

    for (const tc of createFieldTestCasesErrorCases) {
      test(`Create Fields — ${tc.name}`, async () => {
        const sectionId = tc.sectionId ?? testSectionId;
        const payload = Array.isArray(tc.payload) ? tc.payload : await tc.payload(api, sectionId);

        const response = await api.post(ENDPOINTS.FIELDS.CREATE_FIELDS(sectionId), payload);
        console.log(await response.json());

        if (tc.expected.success) {
          const result = await assertGeneralSuccessResponse(response, {
            statusCode: tc.expected.status,
            message: tc.expected.message,
          });
          if (tc.expected.validateSchema) {
            const isValid = ajv.validate(errorSchema, result);
            if (!isValid) {
              logger.error(`Schema validation failed: ${ajv.errorsText()}`);
            }
          }
          if (tc.expected.assertCount) {
            expect(result.data.count).toBe(payload.length);
          }
        } else {
          await assertGeneralErrorResponse(response, { statusCode: tc.expected.status });
        }
      });
    }
  });
});
