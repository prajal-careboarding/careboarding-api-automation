// import { test, expect } from '@playwright/test';
// import { ApiClient } from '../../../helpers/api-client';
// import { LoginHelper } from '@helpers/login-helper';
// import { ENDPOINTS } from '@api/endpoints/api-endpoints';
// import { assertGeneralSuccessResponse, assertGeneralErrorResponse } from '@helpers/assertion-helper';
// import { SchemaValidator } from '@helpers/schema-validator';
// import megaPayload from '../../../test-data/static/create-field-mega-payload.json';
// import { checkTestableSectionExists, createNewTestSection, getTestSectionId } from '@helpers/section-helper';
// import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
// import { getDemographicsFixtures } from '@fixtures/demographics.fixture';
// import { createFieldTestCases } from '../../../test-data/providers/create-fields.provider';
// import Ajv from 'ajv';
// import { logger } from '@utils/logger';

// let api: ApiClient;
// let testSectionId: string;
// const successSchema = SchemaValidator.loadSchema('create-fields.schema.json');
// const ajv = new Ajv();

// test.beforeEach(async ({ request }) => {
//   await new LoginHelper(request).login();
//   api = new ApiClient(request);

//   testSectionId = (await checkTestableSectionExists(request))
//     ? await getTestSectionId(request)
//     : await createNewTestSection(
//         request,
//         await getDemographicsFixtures(request),
//         SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
//       );
// });

// test('Create Template - 201', async ({ request }) => {
//   const payload: CreateTemplateRequest = {
//     name: '[Automation] - ' + faker.lorem.words(2),
//     description: '',
//     order: await getSectionsNextOrder(api, demographicsTemplateId),
//     requiredRole: FillerRole.ANY,
//     isRepeatable: false,
//     isRehireOnly: false,
//   };

//   const response = await api.post(
//     ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(demographicsTemplateId),
//     payload
//   );
//   const result = await assertGeneralSuccessResponse<CreateSectionResponse['data']>(response, {
//     statusCode: 201,
//     message: 'Form Section created successfully',
//   });

//   // Schema validation (full response envelope)
//   ajv.validate(successSchema, result);
//   if (ajv.errors) {
//     console.error(ajv.errors);
//   }
//   // Value assertions
//   expect(result.data[0].requiredRole).toBe(FillerRole.ANY);
//   expect(result.data[0].name).toBe(payload[0].name);
//   expect(result.data[0].description).toBe(payload[0].description);
//   expect(result.data[0].isRepeatable).toBe(true);
//   expect(result.data[0].isSystem).toBe(false);
// });
