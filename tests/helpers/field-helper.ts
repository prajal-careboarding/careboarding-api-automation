import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { logger } from '@utils/logger';
import { FieldType } from 'tests/enums/field.enums';
import { TemplateType } from '@models/request/employee-onboarding-config/templates/create-template';

/**
 * FieldHelper
 *
 * Provides utility functions for creating and managing fields within sections
 * of onboarding templates.
 */

/**
 * Creates a new test field within a section and retrieves its ID.
 *
 * @param request - Playwright API request context
 * @param payload - The field creation payload
 * @param sectionId - The ID of the parent section
 * @returns The ID of the created field
 * @throws Error if field creation fails
 */
export async function createNewTestField(
  api: ApiClient,
  payload: any,
  templateType: TemplateType,
  sectionId: string
): Promise<string> {
  // Create Field in section
  const createFieldResponse = await api.post(ENDPOINTS.FIELDS.CREATE_FIELDS(sectionId), payload);
  if (!createFieldResponse.ok()) {
    throw new Error('Failed to create field');
  }

  // This extra step was required because the created field response only shows count but not the created field id
  // Get Template and extract field
  const getTemplateResponse = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
  const getTemplateResponseData = await getTemplateResponse.json();

  // Find and extract the created fieldId
  const createdField = getTemplateResponseData.data[0].sections
    .find((item: any) => item.id === sectionId)
    ?.fields.find((field: any) => field.label === payload[0].label);

  console.log('Created Field in Section: ', createdField);
  return createdField.id;
}
