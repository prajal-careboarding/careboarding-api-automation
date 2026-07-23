import { APIRequestContext, expect } from '@playwright/test';
import { ApiClient } from './api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import dotenv from 'dotenv';
dotenv.config();

/**
 * LoginHelper
 *
 * Provides methods to authenticate and obtain tokens.
 */
export class LoginHelper {
  constructor(private request: APIRequestContext) {}

  /**
   * Retrieves the cached token or performs a login request if needed
   *
   * @param email - User email (defaults to process.env.AUTH_USERNAME)
   * @param password - User password (defaults to process.env.AUTH_PASSWORD)
   * @returns The bearer token string
   */
  async login(
    email = process.env.AUTH_USERNAME,
    password = process.env.AUTH_PASSWORD
  ): Promise<string | null> {
    {
      if (!email || !password) {
        throw new Error('Login credentials (email/password) are missing.');
      }
      if (ApiClient.getCachedToken()) {
        console.log('Using Cached Token');
        // console.log(ApiClient.getCachedToken());
        return ApiClient.getCachedToken();
      }

      const response = await this.request.post(process.env.IDENTITY_API_BASE_URL + ENDPOINTS.AUTH.LOGIN, {
        data: {
          email,
          password,
        },
      });
      expect(response.status(), 'Login failed').toBe(200);

      const body = await response.json();
      const token = body.token || body.accessToken || body.data?.token;

      if (!token) {
        throw new Error('Login successful but no token found in response body');
      }

      // Sets token for all the requests
      ApiClient.setGlobalToken(token);

      return token;
    }
  }
}
