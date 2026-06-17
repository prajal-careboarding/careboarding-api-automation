import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { ApiClient } from './api-client';
import { CreateSectionsRequest } from '@models/request/employee-onboarding-config/demographics/create-section';
import { request } from 'node:http';
import { APIRequestContext } from '@playwright/test';

export async function getFieldsNextOrder(api: ApiClient, id: string): Promise<number> {
  try {
    const response = await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER_FIELDS(id));
    const res = await response.json();

    if (res && res.data && typeof res.data.order === 'number') {
      return res.data.order;
    } else {
      return 1;
    }
  } catch (error) {
    console.error(`Failed to fetch next order for ID: ${id}. Defaulting to 1.`, error);
    return 1;
  }
}

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

export async function createNewTestSection(
  request: APIRequestContext,
  payload: any,
  templateId: string,
  templateType?: string
): Promise<string> {
  const api = new ApiClient(request); // 'request' usually injected in Playwright test context
  const createSection = await api.post(ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(templateId), payload);
  const createSectionRes = await createSection.json();
  return createSectionRes.data.id;
}

export async function deleteSection(request: APIRequestContext, sectionId: string) {
  const api = new ApiClient(request); // 'request' usually injected in Playwright test context
  const deleteSection = await api.delete(ENDPOINTS.SECTIONS.DELETE_SECTIONS(sectionId));
  const deleteSectionRes = await deleteSection.json();
  return console.log('Deleted Section:', deleteSectionRes.data);
}

/**
 * Checks if there's at least one section available in DEMOGRAPHICS templates for testing.
 * Returns the first section's id if found, or throws an error if not found.
 */

/**
 * Checks for the existence of a section in DEMOGRAPHICS templates.
 * @returns {Promise<Boolean>} - Returns true if found, otherwise throws.
 */
export async function checkTestableSectionExists(request: APIRequestContext): Promise<Boolean> {
  const api = new ApiClient(request);
  const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
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
      (section: any) => section.name && section.name.includes('QA_TEST_SECTION')
    );
    return testSection;
  } else {
    console.log('There is some issue with Demographics Data. Please create a section manually');
    return false;
  }
}

export async function getTestSectionId(request: APIRequestContext): Promise<string> {
  const api = new ApiClient(request); // 'request' usually injected in Playwright test context
  const response = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
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
      (section: any) => section.name && section.name.includes('QA_TEST_SECTION')
    );
    if (testSection && testSection.id) {
      return testSection.id;
    }
  }
  throw new Error('QA_TEST_SECTION not found in DEMOGRAPHICS template sections');
}
