import { DataTarget, FieldType } from 'tests/enums/field.enums';
import { ApiClient } from '@helpers/api-client';
import { getFieldsNextOrder } from '@helpers/section-helper';
import { RandomGenerator } from '@utils/random-generator';
import { SystemPositionIds } from 'tests/enums/system-positions.enums';
import { SystemTemplateNames } from 'tests/enums/system-templates.enums';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';

const random = new RandomGenerator();

const successExpected = {
  status: 201,
  success: true,
  message: 'Template created successfully',
  assertCount: true,
  validateSchema: true,
};

export interface CreateFieldTestCase {
  name: string;
  payload: any | (() => Record<string, any>) | ((api: ApiClient, sectionId: string) => Promise<any>);
  expected: {
    status: number;
    success: boolean;
    message?: string;
    assertCount?: boolean;
    validateSchema?: boolean;
  };
  sectionId?: string;
}

// ─── All Field Types in One Section ──────────────────────────────────────────

export const allFieldTypesTestCases: CreateFieldTestCase[] = [
  {
    name: 'Scenario - All field types in one section',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `All Field Types Form ${random.integer(5)}`,
        description: 'Form with all field types',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `TEST_QA_SECTION_${random.integer(5)}`,
            description: `test_section_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Short Text ${random.integer(5)}`,
                placeholder: 'Enter short text',
                helpText: 'Help for short text',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
              {
                component: 'TextArea',
                type: FieldType.LONG_TEXT,
                label: `Long Text ${random.integer(5)}`,
                placeholder: 'Enter long text',
                helpText: 'Help for long text',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `Select ${random.integer(5)}`,
                placeholder: 'Choose an option',
                helpText: 'Help for select',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 2,
                validation: {
                  options: [
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                    { value: 'opt3', label: 'Option 3' },
                  ],
                },
              },
              {
                component: 'Checkbox',
                type: FieldType.CHECKBOX,
                label: `Checkbox ${random.integer(5)}`,
                helpText: 'Help for checkbox',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 3,
                validation: {
                  options: [
                    { value: 'chk1', label: 'Choice 1' },
                    { value: 'chk2', label: 'Choice 2' },
                    { value: 'chk3', label: 'Choice 3' },
                  ],
                },
              },
              {
                component: 'RadioGroup',
                type: FieldType.RADIO,
                label: `Radio ${random.integer(5)}`,
                helpText: 'Help for radio',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 4,
                validation: {
                  options: [
                    { value: 'radio1', label: 'Radio Option 1' },
                    { value: 'radio2', label: 'Radio Option 2' },
                    { value: 'radio3', label: 'Radio Option 3' },
                  ],
                },
              },
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Date ${random.integer(5)}`,
                placeholder: 'Select date',
                helpText: 'Help for date',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 5,
              },
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Number ${random.integer(5)}`,
                placeholder: 'Enter number',
                helpText: 'Help for number',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 6,
              },
            ],
          },
        ],
      };
    },
    expected: {
      ...successExpected,
      assertCount: true,
    },
  },
];

// ─── Multiple Sections, Multiple Fields Each ──────────────────────────────────

