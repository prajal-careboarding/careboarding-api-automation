import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised API endpoint registry.
 *
 * All paths are relative to the BASE_URL configured in .env.
 * Service classes append these to the base URL via BaseApiClient.
 */
const BASE = process.env.BASE_URL?.replace(/\/$/, '');

if (!BASE) {
  throw new Error('BASE_URL is not set in the environment');
}
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  TEMPLATE_CATEGORIES: {
    BASE: '/onboarding/config/template-categories',
    BY_ID: (id: string) => `/onboarding/config/template-categories/${id}`,
    REQUIREMENTS: '/onboarding/config/template-categories/requirements',
    REQUIREMENTS_BY_ID: (id: string) => `/onboarding/config/template-categories/${id}/requirements`,
  },
  EMPLOYEE_POSITIONS: {
    BASE: '/employee-positions',
    CREATE_EMPLOYEE_POSITION: '/employee-positions',
    GET_EMPLOYEE_POSITIONS: '/employee-positions',
    GET_EMPLOYEE_POSITIONS_BY_ID: (id: string) => `/employee-positions/${id}`,
  },
  TEMPLATES: {
    BASE: '/onboarding/config/templates',
    GET_TEMPLATE_BY_ID: (id: string) => `/onboarding/config/templates/${id}`,
    GET_TEMPLATE_BY_CATEGORY: (categoryId: string) =>
      `/onboarding/config/template-categories/${categoryId}/templates`,
    GET_TEMPLATE_BY_TYPE: (type: string) => `/onboarding/config/templates?type=${type}`,
    SECTIONS: '/onboarding/config/templates/sections',
    SECTIONS_REORDER: '/onboarding/config/templates/sections/reorder',
    SECTIONS_BY_ID: (templateId: string) => `/onboarding/config/templates/${templateId}/sections`,
  },
  SECTIONS: {
    CREATE_SECTIONS: (templateId: string) => `onboarding/config/templates/${templateId}/sections`,
    DELETE_SECTIONS: (id: string) => `/onboarding/config/sections/${id}`,
    BASE: '/onboarding/config/sections',
    NEXT_ORDER_SECTIONS: (templateId: string) => `/onboarding/config/sections/${templateId}`,
    NEXT_ORDER_FIELDS: (sectionId: string) => `/onboarding/config/fields/${sectionId}`,
    BY_ID: (id: string) => `/onboarding/config/sections/${id}`,
    FIELDS: '/onboarding/config/sections/fields',
    FIELDS_REORDER: '/onboarding/config/sections/fields/reorder',
    FIELDS_BY_SECTION_ID: (sectionId: string) => `/onboarding/config/sections/${sectionId}/fields`,
    VISIBILITY: '/onboarding/config/sections/visibility',
    SECTIONS_BY_TEMPLATE_ID: (templateId: string) => `/onboarding/config/templates/${templateId}/sections`,
  },
  FIELDS: {
    CREATE_FIELDS: (sectionId: string) => `/onboarding/config/sections/${sectionId}/fields`,
    DELETE_FIELDS: (fieldId: string) => `/onboarding/config/fields/${fieldId}`,
    TOGGLE_VISIBILITY: (fieldId: string) => `/onboarding/config/fields/${fieldId}/visibility`,
  },
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id: string) => `/employees/${id}`,
    CREATE_EMPLOYEE: '/employees',
    DELETE_EMPLOYEE: (id: string) => `/employees/${id}`,
    UPDATE_EMPLOYEE: (id: string) => `/employees/${id}`,
    GET_EMPLOYEE: (id: string) => `/employees/${id}`,
  },
  ONBOARDING: {
    PACKAGES: '/onboarding/packages',
    PACKAGE_BY_ID: (id: string) => `/onboarding/packages/${id}`,
    TASKS: (employeeId: string) => `/onboarding/employees/${employeeId}/tasks`,
    TASK_BY_ID: (employeeId: string, taskId: string) => `/onboarding/employees/${employeeId}/tasks/${taskId}`,
    DASHBOARD: '/onboarding/dashboard',
    DEMOGRAPHICS: '/onboarding/demographics',
    DEMOGRAPHICS_SCHEMA: '/onboarding/demographics/schema',
    POLICY_SIGNING_RECORDS_SUBMIT: '/onboarding/policy-signing-records/submit',
    REFERENCE_ANSWERS: '/onboarding/reference/answers',
    TASKS_BASE: '/onboarding/tasks',
    DOCUMENTS: '/onboarding/tasks/documents',
  },
  POLICIES: {
    BASE: '/onboarding/config/policies',
    BY_ID: (id: string) => `/onboarding/config/policies/${id}`,
  },
  FORMS: {
    BASE: '/onboarding/config/forms',
    BY_ID: (id: string) => `/onboarding/config/forms/${id}`,
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    ME: '/users/me',
  },
  IDENTITY: {
    ORGANIZATIONS: {
      BASE: '/identity/v2/organizations',
      BY_ID: (id: string) => `/identity/v2/organizations/${id}`,
    },
    ENTITIES: {
      BASE: '/identity/v2/entities',
      BY_ID: (id: string) => `/identity/v2/entities/${id}`,
      APPROVE: (id: string) => `/identity/v2/entities/${id}/approve`,
      DECLINE: (id: string) => `/identity/v2/entities/${id}/decline`,
      DEACTIVATE: (id: string) => `/identity/v2/entities/${id}/deactivate`,
      MAKE_PRIMARY: (id: string) => `/identity/v2/entities/${id}/make-primary`,
      SUBMIT: (id: string) => `/identity/v2/entities/${id}/submit`,
      SHORT_NAME_PREVIEW: '/identity/v2/entities/short-name/preview',
      SHORT_NAME_REGENERATE: '/identity/v2/entities/short-name/regenerate',
    },
    BRANCHES: {
      BY_ID: (id: string) => `/identity/v2/branches/${id}`,
      DEACTIVATE: (id: string) => `/identity/v2/branches/${id}/deactivate`,
      MAKE_PRIMARY: (id: string) => `/identity/v2/branches/${id}/make-primary`,
      REACTIVATE: (id: string) => `/identity/v2/branches/${id}/reactivate`,
      LIST_FOR_ENTITY: (entityId: string) => `/identity/v2/entities/${entityId}/branches`,
      CREATE_FOR_ENTITY: (entityId: string) => `/identity/v2/entities/${entityId}/branches`,
    },
    SERVICE_LINES: {
      LIST: (entityId: string) => `/identity/v2/entities/${entityId}/service-lines`,
      BY_SERVICE_LINE: (entityId: string, serviceLine: string) =>
        `/identity/v2/entities/${entityId}/service-lines/${serviceLine}`,
      DISPLAY_NAME: (entityId: string, serviceLine: string) =>
        `/identity/v2/entities/${entityId}/service-lines/${serviceLine}/display-name`,
    },
    AGREEMENTS: {
      BASE: (organizationId: string) => `/identity/v2/organizations/${organizationId}/agreements`,
      BY_ID: (organizationId: string, agreementId: string) =>
        `/identity/v2/organizations/${organizationId}/agreements/${agreementId}`,
      ACKNOWLEDGE: (organizationId: string, agreementId: string) =>
        `/identity/v2/organizations/${organizationId}/agreements/${agreementId}/acknowledge`,
    },
    APPROVALS: {
      ENTITIES: '/identity/v2/approvals/entities',
      ENTITY_DIFF: (id: string) => `/identity/v2/approvals/entities/${id}/diff`,
    },
    POINT_OF_CONTACT: {
      BASE: (organizationId: string) => `/identity/v2/organizations/${organizationId}/point-of-contact`,
    },
    SERVICE_LINE_ALIASES: {
      BASE: '/identity/v2/service-line-aliases',
      BY_STATE_AND_LINE: (state: string, serviceLine: string) =>
        `/identity/v2/service-line-aliases/${state}/${serviceLine}`,
    },
    SETUP_WIZARD: {
      BASE: '/identity/v2/setup-drafts',
      ME: '/identity/v2/setup-drafts/me',
      BY_ID: (id: string) => `/identity/v2/setup-drafts/${id}`,
      BILLING: (id: string) => `/identity/v2/setup-drafts/${id}/billing`,
      COMPLETE: (id: string) => `/identity/v2/setup-drafts/${id}/complete`,
      ENTITY: (id: string) => `/identity/v2/setup-drafts/${id}/entity`,
      ORGANIZATION: (id: string) => `/identity/v2/setup-drafts/${id}/organization`,
    },
  },
  REFERENCE_CONFIG: {
    POSITION_CONFIG: '/onboarding/config/reference/position-config',
    POSITION_TEMPLATES: '/onboarding/config/reference/position-templates',
    QUESTIONS: '/onboarding/config/reference/questions',
    QUESTIONS_REORDER: '/onboarding/config/reference/questions/reorder',
    TEMPLATES: '/onboarding/config/reference/templates',
    TEMPLATES_BY_ID: (id: string) => `/onboarding/config/reference/templates/${id}`,
  },
  /** Token-based reference runtime (no Bearer auth – the token IS the URL param). */
  REFERENCE_RUNTIME: {
    BY_TOKEN: (token: string) => `/onboarding/reference/${token}`,
    SUBMIT_ANSWERS: (token: string) => `/onboarding/reference/${token}/answers`,
  },
};
