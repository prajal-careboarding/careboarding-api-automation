import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';
import { LoginHelper } from '@helpers/login-helper';
import { checkTestableSectionExists, createNewTestSection, getTestSectionId } from '@helpers/section-helper';
import { getDemographicsFixtures } from '@fixtures/demographics.fixture';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';

test.describe('DELETE SECTION API', () => {
  test.describe.configure({ mode: 'serial' }); // This configuration is required because in before each we are creating a section and deleting it in the test, if we don't configure it to serial mode, it will run the tests in parallel and we will get an error because the section will be deleted before the test runs
  let api: ApiClient;
  let testSectionId: string;

  test.beforeEach(async ({ request }) => {
    await new LoginHelper(request).login();
    api = new ApiClient(request);
    // Get testable section
    testSectionId = (await checkTestableSectionExists(request))
      ? await getTestSectionId(request)
      : await createNewTestSection(
          request,
          await getDemographicsFixtures(request),
          SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS
        );
  });

  test('Delete Section', async () => {
    // URL: /onboarding/config/sections/db52ee08-2864-4866-bc16-2540dcdcf487
    const response = await api.delete(ENDPOINTS.SECTIONS.DELETE_SECTIONS(testSectionId));
    expect(response.ok()).toBeTruthy();
  });
});
