import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { ApiClient } from './ApiClient';
import { CreateSectionRequest } from '@models/request/Employee-onboarding-config/Demographics/create-section';

export async function getNextOrder(api: ApiClient, id: string): Promise<number> {
  try {
    const response = await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER_FIELDS(id));
    const res = await response.json();

    if (res && res.data && typeof res.data.order === 'number') {
      return res.data.order;
    }
  } catch (error) {
    console.error(`Failed to fetch next order for ID: ${id}. Defaulting to 1.`, error);
    return 1;
  }
}

export async function createNewSection(
  api: ApiClient,
  payload: CreateSectionRequest,
  templateId?: string,
  templateName?: string
) {
  const sectionResponse = await api.post(ENDPOINTS.SECTIONS.SECTIONS_BY_TEMPLATE_ID(templateId!), payload);
}
