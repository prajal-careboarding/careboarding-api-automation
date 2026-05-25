import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { ApiClient } from './ApiClient';

// ─── Helper ────────────────────────────────────────────────────────────────-
export async function getNextOrder(demographicsTemplateId: string): Promise<number> {
  const api = new ApiClient();
  const res = await (await api.get(ENDPOINTS.SECTIONS.NEXT_ORDER(demographicsTemplateId))).json();
  return res.data.order;
}
