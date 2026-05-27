import { GeneralErrorResponse } from '@models/response/GeneralErrorResponse';
import { GeneralSuccessResponse } from '@models/response/GeneralSuccessResponse';
import { APIRequest, APIResponse, expect } from '@playwright/test';

/**
 * Helper assertion function to validate that a response (either a Playwright APIResponse
 * or a parsed JSON body) matches the GeneralErrorResponse structure and expected properties.
 *
 * @param response - The Playwright APIResponse object or the already parsed JSON body.
 * @param expected - Optional expectations to assert specific values or patterns.
 * @returns The verified GeneralErrorResponse JSON object.
 */
export async function assertGeneralErrorResponse(
  response: APIResponse | any,
  expected?: {
    statusCode?: number;
    error?: string;
    success?: boolean;
    message?: string | RegExp;
  }
): Promise<GeneralErrorResponse> {
  let body: any;

  if (response && typeof response.json === 'function') {
    // If it's a Playwright APIResponse object
    const apiResponse = response as APIResponse;
    const expectedStatus = expected?.statusCode ?? 400;

    expect(apiResponse.status(), `Expected HTTP status code to be ${expectedStatus} but got ${apiResponse.status()}`).toBe(expectedStatus);

    body = await apiResponse.json();
  } else {
    body = response;
  }

  // General structural assertions
  expect(body, 'Response body should be defined').toBeDefined();
  expect(body.success, 'Expected "success" property to be false').toBe(false);

  expect(typeof body.statusCode, 'Expected "statusCode" to be a number').toBe('number');
  expect(typeof body.error, 'Expected "error" to be a string').toBe('string');
  expect(typeof body.message, 'Expected "message" to be a string').toBe('string');
  expect(typeof body.timestamp, 'Expected "timestamp" to be a string').toBe('string');
  expect(Array.isArray(body.validationErrors), 'Expected "validationErrors" to be an array').toBe(true);

  // Specific value assertions
  if (expected) {
    if (expected.statusCode !== undefined) {
      expect(body.statusCode, `Expected "statusCode" to be ${expected.statusCode}`).toBe(expected.statusCode);
    }

    if (expected.error !== undefined) {
      expect(body.error, `Expected "error" code to be "${expected.error}"`).toBe(expected.error);
    }

    if (expected.message !== undefined) {
      if (expected.message instanceof RegExp) {
        expect(body.message, `Expected "message" to match pattern ${expected.message}`).toMatch(expected.message);
      } else {
        expect(body.message, `Expected "message" to be "${expected.message}"`).toBe(expected.message);
      }
    }
  }

  return body as GeneralErrorResponse;
}

/**
 * Helper assertion function to validate that a response (either a Playwright APIResponse
 * or a parsed JSON body) matches the GeneralSuccessResponse structure and expected properties.
 *
 * @param response - The Playwright APIResponse object or the already parsed JSON body.
 * @param expected - Optional expectations to assert specific values or patterns.
 * @returns The verified GeneralSuccessResponse JSON object.
 */
export async function assertGeneralSuccessResponse<T = any>(
  response: APIResponse | any,
  expected?: {
    statusCode?: number;
    message?: string | RegExp;
  }
): Promise<GeneralSuccessResponse<T>> {
  let body: any;

  if (response && typeof response.json === 'function') {
    // If it's a Playwright APIResponse object
    const apiResponse = response as APIResponse;
    const expectedStatus = expected?.statusCode ?? 200;

    expect(apiResponse.status(), `Expected HTTP status code to be ${expectedStatus} but got ${apiResponse.status()}`).toBe(expectedStatus);

    body = await apiResponse.json();
  } else {
    body = response;
  }

  // General structural assertions
  expect(body, 'Response body should be defined').toBeDefined();
  expect(body.success, 'Expected "success" property to be true').toBe(true);
  expect(typeof body.message, 'Expected "message" to be a string').toBe('string');
  expect(body.data, 'Expected "data" property to be defined').toBeDefined();

  // Specific value assertions
  if (expected) {
    if (expected.message !== undefined) {
      if (expected.message instanceof RegExp) {
        expect(body.message, `Expected "message" to match pattern ${expected.message}`).toMatch(expected.message);
      } else {
        expect(body.message, `Expected "message" to be "${expected.message}"`).toBe(expected.message);
      }
    }
  }

  return body as GeneralSuccessResponse<T>;
}
