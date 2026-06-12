import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { LoginHelper } from '@helpers/loginHelper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { assertGeneralSuccessResponse, assertGeneralErrorResponse } from '@helpers/assertionHelper';
import { SchemaValidator } from '@helpers/SchemaValidator';
import megaPayload from '../../../test-data/static/createFieldMegaPayload.json';
import { checkTestableSectionExists, createNewTestSection, getTestSectionId } from '@helpers/sectionHelper';
import { SystemTemplateIds } from 'tests/enums/SystemTemplates.enums';
import { getDemographicsFixtures } from '@fixtures/demographics.fixture';
import { createFieldTestCases } from '../../../test-data/providers/create-fields.provider';

// ─── Data-Driven CREATE FIELDS Tests ─────────────────────────────────────────

test.describe('CREATE FIELDS API', () => {
  let api: ApiClient;
  let testSectionId: string;
  const successSchema = SchemaValidator.loadSchema('createFieldsSchema.json');

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

  for (const tc of createFieldTestCases) {
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
          SchemaValidator.validate(result as unknown as Record<string, unknown>, successSchema);
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

// ─── Mega Payload (separate setup) ───────────────────────────────────────────

// test.describe('CREATE Field Using Mega Payload', () => {
//   let api: ApiClient;
//   let testSectionId: string;
//   let testSectionName: string;

//   test.beforeEach(async ({ request }) => {
//     const loginHelper = new LoginHelper(request);
//     await loginHelper.login();
//     api = new ApiClient(request);

//     const response = await api.get(ENDPOINTS.TEMPLATES.BY_TYPE('DEMOGRAPHICS'));
//     const templates = await response.json();

//     testSectionId = templates.data[0].sections[templates.data[0].sections.length - 1].id;
//     testSectionName = templates.data[0].sections[templates.data[0].sections.length - 1].name;
//     console.log(`Test Section ID: ${testSectionId}`);
//     console.log(`Test Section Name: ${testSectionName}`);
//   });

//   test('Create Fields in a Section Using Mega Payload', async () => {
//     const response = await api.post(`/onboarding/config/sections/${testSectionId}/fields`, megaPayload);
//     console.log(await response.json());

//     await assertGeneralErrorResponse(response, {
//       statusCode: 500,
//       error: 'InternalServerError',
//       message: 'Internal server error',
//       success: false,
//     });
//   });
// });
