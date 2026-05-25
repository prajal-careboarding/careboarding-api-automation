/**
 * Represents a single section item with its target order for reordering.
 */
export interface ReorderSectionItem {
  id: string;
  order: number;
}

/**
 * Request payload for reordering sections in a template.
 */
export type ReorderSectionsRequest = ReorderSectionItem[];
