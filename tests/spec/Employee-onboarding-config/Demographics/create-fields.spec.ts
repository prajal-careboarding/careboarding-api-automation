import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';
import { CreateFieldsRequest } from '../../../models/request/Employee-onboarding-config/Demographics/create-fields';
import { LoginHelper } from '@helpers/loginHelper';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { FieldType, DataTarget, VisibilityOperator, RuleAction } from 'tests/enums/Field.enums';
import { assertGeneralSuccessResponse, assertGeneralErrorResponse } from '@helpers/assertionHelper';

import megaPayload from '../../../test-data/static/createFieldMegaPayload.json';
import { getNextOrder } from '@helpers/sectionHelper';
import { asyncWrapProviders } from 'node:async_hooks';

test.describe('CREATE FIELDS API', () => {
  let api: ApiClient;
  let testSectionId: string = '';

  test.beforeEach(async ({ request }) => {
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);

    // Fetch existing templates to identify a valid section for testing
    const response = await api.get(ENDPOINTS.TEMPLATES.BY_TYPE('DEMOGRAPHICS'));
    const templates = await response.json();
    testSectionId = templates.data[0].sections[templates.data[0].sections.length - 1].id;
  });

  test('Create Fields in a Section', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `test_general_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'General Field ',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 1,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    const result = await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Form Field created successfully',
    });
    expect(result.data.fields).toHaveLength(1);
    expect(result.data.fields[0].key).toBe(payload[0].key);
  });

  test('Create Fields in a Section SHORT_TEXT 201', async () => {
    const order = await getNextOrder(api, testSectionId);

    const payload: CreateFieldsRequest = [
      {
        key: `short_text_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: `Short Text Field ${Date.now()}`,
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order,
      },
    ];

    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    const result = await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Form Field created successfully',
    });
  });

  test('Create Fields in a Section SHORT_TEXT + HelpText 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `help_text_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Help Text Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 3,
        helpText: 'This is a help text instructions',
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    const result = await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
    expect(result.data.fields[0].helpText).toBe('This is a help text instructions');
  });

  test('Create Fields in a Section SHORT_TEXT + Regex 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `regex_text_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Regex Text Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 4,
        validation: {
          regexPattern: '^[A-Z]{3}$',
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section SHORT_TEXT + maxMin Validations 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `minmax_text_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Min Max Text Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 5,
        validation: {
          minLength: 5,
          maxLength: 10,
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section LONG_TEXT 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `long_text_${Date.now()}`,
        component: 'TextAreaInput',
        type: FieldType.LONG_TEXT,
        label: 'Long Text Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 6,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section SELECT field with options 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `select_${Date.now()}`,
        component: 'SingleSelect',
        type: FieldType.SELECT,
        label: 'Select Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 7,
        validation: {
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ],
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section SELECT with visibilityRules (conditional show) 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `select_conditional_${Date.now()}`,
        component: 'SingleSelect',
        type: FieldType.SELECT,
        label: 'Conditional Select Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 8,
        validation: {
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        visibilityRules: [
          {
            targetFieldKey: 'has_vehicle',
            operator: VisibilityOperator.EQ,
            value: 'yes',
            action: RuleAction.SHOW,
          },
        ],
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section  MULTI_SELECT field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `multi_select_${Date.now()}`,
        component: 'MultiSelect',
        type: FieldType.MULTI_SELECT,
        label: 'Multi Select Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 9,
        validation: {
          options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
          ],
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section DATE field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `date_field_${Date.now()}`,
        component: 'DatePicker',
        type: FieldType.DATE,
        label: 'Date Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 10,
        validation: {
          minDate: '2020-01-01',
          maxDate: '2030-12-31',
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section DATE field No- expiry Validation 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `date_no_exp_${Date.now()}`,
        component: 'DatePicker',
        type: FieldType.DATE,
        label: 'Date No Expiry Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 11,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section NUMBER Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `num_field_${Date.now()}`,
        component: 'NumberInput',
        type: FieldType.NUMBER,
        label: 'Number Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 12,
        validation: {
          minValue: 1,
          maxValue: 100,
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section RADIO Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `radio_field_${Date.now()}`,
        component: 'RadioGroup',
        type: FieldType.RADIO,
        label: 'Radio Field',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 13,
        validation: {
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section RADIO Field 201 Copy', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `radio_field_copy_${Date.now()}`,
        component: 'RadioGroup',
        type: FieldType.RADIO,
        label: 'Radio Field Copy',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 14,
        validation: {
          options: [
            { value: 'high', label: 'High' },
            { value: 'low', label: 'Low' },
          ],
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section CHECKBOXES Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `checkbox_field_${Date.now()}`,
        component: 'CheckboxGroup',
        type: FieldType.CHECKBOX,
        label: 'Checkbox Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 15,
        validation: {
          options: [
            { value: 'optA', label: 'Option A' },
            { value: 'optB', label: 'Option B' },
          ],
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section FileUpload Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `file_field_${Date.now()}`,
        component: 'FileUpload',
        type: FieldType.FILE,
        label: 'File Upload Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 16,
        fileConfig: {
          allowedMimeTypes: ['image/jpeg', 'application/pdf'],
          maxSizeMb: 5,
        },
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section HEADING Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `heading_field_${Date.now()}`,
        component: 'Heading',
        type: FieldType.HEADING,
        label: 'Section Subheading',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 17,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section Multiple fields in one  Field 201', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `mult_fld1_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Multi Field 1',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 18,
      },
      {
        key: `mult_fld2_${Date.now()}`,
        component: 'NumberInput',
        type: FieldType.NUMBER,
        label: 'Multi Field 2',
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: 19,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    const result = await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
    expect(result.data.fields).toHaveLength(2);
  });

  test('Create Fields in a Section visibilityRules — in operator (multi-value condition)', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `visibility_in_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Visibility In Operator Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 20,
        visibilityRules: [
          {
            targetFieldKey: 'gender',
            operator: VisibilityOperator.IN,
            value: ['male', 'female'],
            action: RuleAction.SHOW,
          },
        ],
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralSuccessResponse(response, {
      statusCode: 201,
      message: 'Fields created successfully',
    });
  });

  test('Create Fields in a Section Empty Array 400', async () => {
    const payload: any[] = [];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section MIssing Keys 400', async () => {
    const payload: any[] = [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Missing Component 400', async () => {
    const payload: any[] = [
      {
        key: `missing_comp_${Date.now()}`,
        type: FieldType.SHORT_TEXT,
        label: 'No Component',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: 21,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Missing Type 400', async () => {
    const payload: any[] = [
      {
        key: `missing_type_${Date.now()}`,
        component: 'TextInput',
        label: 'No Type',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: 22,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Missing Label 400', async () => {
    const payload: any[] = [
      {
        key: `missing_label_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: 23,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Missing dataTargert 400', async () => {
    const payload: any[] = [
      {
        key: `missing_target_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'No Data Target',
        isRequired: false,
        order: 24,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Missing isRequired 400', async () => {
    const payload: any[] = [
      {
        key: `missing_req_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'No IsRequired',
        dataTarget: DataTarget.EAV,
        order: 25,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Invalid FieldType ENUM 400', async () => {
    const payload: any[] = [
      {
        key: `invalid_type_${Date.now()}`,
        component: 'TextInput',
        type: 'SUPER_TEXT',
        label: 'Invalid Type',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: 26,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields in a Section Invalid dataTarget 400', async () => {
    const payload: any[] = [
      {
        key: `invalid_target_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Invalid Target',
        dataTarget: 'SUPER_TARGET',
        isRequired: false,
        order: 27,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });

  test('Create Fields — Duplicate key within same call 409', async () => {
    const dupKey = `duplicate_key_${Date.now()}`;
    const payload: CreateFieldsRequest = [
      {
        key: dupKey,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Duplicate Field 1',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 28,
      },
      {
        key: dupKey,
        component: 'NumberInput',
        type: FieldType.NUMBER,
        label: 'Duplicate Field 2',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 29,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 409,
    });
  });

  test('Create Fields — SYSTEM SECTIONS 403', async () => {
    const systemSectionId = '00000000-0000-0000-0001-000000000001';
    const payload: CreateFieldsRequest = [
      {
        key: `system_sec_fld_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'System Section Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 30,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(systemSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 403,
    });
  });

  test('Create Fields — NON_EXISTING SECTIONS 404', async () => {
    const nonExistingSectionId = 'aa88e7a1-0473-4c1b-8a45-262d5e87ea67';
    const payload: CreateFieldsRequest = [
      {
        key: `non_exist_sec_fld_${Date.now()}`,
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Non Existing Section Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 31,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(nonExistingSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 404,
    });
  });

  test('Create Fields — File Field without fileConfig', async () => {
    const payload: CreateFieldsRequest = [
      {
        key: `file_no_config_${Date.now()}`,
        component: 'FileUpload',
        type: FieldType.FILE,
        label: 'File Without Config',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: 32,
      },
    ];
    const response = await api.post(ENDPOINTS.SECTIONS.FIELDS_BY_SECTION_ID(testSectionId), payload);
    await assertGeneralErrorResponse(response, {
      statusCode: 400,
    });
  });
});

test.describe('CREATE Field Using Mega Payload', () => {
  let api: ApiClient;
  let testSectionId: string;
  let testSectionName: string;

  test.beforeEach(async ({ request }) => {
    // Initialize login and API client
    const loginHelper = new LoginHelper(request);
    await loginHelper.login();
    api = new ApiClient(request);
    // Fetch existing templates to identify a valid section for testing
    const response = await api.get(ENDPOINTS.TEMPLATES.BY_TYPE('DEMOGRAPHICS'));
    const templates = await response.json();
    // Select the last section of the first template as the target
    testSectionId = templates.data[0].sections[templates.data[0].sections.length - 1].id;
    testSectionName = templates.data[0].sections[templates.data[0].sections.length - 1].name;
    console.log(`Test Section ID: ${testSectionId}`);
    console.log(`Test Section Name: ${testSectionName}`);
  });

  test('Create Fields in a Section Using Mega Payload', async () => {
    // Execute POST request with a comprehensive payload containing multiple field types
    const response = await api.post(`/onboarding/config/sections/${testSectionId}/fields`, megaPayload);
    console.log(await response.json());

    await assertGeneralErrorResponse(response, {
      statusCode: 500,
      error: 'InternalServerError',
      message: 'Internal server error',
      success: false,
    });
  });
});