export const multiSectionMultiFieldTestCases: CreateFieldTestCase[] = [
  {
    name: 'Scenario - 3 sections with 2-3 fields each',
    payload: async (api: ApiClient, sectionId: string) => {
      const s1Order1 = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Multi Section Multi Field ${random.integer(5)}`,
        description: 'Form with multiple sections each having multiple fields',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_SECTION_A_${random.integer(5)}`,
            description: `section_a_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Section A Short Text ${random.integer(5)}`,
                placeholder: 'Enter short text',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1,
              },
              {
                component: 'Checkbox',
                type: FieldType.CHECKBOX,
                label: `Section A Checkbox ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 1,
                validation: {
                  options: [
                    { value: 's1_chk1', label: 'S1 Choice 1' },
                    { value: 's1_chk2', label: 'S1 Choice 2' },
                  ],
                },
              },
            ],
          },
          {
            name: `QA_SECTION_B_${random.integer(5)}`,
            description: `section_b_desc_${random.integer(5)}`,
            order: 2,
            isRepeatable: false,
            fields: [
              {
                component: 'TextArea',
                type: FieldType.LONG_TEXT,
                label: `Section B Long Text ${random.integer(5)}`,
                placeholder: 'Enter detailed text',
                helpText: 'Detailed instructions',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 2,
              },
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `Section B Select ${random.integer(5)}`,
                placeholder: 'Pick one',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 3,
                validation: {
                  options: [
                    { value: 'alpha', label: 'Alpha' },
                    { value: 'beta', label: 'Beta' },
                    { value: 'gamma', label: 'Gamma' },
                  ],
                },
              },
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Section B Number ${random.integer(5)}`,
                placeholder: 'Enter age',
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 4,
                validation: { minValue: 18, maxValue: 120 },
              },
            ],
          },
          {
            name: `QA_SECTION_C_${random.integer(5)}`,
            description: `section_c_desc_${random.integer(5)}`,
            order: 3,
            isRepeatable: false,
            fields: [
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Section C Date ${random.integer(5)}`,
                placeholder: 'Select a date',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 5,
              },
              {
                component: 'RadioGroup',
                type: FieldType.RADIO,
                label: `Section C Radio ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: s1Order1 + 6,
                validation: {
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ],
                },
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
  {
    name: 'Scenario - 2 sections with 4 fields each (all types distributed)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Two Sections Heavy ${random.integer(5)}`,
        description: 'Two sections with balanced field distribution',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.HHA],
        sections: [
          {
            name: `QA_HEAVY_A_${random.integer(5)}`,
            description: `heavy_a_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Heavy A Text ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `Heavy A Select ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
                validation: {
                  options: [
                    { value: 'x', label: 'Option X' },
                    { value: 'y', label: 'Option Y' },
                    { value: 'z', label: 'Option Z' },
                  ],
                },
              },
              {
                component: 'FileUpload',
                type: FieldType.FILE,
                label: `Heavy A File ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 2,
                fileConfig: {
                  allowedMimeTypes: ['application/pdf'],
                  maxSizeMb: 5,
                },
              },
              {
                component: 'SignaturePad',
                type: FieldType.SIGNATURE,
                label: `Heavy A Signature ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 3,
              },
            ],
          },
          {
            name: `QA_HEAVY_B_${random.integer(5)}`,
            description: `heavy_b_desc_${random.integer(5)}`,
            order: 2,
            isRepeatable: false,
            fields: [
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Heavy B Date ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 4,
              },
              {
                component: 'MultiSelect',
                type: FieldType.MULTI_SELECT,
                label: `Heavy B Multi ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 5,
                validation: {
                  options: [
                    { value: 'a', label: 'Item A' },
                    { value: 'b', label: 'Item B' },
                    { value: 'c', label: 'Item C' },
                  ],
                },
              },
              {
                component: 'BooleanToggle',
                type: FieldType.BOOLEAN,
                label: `Heavy B Boolean ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 6,
              },
              {
                component: 'Heading',
                type: FieldType.HEADING,
                label: `Heavy B Heading ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 7,
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
];

// ─── Multiple Sections, Single Field Each ────────────────────────────────────

export const multiSectionSingleFieldTestCases: CreateFieldTestCase[] = [
  {
    name: 'Scenario - 4 sections with 1 field each',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Single Field Per Section ${random.integer(5)}`,
        description: 'Each section contains exactly one field',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.DCW],
        sections: [
          {
            name: `QA_SINGLE_A_${random.integer(5)}`,
            description: `single_a_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Single A Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
            ],
          },
          {
            name: `QA_SINGLE_B_${random.integer(5)}`,
            description: `single_b_desc_${random.integer(5)}`,
            order: 2,
            isRepeatable: false,
            fields: [
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Single B Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
            ],
          },
          {
            name: `QA_SINGLE_C_${random.integer(5)}`,
            description: `single_c_desc_${random.integer(5)}`,
            order: 3,
            isRepeatable: false,
            fields: [
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Single C Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 2,
              },
            ],
          },
          {
            name: `QA_SINGLE_D_${random.integer(5)}`,
            description: `single_d_desc_${random.integer(5)}`,
            order: 4,
            isRepeatable: false,
            fields: [
              {
                component: 'RadioGroup',
                type: FieldType.RADIO,
                label: `Single D Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 3,
                validation: {
                  options: [
                    { value: 'opt_one', label: 'One' },
                    { value: 'opt_two', label: 'Two' },
                  ],
                },
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
];

// ─── Section & Field Edge Cases ─────────────────────────────────────────────

export const sectionEdgeCaseTestCases: CreateFieldTestCase[] = [
  {
    name: 'Scenario - Section with isRepeatable: true',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Repeatable Section Form ${random.integer(5)}`,
        description: 'Form with a repeatable section',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_REPEATABLE_${random.integer(5)}`,
            description: 'This section can be repeated',
            order: 1,
            isRepeatable: true,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Repeatable Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
              {
                component: 'TextArea',
                type: FieldType.LONG_TEXT,
                label: `Repeatable Notes ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
  {
    name: 'Scenario - Mixed data targets (CORE_COLUMN + EAV)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Mixed Data Targets ${random.integer(5)}`,
        description: 'Fields with both CORE_COLUMN and EAV data targets',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_MIXED_TARGET_${random.integer(5)}`,
            description: `mixed_target_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Core Column Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.CORE_COLUMN,
                order: order,
              },
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `EAV Number Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
            ],
          },
          {
            name: `QA_MIXED_TARGET_2_${random.integer(5)}`,
            description: `mixed_target_desc_2_${random.integer(5)}`,
            order: 2,
            isRepeatable: false,
            fields: [
              {
                component: 'Checkbox',
                type: FieldType.CHECKBOX,
                label: `EAV Checkbox ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 2,
                validation: {
                  options: [
                    { value: 'cb_a', label: 'Choice A' },
                    { value: 'cb_b', label: 'Choice B' },
                  ],
                },
              },
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `Core Column Select ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.CORE_COLUMN,
                order: order + 3,
                validation: {
                  options: [
                    { value: 'opt1', label: 'Option 1' },
                    { value: 'opt2', label: 'Option 2' },
                  ],
                },
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
  {
    name: 'Scenario - Single section with 8 fields (stress)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `High Density Section ${random.integer(5)}`,
        description: 'Single section packed with many field types',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_HIGH_DENSITY_${random.integer(5)}`,
            description: `high_density_desc_${random.integer(5)}`,
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `HD Text ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
              {
                component: 'TextArea',
                type: FieldType.LONG_TEXT,
                label: `HD Long ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `HD Number ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 2,
                validation: { minValue: 0, maxValue: 999 },
              },
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `HD Date ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 3,
              },
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `HD Select ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 4,
                validation: {
                  options: [
                    { value: 'r1', label: 'Red' },
                    { value: 'g1', label: 'Green' },
                    { value: 'b1', label: 'Blue' },
                  ],
                },
              },
              {
                component: 'Checkbox',
                type: FieldType.CHECKBOX,
                label: `HD Checkbox ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 5,
                validation: {
                  options: [
                    { value: 'cb1', label: 'One' },
                    { value: 'cb2', label: 'Two' },
                  ],
                },
              },
              {
                component: 'BooleanToggle',
                type: FieldType.BOOLEAN,
                label: `HD Boolean ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 6,
              },
              {
                component: 'Heading',
                type: FieldType.HEADING,
                label: `HD Heading ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 7,
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
  {
    name: 'Scenario - Section order gap (orders 1, 5, 10)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Gapped Section Order ${random.integer(5)}`,
        description: 'Sections with non-sequential order values',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_GAP_A_${random.integer(5)}`,
            description: 'First section at order 1',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Gap A ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
            ],
          },
          {
            name: `QA_GAP_B_${random.integer(5)}`,
            description: 'Second section at order 5 (gap)',
            order: 5,
            isRepeatable: false,
            fields: [
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Gap B ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
            ],
          },
          {
            name: `QA_GAP_C_${random.integer(5)}`,
            description: 'Third section at order 10 (gap)',
            order: 10,
            isRepeatable: false,
            fields: [
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Gap C ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 2,
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
  {
    name: 'Scenario - Empty section alongside populated section',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Empty Section ${random.integer(5)}`,
        description: 'One empty section and one with fields',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_EMPTY_${random.integer(5)}`,
            description: 'This section has no fields',
            order: 1,
            isRepeatable: false,
            fields: [],
          },
          {
            name: `QA_POPULATED_${random.integer(5)}`,
            description: 'This section has fields',
            order: 2,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Populated Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order,
              },
            ],
          },
        ],
      };
    },
    expected: { ...successExpected, assertCount: true },
  },
];

// ─── Basic Field Types (Individual) ─────────────────────────────────────────

// export const basicFieldTypeTestCases: CreateFieldTestCase[] = [
//   {
//     name: 'SHORT_TEXT — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'TextInput',
//         type: FieldType.SHORT_TEXT,
//         label: `Short Text ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'LONG_TEXT — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'TextArea',
//         type: FieldType.LONG_TEXT,
//         label: `Long Text ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'NUMBER — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'NumberInput',
//         type: FieldType.NUMBER,
//         label: `Number ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'DATE — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'DatePicker',
//         type: FieldType.DATE,
//         label: `Date ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'BOOLEAN — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'BooleanToggle',
//         type: FieldType.BOOLEAN,
//         label: `Boolean ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'SELECT — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'Select',
//         type: FieldType.SELECT,
//         label: `Select ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//         validation: {
//           options: [
//             { value: 'optA', label: 'Option A' },
//             { value: 'optB', label: 'Option B' },
//           ],
//         },
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'MULTI_SELECT — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'MultiSelect',
//         type: FieldType.MULTI_SELECT,
//         label: `Multi Select ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//         validation: {
//           options: [
//             { value: 'optA', label: 'Option A' },
//             { value: 'optB', label: 'Option B' },
//           ],
//         },
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'RADIO — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'RadioGroup',
//         type: FieldType.RADIO,
//         label: `Radio ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//         validation: {
//           options: [
//             { value: 'radioA', label: 'Radio A' },
//             { value: 'radioB', label: 'Radio B' },
//           ],
//         },
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'CHECKBOX — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'Checkbox',
//         type: FieldType.CHECKBOX,
//         label: `Checkbox ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//         validation: {
//           options: [
//             { value: 'chkA', label: 'Choice A' },
//             { value: 'chkB', label: 'Choice B' },
//           ],
//         },
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'HEADING — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'Heading',
//         type: FieldType.HEADING,
//         label: `Heading ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'SIGNATURE — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'SignaturePad',
//         type: FieldType.SIGNATURE,
//         label: `Signature ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//       },
//     ],
//     expected: successExpected,
//   },
//   {
//     name: 'FILE — basic',
//     payload: async (api, sectionId) => [
//       {
//         component: 'FileUpload',
//         type: FieldType.FILE,
//         label: `File ${random.integer(5)}`,
//         isRequired: false,
//         dataTarget: DataTarget.EAV,
//         order: await getFieldsNextOrder(api, sectionId),
//         fileConfig: {
//           allowedMimeTypes: ['image/jpeg', 'application/pdf'],
//           maxSizeMb: 10,
//         },
//       },
//     ],
//     expected: successExpected,
//   },
// ];

// // ─── QA Scenarios (Error & Edge Cases) ───────────────────────────────────────

export const qaScenarioTestCases: CreateFieldTestCase[] = [
  {
    name: 'Empty array — 400',
    payload: {
      name: `Empty Fields Form ${random.integer(5)}`,
      description: 'Form with no fields',
      type: OnboardingTemplateType.AGENCY_FORM,
      assignPositions: [SystemPositionIds.CNA],
      sections: [
        {
          name: `QA_EMPTY_FIELDS_${random.integer(5)}`,
          description: 'section with no fields',
          order: 1,
          isRepeatable: false,
          fields: [],
        },
      ],
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing component — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Missing Component ${random.integer(5)}`,
        description: 'Field without component',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NO_COMPONENT_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                type: FieldType.SHORT_TEXT,
                label: `No Component ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing type — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Missing Type ${random.integer(5)}`,
        description: 'Field without type',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NO_TYPE_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                label: `No Type ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing label — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Missing Label ${random.integer(5)}`,
        description: 'Field without label',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NO_LABEL_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing dataTarget — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Missing DataTarget ${random.integer(5)}`,
        description: 'Field without dataTarget',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NO_DATATARGET_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `No DataTarget ${random.integer(5)}`,
                isRequired: false,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Missing isRequired — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Missing IsRequired ${random.integer(5)}`,
        description: 'Field without isRequired',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NO_ISREQUIRED_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `No IsRequired ${random.integer(5)}`,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Invalid FieldType — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Invalid FieldType ${random.integer(5)}`,
        description: 'Field with invalid type',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_INVALID_TYPE_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: 'SUPER_TEXT',
                label: `Invalid Type ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'Invalid dataTarget — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Invalid DataTarget ${random.integer(5)}`,
        description: 'Field with invalid dataTarget',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_INVALID_DATATARGET_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Invalid DataTarget ${random.integer(5)}`,
                isRequired: false,
                dataTarget: 'SUPER_TARGET',
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'SELECT without options — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Select No Options ${random.integer(5)}`,
        description: 'Select field without options',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_SELECT_NO_OPTIONS_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'Select',
                type: FieldType.SELECT,
                label: `Select No Options ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'CHECKBOX without options — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Checkbox No Options ${random.integer(5)}`,
        description: 'Checkbox field without options',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_CHECKBOX_NO_OPTIONS_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'Checkbox',
                type: FieldType.CHECKBOX,
                label: `Checkbox No Options ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'RADIO without options — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Radio No Options ${random.integer(5)}`,
        description: 'Radio field without options',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_RADIO_NO_OPTIONS_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'RadioGroup',
                type: FieldType.RADIO,
                label: `Radio No Options ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'FILE without fileConfig — 400',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `File No Config ${random.integer(5)}`,
        description: 'File field without fileConfig',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_FILE_NO_CONFIG_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'FileUpload',
                type: FieldType.FILE,
                label: `File No Config ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 400, success: false },
  },
  {
    name: 'System section — 403',
    sectionId: '00000000-0000-0000-0001-000000000001',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `System Section Form ${random.integer(5)}`,
        description: 'Field targeted at system section',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_SYSTEM_SECTION_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `System Section Field ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 403, success: false },
  },
  {
    name: 'Non-existing section — 404',
    sectionId: 'aa88e7a1-0473-4c1b-8a45-262d5e87ea67',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Non-existing Section Form ${random.integer(5)}`,
        description: 'Field targeted at non-existing section',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NONEXISTING_SECTION_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Non-existing Section Field ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: { status: 404, success: false },
  },
  {
    name: 'SHORT_TEXT with placeholder and helpText',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `With Placeholder Form ${random.integer(5)}`,
        description: 'Field with placeholder and helpText',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_WITH_PLACEHOLDER_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `With Placeholder ${random.integer(5)}`,
                placeholder: 'Placeholder text',
                helpText: 'Help text instruction',
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order,
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with regex validation',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Regex Field Form ${random.integer(5)}`,
        description: 'Field with regex validation',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_REGEX_FIELD_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Regex Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order,
                validation: { regexPattern: '^[A-Z]{3}$' },
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with min/max length',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `MinMax Field Form ${random.integer(5)}`,
        description: 'Field with min/max length',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_MINMAX_FIELD_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `MinMax Field ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order,
                validation: { minLength: 2, maxLength: 50 },
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'NUMBER with min/max value',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Number Range Form ${random.integer(5)}`,
        description: 'Number field with min/max value',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_NUMBER_RANGE_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Number Range ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order,
                validation: { minValue: 0, maxValue: 100 },
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'Multiple fields in one request (3 fields)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Multi Field Form ${random.integer(5)}`,
        description: 'Multiple fields in one template',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_MULTI_FIELD_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Multi Field A ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
              },
              {
                component: 'NumberInput',
                type: FieldType.NUMBER,
                label: `Multi Field B ${random.integer(5)}`,
                isRequired: true,
                dataTarget: DataTarget.EAV,
                order: order + 1,
              },
              {
                component: 'DatePicker',
                type: FieldType.DATE,
                label: `Multi Field C ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order: order + 2,
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with visibilityRules (EQ)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Visibility EQ Form ${random.integer(5)}`,
        description: 'Field with EQ visibility rule',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_VISIBILITY_EQ_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Visibility EQ ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
                visibilityRules: [
                  {
                    targetFieldKey: 'trigger_field',
                    operator: 'eq',
                    value: 'show_value',
                    action: 'SHOW',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with visibilityRules (NEQ)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Visibility NEQ Form ${random.integer(5)}`,
        description: 'Field with NEQ visibility rule',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_VISIBILITY_NEQ_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Visibility NEQ ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
                visibilityRules: [
                  {
                    targetFieldKey: 'trigger_field',
                    operator: 'neq',
                    value: 'hide_me',
                    action: 'SHOW',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with visibilityRules (IN)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Visibility IN Form ${random.integer(5)}`,
        description: 'Field with IN visibility rule',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_VISIBILITY_IN_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Visibility IN ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
                visibilityRules: [
                  {
                    targetFieldKey: 'multi_choice',
                    operator: 'in',
                    value: ['val1', 'val2'],
                    action: 'SHOW',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
  {
    name: 'SHORT_TEXT with visibilityRules (NOT_IN)',
    payload: async (api: ApiClient, sectionId: string) => {
      const order = await getFieldsNextOrder(api, sectionId);
      return {
        name: `Visibility NOT_IN Form ${random.integer(5)}`,
        description: 'Field with NOT_IN visibility rule',
        type: OnboardingTemplateType.AGENCY_FORM,
        assignPositions: [SystemPositionIds.CNA],
        sections: [
          {
            name: `QA_VISIBILITY_NOT_IN_${random.integer(5)}`,
            description: 'section',
            order: 1,
            isRepeatable: false,
            fields: [
              {
                component: 'TextInput',
                type: FieldType.SHORT_TEXT,
                label: `Visibility NOT_IN ${random.integer(5)}`,
                isRequired: false,
                dataTarget: DataTarget.EAV,
                order,
                visibilityRules: [
                  {
                    targetFieldKey: 'status',
                    operator: 'not_in',
                    value: ['archived', 'deleted'],
                    action: 'SHOW',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    expected: successExpected,
  },
];
