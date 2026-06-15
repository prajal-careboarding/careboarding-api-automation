import { ApiClient } from '@helpers/api-client';
import { test, expect } from '@playwright/test';

test('Delete all template', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const res = await apiClient.get('/onboarding/config/templates?type=AGENCY_FORM');
  const body = await res.json();
  console.dir(body);
  const templateId = body.data.map((d: { id: string }) => d.id);
  console.log(templateId);

  for (const id of templateId) {
    const deleteRes = await apiClient.delete(`/onboarding/config/templates/${id}`);
    const deleteResBody = await deleteRes.json();
    console.dir(deleteResBody);
    expect(deleteRes.ok()).toBeTruthy();
  }

  console.log('All custom templates deleted');
});

test('Delete specific template', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const res = await apiClient.get('/onboarding/config/templates?type=AGENCY_FORM');
  const body = await res.json();
  console.dir(body);
  const templateId = body.data.map((d: { id: string }) => d.id);
  console.log(templateId);

  for (const id of templateId) {
    const deleteRes = await apiClient.delete(`/onboarding/config/templates/${id}`);
    const deleteResBody = await deleteRes.json();
    console.dir(deleteResBody);
    expect(deleteRes.ok()).toBeTruthy();
  }
});
