/**
 * Request model for Bulk Save Position Templates API.
 */
export interface BulkSavePositionTemplatesRequest {
  tab: 'POLICIES' | 'FORMS' | 'DOCUMENTS' | string;
  templateIds: string[];
  isRequired?: boolean;
  isVisible?: boolean;
  retroactive?: boolean;
}
