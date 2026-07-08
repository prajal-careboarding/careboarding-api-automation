import { ApiClient } from '@helpers/api-client';
import { getSectionsNextOrder } from '@helpers/section-helper';
import { APIRequest, APIRequestContext } from '@playwright/test';
import { SystemTemplateIds } from 'tests/enums/system-templates.enums';
import { QA_CONSTANTS } from '@config/constants';

/**
 * Returns an array of fixtures with section name and computed order.
 * Useful for test setup where dynamic values are needed and `await` cannot be used at top-level.
 */
export async function getDemographicsFixtures(request: any) {
  const demographicsTemplateId = SystemTemplateIds.EMPLOYEE_DEMOGRAPHICS;
  const api = new ApiClient(request);
  const order = await getSectionsNextOrder(api, demographicsTemplateId);

  return [{ name: QA_CONSTANTS.TEST_SECTION, order }];
}
