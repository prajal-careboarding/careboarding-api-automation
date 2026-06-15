import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { Faker, faker } from '@faker-js/faker';
import { ApiClient } from '@helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { test, expect } from '@playwright/test';

test('Delete employee position', async ({ request }) => {
  const login = new LoginHelper(request);
  await login.login();
  const apiClient = new ApiClient(request);
  const employeeList = await apiClient.get(ENDPOINTS.EMPLOYEE_POSITIONS.GET_EMPLOYEE_POSITIONS);
  const employeeListBody = await employeeList.json();
  const poistionIds = employeeListBody.data.map((d: { id: string }) => d.id);

  console.log('Currently present poistionIds : ', poistionIds);

  for (const id of poistionIds) {
    const deleteResponse = await apiClient.delete(`/employee-positions/${id}`);
    const deleteResponseBody = await deleteResponse.json();
    console.dir(deleteResponseBody);
  }
});

test('Delete employee position by ID', async ({ request }) => {
  const apiClient = new ApiClient(request);
  const positionId = '';

  const res = await apiClient.delete(`/employee-positions/${positionId}`);
  const resBody = await res.json();
  console.dir(resBody);
});
