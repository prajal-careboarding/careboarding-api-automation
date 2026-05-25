/**
 * Represents a single field item with its target order for reordering.
 */
export interface ReorderFieldItem {
  id: string;
  order: number;
}

/**
 * Request payload for reordering fields in a section.
 */
export type ReorderFieldsRequest = ReorderFieldItem[];
