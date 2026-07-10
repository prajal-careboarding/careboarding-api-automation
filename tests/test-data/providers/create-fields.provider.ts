/**
 * Data provider for CREATE FIELDS API tests.
 * Each entry = one test: a name, a payload (or factory), and the expected outcome.
 */
import { DataTarget, FieldType, RuleAction, VisibilityOperator } from 'tests/enums/field.enums';
import { ApiClient } from '@helpers/api-client';
import { getFieldsNextOrder } from '@helpers/section-helper';
import { RandomGenerator } from '@utils/random-generator';

const random = new RandomGenerator();
const randomNumber = random.integer(5);
const expected = {
  status: 201,
  success: true,
  message: 'Form Field created successfully',
  assertCount: true,
  validateSchema: true,
};

export interface CreateFieldTestCase {
  name: string;
  /** Static payload, or a function when dynamic values are needed. */
  payload: any[] | (() => any[]) | ((api: ApiClient, sectionId: string) => Promise<any[]>);
  expected: {
    status: number;
    success: boolean;
    message?: string;
    /** Assert result.data.count === payload.length (only for success) */
    assertCount?: boolean;
    /** Validate against the success JSON schema */
    validateSchema?: boolean;
  };
  /** Override the section id (e.g. system / non-existent sections) */
  sectionId?: string;
}

// ─── Test Cases ──────────────────────────────────────────────────────────────

