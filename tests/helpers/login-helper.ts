import { APIRequestContext, expect } from '@playwright/test';
import { ApiClient } from './api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';

/**
 * LoginHelper
 *
 * Provides methods to authenticate and obtain tokens.
 */
export class LoginHelper {
  private readonly apiClient: ApiClient;

  constructor(request: APIRequestContext, token?: string) {
    this.apiClient = new ApiClient(request, token, process.env.IDENTITY_API_BASE_URL);
  }

  /**
   * Performs a login request and returns the access token.
   *
   * @param email - User email (defaults to process.env.AUTH_USERNAME)
   * @param password - User password (defaults to process.env.AUTH_PASSWORD)
   * @returns The bearer token string
   */
  async login(email = process.env.AUTH_USERNAME, password = process.env.AUTH_PASSWORD): Promise<string> {
    if (!email || !password) {
      throw new Error('Login credentials (email/password) are missing.');
    }

    const response = await this.apiClient.post(ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
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
