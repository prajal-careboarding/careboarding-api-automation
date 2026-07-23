import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { ApiClient } from './api-client';
import { CreateSectionsRequest } from '@models/request/employee-onboarding-config/demographics/create-section';
import { request } from 'node:http';
import { APIRequest, APIRequestContext } from '@playwright/test';
import { QA_CONSTANTS } from '@config/constants';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';

/**
 * SectionHelper
 *
 * Provides utility functions for managing sections within onboarding templates,
 * including CRUD operations and order management.
 */

/**
 * Fetches the next available order number for fields within a given section.
 *
 * @param api - The API client instance
 * @param sectionId - The ID of the section to query
 * @returns The next order number, defaults to 1 if unavailable
 */
export async function getFieldsNextOrder(api: ApiClient, sectionId: string): Promise<number> {
  try {
    const response = await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER_FIELDS(sectionId));
    const res = await response.json();
    console.log('FROM GETNEXTORDER:', res);

    if (res && res.data && typeof res.data.order === 'number') {
      return res.data.order;
    } else {
      return 1;
    }
  } catch (error) {
    console.error(`Failed to fetch next order for ID: ${sectionId}. Defaulting to 1.`, error);
    return 1;
  }
}

/**
 * Fetches the next available order number for sections within a given template.
 *
 * @param api - The API client instance
 * @param templateId - The ID of the template to query
 * @returns The next section order number, defaults to 1 if unavailable
 */
export async function getSectionsNextOrder(api: ApiClient, templateId: string): Promise<number> {
  try {
    const response = await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER_SECTIONS(templateId));
    const res = await response.json();

    if (res && res.data && typeof res.data.order === 'number') {
      return res.data.order;
    } else {
      return 1;
    }
  } catch (error) {
    console.error(`Failed to fetch next order for ID: ${templateId}. Defaulting to 1.`, error);
    return 1;
  }
}

/**
 * Creates a new test section within a template via the API.
 *
 * @param request - Playwright API request context
 * @param payload - The section creation payload
 * @param templateId - The ID of the parent template
 * @param templateType - Optional template type (unused)
 * @returns The ID of the created section
 */
export async function createNewTestSection(
  api: ApiClient,
  payload: any,
  templateId: string,
  templateType?: string
): Promise<string> {
  const createSection = await api.post(ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(templateId), payload);
  const createSectionRes = await createSection.json();
  return createSectionRes.data.id;
}

/**
 * Deletes a section by its ID.
 *
 * @param request - Playwright API request context
 * @param sectionId - The ID of the section to delete
 */
export async function deleteSection(api: ApiClient, sectionId: string) {
  const deleteSection = await api.delete(ENDPOINTS.SECTIONS.DELETE_SECTIONS(sectionId));
  const deleteSectionRes = await deleteSection.json();
  return console.log('Deleted Section:', deleteSectionRes.data);
}

/**
 * Checks if a testable section (containing QA_TEST_SECTION) exists in the DEMOGRAPHICS template.
 *
 * @param request - Playwright API request context
 * @returns True if a test section exists, false otherwise
 */
export async function checkTestableSectionExists(
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
    const testSection = result.data[0].sections.some(
      (section: any) => section.name && section.name.includes(QA_CONSTANTS.TEST_SECTION)
    );
    return testSection;
  } else {
    console.log('There is some issue with template Section Data. Please create a section manually');
    return false;
  }
}

/**
 * Retrieves the ID of a test section (containing QA_TEST_SECTION) from the DEMOGRAPHICS template.
 *
 * @param request - Playwright API request context
 * @returns The ID of the matching test section
 * @throws Error if no matching section is found
 */
export async function getTestSectionId(
  api: ApiClient,
  templateType: OnboardingTemplateType
): Promise<string> {
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
    const testSection = result.data[0].sections.find(
      (section: any) => section.name && section.name.includes(QA_CONSTANTS.TEST_SECTION)
    );
    if (testSection && testSection.id) {
      return testSection.id;
    }
  }
  throw new Error(`${QA_CONSTANTS.TEST_SECTION} not found in DEMOGRAPHICS template sections`);
}
