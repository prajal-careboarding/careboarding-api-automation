import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { getDefaultAutoSelectFamily } from 'net';
import { logger } from '@utils/logger';

export async function createNewTestField(
  request: APIRequestContext,
  payload: any,
  sectionId: string
): Promise<string> {
  const api = new ApiClient(request); // 'request' usually injected in Playwright test context

  // Create Field in section
  const createFieldResponse = await api.post(ENDPOINTS.FIELDS.CREATE_FIELDS(sectionId), payload);
  logger.info('Create Field Response: ', await createFieldResponse.json());
  logger.info('Create Field Status: ', createFieldResponse.status());
  if (!createFieldResponse.ok()) {
    throw new Error('Failed to create field');
  }

  // Get Template and extract field
  const getTemplateResponse = await api.get(ENDPOINTS.TEMPLATES.GET_TEMPLATE_BY_TYPE('DEMOGRAPHICS'));
  const getTemplateResponseData = await getTemplateResponse.json();

  // Find and extract the created fieldId
  const createdField = getTemplateResponseData.data[0].sections
    .find((item: any) => item.id === sectionId)
    ?.fields.find((field: any) => field.label === payload[0].label);

  logger.info('Created Field :', createdField);
  return createdField.id;
}
