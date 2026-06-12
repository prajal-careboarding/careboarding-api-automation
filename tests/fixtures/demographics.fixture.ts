import { ApiClient } from '@helpers/ApiClient';
import { getSectionsNextOrder } from '@helpers/sectionHelper';
import { SystemTemplateIds } from 'tests/enums/SystemTemplates.enums';

/**
 * Returns an array of fixtures with section name and computed order.
 * Useful for test setup where dynamic values are needed and `await` cannot be used at top-level.
 */
export async function getDemographicsFixtures(request: any) {
  const demographicsTemplateId = SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS;
  const api = new ApiClient(request);
  const order = await getSectionsNextOrder(api, demographicsTemplateId);

  return [{ name: 'QA_TEST_SECTION', order }];
}