export const createFieldTestCasesBasicFields: CreateFieldTestCase[] = [
  // ─────────────────────── Success 201 ──────────────────────────────────────
  // Basic - All Field types
  {
    name: 'SHORT_TEXT — basic',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Short Text Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'LONG_TEXT — basic',
    payload: async (api, sectionId) => [
      {
        component: 'TextAreaInput',
        type: FieldType.LONG_TEXT,
        label: 'Long Text Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'NUMBER — basic',
    payload: async (api, sectionId) => [
      {
        component: 'NumberInput',
        type: FieldType.NUMBER,
        label: 'Number Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'DATE — basic',
    payload: async (api, sectionId) => [
      {
        component: 'DatePicker',
        type: FieldType.DATE,
        label: 'Date Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'BOOLEAN — basic',
    payload: async (api, sectionId) => [
      {
        component: 'BooleanToggle',
        type: FieldType.BOOLEAN,
        label: 'Boolean Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'SELECT — basic',
    payload: async (api, sectionId) => [
      {
        component: 'SingleSelect',
        type: FieldType.SELECT,
        label: 'Select Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [{ value: 'a', label: 'A' }],
        },
      },
    ],
    expected,
  },
  {
    name: 'MULTI_SELECT — basic',
    payload: async (api, sectionId) => [
      {
        component: 'MultiSelect',
        type: FieldType.MULTI_SELECT,
        label: 'Multi Select Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [{ value: 'a', label: 'A' }],
        },
      },
    ],
    expected,
  },
  {
    name: 'RADIO — basic',
    payload: async (api, sectionId) => [
      {
        component: 'RadioGroup',
        type: FieldType.RADIO,
        label: 'Radio Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [{ value: 'a', label: 'A' }],
        },
      },
    ],
    expected,
  },
  {
    name: 'CHECKBOX — basic field',
    payload: async (api, sectionId) => [
      {
        component: 'CheckboxGroup',
        type: FieldType.CHECKBOX,
        label: 'Checkbox Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [
            { value: 'optA', label: 'Option A' },
            { value: 'optB', label: 'Option B' },
          ],
        },
      },
    ],
    expected,
  },
  {
    name: 'HEADING — basic',
    payload: async (api, sectionId) => [
      {
        component: 'Heading',
        type: FieldType.HEADING,
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
        dataTarget: DataTarget.EAV,
        label: 'Heading ' + random.integer(5),
      },
    ],
    expected,
  },
  {
    name: 'SIGNATURE — basic field',
    payload: async (api, sectionId) => [
      {
        component: 'SignaturePad',
        type: FieldType.SIGNATURE,
        label: 'Signature Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected,
  },
  {
    name: 'FILE — basic field',
    payload: async (api, sectionId) => [
      {
        component: 'FileUpload',
        type: FieldType.FILE,
        label: 'File Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        fileConfig: {
          allowedMimeTypes: ['image/jpeg', 'application/pdf'],
          maxSizeMb: 10,
        },
      },
    ],
    expected,
  },
];

// ---- Fields with attribute ---- //

export const createFieldTestCasesWithAttributes: CreateFieldTestCase[] = [
  {
    name: 'SHORT_TEXT — with helpText',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Text Field With Help Text ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        helpText: 'This is a help text instructions',
      },
    ],
    expected,
  },
  {
    name: 'SHORT_TEXT — with regex validation',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'SHORT_TEXT With Regex Pattern ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: { regexPattern: '^[A-Z]{3}$' },
      },
    ],
    expected,
  },
  {
    name: 'SHORT_TEXT — with min/max length',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'SHORT_TEXT with Min Max Text Validation ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: { minLength: 5, maxLength: 10 },
      },
    ],
    expected,
  },
  {
    name: 'SELECT — with options',
    payload: async (api, sectionId) => [
      {
        component: 'SingleSelect',
        type: FieldType.SELECT,
        label: 'Select Field ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ],
        },
      },
    ],
    expected,
  },
  {
    name: 'SELECT — with visibilityRules (conditional show)',
    payload: async (api, sectionId) => [
      {
        component: 'SingleSelect',
        type: FieldType.SELECT,
        label: 'Conditional Select Field ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: {
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        visibilityRules: {
          targetFieldKey: 'has_vehicle',
          operator: VisibilityOperator.EQ,
          value: 'yes',
          action: RuleAction.SHOW,
        },
      },
    ],
    expected,
  },
  {
    name: 'DATE — with min/max date',
    payload: async (api, sectionId) => [
      {
        component: 'DatePicker',
        type: FieldType.DATE,
        label: 'Date Field ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: { minDate: '2020-01-01', maxDate: '2030-12-31' },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'DATE — no expiry',
    payload: async (api, sectionId) => [
      {
        component: 'DatePicker',
        type: FieldType.DATE,
        label: 'Date No Expiry Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'NUMBER — with min/max value',
    payload: async (api, sectionId) => [
      {
        component: 'NumberInput',
        type: FieldType.NUMBER,
        label: 'Number Field ' + random.integer(5),
        isRequired: true,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        validation: { minValue: 1, maxValue: 100 },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'FILE — with fileConfig',
    payload: async (api, sectionId) => [
      {
        component: 'FileUpload',
        type: FieldType.FILE,
        label: 'File Upload Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        fileConfig: {
          allowedMimeTypes: ['image/jpeg', 'application/pdf'],
          maxSizeMb: 5,
        },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'Multiple fields in one request',
    payload: async (api, sectionId) => {
      const startOrder = await getFieldsNextOrder(api, sectionId);
      return [
        {
          component: 'TextInput',
          type: FieldType.SHORT_TEXT,
          label: 'Multi Field 1 ' + random.integer(5),
          isRequired: false,
          dataTarget: DataTarget.EAV,
          order: startOrder,
        },
        {
          component: 'NumberInput',
          type: FieldType.NUMBER,
          label: 'Multi Field 2 ' + random.integer(5),
          isRequired: true,
          dataTarget: DataTarget.EAV,
          order: startOrder + 1,
        },
      ];
    },
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
      assertCount: true,
      validateSchema: true,
    },
  },
  {
    name: 'SHORT_TEXT — with visibilityRules (EQ)',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Conditional Text ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        visibilityRules: {
          targetFieldKey: 'some_key',
          operator: VisibilityOperator.EQ,
          value: 'trigger',
          action: RuleAction.SHOW,
        },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'SHORT_TEXT — with visibilityRules (NEQ)',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Conditional Text NEQ ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        visibilityRules: {
          targetFieldKey: 'some_key',
          operator: VisibilityOperator.NEQ,
          value: 'hide_me',
          action: RuleAction.SHOW,
        },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'SHORT_TEXT — with visibilityRules (NOT_IN)',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Visibility Not In Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        visibilityRules: {
          targetFieldKey: 'status',
          operator: VisibilityOperator.NOT_IN,
          value: ['archived', 'deleted'],
          action: RuleAction.SHOW,
        },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
  {
    name: 'visibilityRules — IN operator',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Visibility In Operator Field ' + random.integer(5),
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
        visibilityRules: {
          targetFieldKey: 'gender',
          operator: VisibilityOperator.IN,
          value: ['male', 'female'],
          action: RuleAction.SHOW,
        },
      },
    ],
    expected: {
      status: 201,
      success: true,
      message: 'Form Field created successfully',
    },
  },
];

export const createFieldTestCasesErrorCases: CreateFieldTestCase[] = [
  {
    name: 'Empty array — 400',
    payload: [],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing required keys — 400',
    payload: [{ component: 'TextInput', type: FieldType.SHORT_TEXT }],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing component — 400',
    payload: async (api, sectionId) => [
      {
        type: FieldType.SHORT_TEXT,
        label: 'No Component',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing type — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        label: 'No Type',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing label — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing dataTarget — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'No Data Target',
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing isRequired — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'No IsRequired',
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Invalid FieldType enum — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: 'SUPER_TEXT',
        label: 'Invalid Type',
        dataTarget: DataTarget.EAV,
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'Invalid dataTarget — 400',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Invalid Target',
        dataTarget: 'SUPER_TARGET',
        isRequired: false,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
  {
    name: 'System section — 403',
    sectionId: '00000000-0000-0000-0001-000000000001',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'System Section Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 403, success: false },
  },
  {
    name: 'Non-existing section — 404',
    sectionId: 'aa88e7a1-0473-4c1b-8a45-262d5e87ea67',
    payload: async (api, sectionId) => [
      {
        component: 'TextInput',
        type: FieldType.SHORT_TEXT,
        label: 'Non Existing Section Field',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 404, success: false },
  },
  {
    name: 'File field without fileConfig — 400',
    payload: async (api, sectionId) => [
      {
        component: 'FileUpload',
        type: FieldType.FILE,
        label: 'File Without Config',
        isRequired: false,
        dataTarget: DataTarget.EAV,
        order: await getFieldsNextOrder(api, sectionId),
      },
    ],
    expected: { status: 400, success: false },
  },
];

// This is for Debugging the provider Module
// export const createFieldTestCases: CreateFieldTestCase[] = [
//   {
//     name: 'SHORT_TEXT — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'TextInput',
//         type: FieldType.SHORT_TEXT,
//         label: 'Short Text Field ' + random.integer(5),
//         isRequired: true,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: {
//       status: 201,
//       success: true,
//       message: 'Form Field created successfully',
//       assertCount: true,
//       validateSchema: true,
//     },
//   },
// ]
