import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { CreateTemplateRequest } from '@models/request/employee-onboarding-config/employee-forms/create-template';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';

/**
 * Creates a new test template via the API and returns its ID.
 *
 * @param request - Playwright API request context
 * @param name - Name for the new template
 * @param templateType - Type of template to create
 * @returns The ID of the created template
 */
export async function createNewTestTemplate(
  api: ApiClient,
  name: string,
  templateType: OnboardingTemplateType
): Promise<string> {
  const payload: CreateTemplateRequest = {
    name,
    description: 'This is a test Template made from Automation',
    type: templateType,
  };

  const createTemplate = await api.post(ENDPOINTS.TEMPLATES.CREATE_TEMPLATE, payload);

  const createTemplateRes = await createTemplate.json();
  console.log(createTemplateRes);
  return createTemplateRes.data.id;
}

/**
 * Checks whether at least one template with "QA_TEST_TEMPLATE" in its name exists
 * for the given template type, and that it has sections configured.
 *
 * @param request - Playwright API request context
 * @param templateType - The onboarding template type to check
 * @returns True if a testable QA_TEST_TEMPLATE exists, false otherwise
 */
import { QA_CONSTANTS } from '@config/constants';

export async function checkTestableTemplateExists(
  api: ApiClient,
  templateType: OnboardingTemplateType
): Promise<Boolean> {
  const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE(templateType));
  const result = await response.json();

  if (
    result &&
    Array.isArray(result.data) &&
    result.data.length > 0 &&
    result.data[0].sections &&
    Array.isArray(result.data[0].sections) &&
    result.data[0].sections.length > 0
  ) {
    const testTemplate = result.data.some(
      (template: any) => template.name && template.name.includes(QA_CONSTANTS.TEST_TEMPLATE)
    );
    return testTemplate;
  } else {
    console.log('There is some issue with template data. Please create a template manually');
    return false;
  }
}

/**
 * Retrieves the ID of a template whose name contains "QA_TEST_TEMPLATE"
 * for the given template type.
 *
 * @param request - Playwright API request context
 * @param templateType - The onboarding template type to search
 * @returns The ID of the matching QA_TEST_TEMPLATE
 * @throws Error if no matching template is found
 */
export async function getTestTemplateId(
  api: ApiClient,
  templateType: OnboardingTemplateType
): Promise<string> {
  const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE(templateType));
  const result = await response.json();
  console.log(result);
  if (result && Array.isArray(result.data) && result.data.length > 0) {
    const testTemplate = result.data.find(
      (template: any) => template.name && template.name.includes(QA_CONSTANTS.TEST_TEMPLATE)
    );
    if (testTemplate && testTemplate.id) {
      return testTemplate.id;
    }
  }
  throw new Error(`${QA_CONSTANTS.TEST_TEMPLATE} not found in template list`);
}

/**
 * Retrieves the ID of a template whose name contains "QA_TEST_TEMPLATE"
 * for the given template type.
 *
 * @param request - Playwright API request context
 * @param templateType - The onboarding template type to search
 * @returns The ID of the matching QA_TEST_TEMPLATE
 * @throws Error if no matching template is found
 */
export async function setupTestTemplate(
  api: ApiClient,
  templateType: OnboardingTemplateType
): Promise<string> {
  // Reuse existing QA_TEST_TEMPLATE if one already exists for this type,
  // otherwise create a new one.
  const templateId = (await checkTestableTemplateExists(api, templateType))
    ? await getTestTemplateId(api, templateType)
    : await createNewTestTemplate(api, QA_CONSTANTS.TEST_TEMPLATE, templateType);

  return templateId;
}
