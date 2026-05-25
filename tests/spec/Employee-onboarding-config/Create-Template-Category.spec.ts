/**
 * Test Suite: Create Template Category
 *
 * Verifies CRUD operations on the Template Categories endpoint.
 * Uses the lightweight ApiClient for requests.
 */
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { ENDPOINTS } from '../../api/endpoints/api-endpoints';

test.describe('Template Categories', () => {
  let api: ApiClient;
  let createdId: string;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('TC-001 — should create a new template category', async () => {
    const response = await api.post(ENDPOINTS.TEMPLATE_CATEGORIES.BASE, {
      name: 'Automation Test Category',
      type: 'POLICY',
      description: 'Created by API automation suite',
      isActive: true,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id');
    createdId = body.id;
  });

  test('TC-002 — should list all template categories', async () => {
    const response = await api.get(ENDPOINTS.TEMPLATE_CATEGORIES.BASE);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('TC-003 — should get a template category by ID', async () => {
    // Skip if no ID was captured from a prior create
    test.skip(!createdId, 'No category was created to retrieve');

    const response = await api.get(ENDPOINTS.TEMPLATE_CATEGORIES.BY_ID(createdId));

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(createdId);
  });

  test('TC-004 — should update a template category', async () => {
    test.skip(!createdId, 'No category was created to update');

    const response = await api.put(ENDPOINTS.TEMPLATE_CATEGORIES.BY_ID(createdId), {
      name: 'Updated Category Name',
      type: 'POLICY',
      description: 'Updated by automation',
      isActive: true,
    });

    expect(response.ok()).toBeTruthy();
  });

  test('TC-005 — should delete a template category', async () => {
    test.skip(!createdId, 'No category was created to delete');

    const response = await api.delete(ENDPOINTS.TEMPLATE_CATEGORIES.BY_ID(createdId));

    expect(response.ok()).toBeTruthy();
  });
});
