import { APIRequest, APIRequestContext, APIResponse } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ApiClient
 *
 * Lightweight API client that wraps Playwright's request context
 * with automatic auth headers and base URL configuration.
 * Supports lazy authentication and token caching for test automation.
 *
 * Usage:
 *   const api = new ApiClient(request);
 *   const res = await api.post('/employees', { firstName: 'John' });
 */
export class ApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;
  private readonly token: string | null;
  private static cachedToken: string | null;

  /**
   * Creates a new ApiClient instance.
   *
   * @param request - Playwright API request context
   * @param token - Optional auth token (falls back to cached token)
   * @param baseUrl - Optional base URL (falls back to BASE_URL env var)
   * @throws Error if BASE_URL is not configured
   */
  constructor(request: APIRequestContext, token?: string | null, baseUrl?: string) {
    this.request = request;
    this.baseUrl = (baseUrl ?? process.env.BASE_URL ?? '').replace(/\/$/, '');
    this.token = ApiClient.cachedToken ?? token ?? null;

    if (!this.baseUrl) throw new Error('BASE_URL not set in .env');
  }

  /**
   * Sets a global token for all subsequent API requests.
   *
   * @param token - The auth token to cache globally
   */
  static setGlobalToken(token: string) {
    ApiClient.cachedToken = token;
  }

  static getCachedToken() {
    return ApiClient.cachedToken;
  }

  /**
   * Retrieves a valid token, attempting lazy login if needed.
   *
   * @returns The cached token or a newly obtained token, or null if unavailable
   */
  private async getValidToken(): Promise<string | null> {
    if (ApiClient.cachedToken) {
      return ApiClient.cachedToken;
    }

    const email = process.env.AUTH_USERNAME;
    const password = process.env.AUTH_PASSWORD;

    if (!email || !password) {
      return this.token;
    }

    const identityUrl = (process.env.IDENTITY_API_BASE_URL ?? '').replace(/\/$/, '');
    if (!identityUrl) {
      return this.token;
    }

    try {
      const response = await this.request.post(`${identityUrl}/auth/login`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { email, password },
      });

      if (response.ok()) {
        const body = await response.json();
        const token = body.token || body.accessToken || body.data?.token;
        if (token) {
          ApiClient.cachedToken = token;
          return token;
        }
      }
    } catch (e) {
      console.error('Lazy login failed:', e);
    }

    return this.token;
  }

  /**
   * Constructs request headers with Content-Type, Accept, and optional Authorization.
   * Skips auth header for login endpoint.
   *
   * @param endpoint - The API endpoint being called
   * @param extra - Optional additional headers to include
   * @returns Headers object ready for use in API requests
   */
  private async headers(endpoint: string, extra?: Record<string, string>) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...extra,
    };

    if (endpoint.includes('/auth/login')) {
      return headers;
    }

    let tokenToUse = this.token;

    if (tokenToUse) {
      headers['Authorization'] = `Bearer ${tokenToUse}`;
    }

    return headers;
  }

  /**
   * Constructs the full URL for an API endpoint.
   *
   * @param endpoint - The relative endpoint path
   * @returns The complete URL with base URL prefix
   */
  private url(endpoint: string) {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @param endpoint - The API endpoint path
   * @param params - Optional query parameters
   * @returns API response
   */
  async get(endpoint: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.get(this.url(endpoint), {
      headers: await this.headers(endpoint),
      params,
    });
  }

  /**
   * Sends a POST request to the specified endpoint.
   *
   * @param endpoint - The API endpoint path
   * @param data - The request body payload
   * @returns API response
   */
  async post(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.post(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  /**
   * Sends a PUT request to the specified endpoint.
   *
   * @param endpoint - The API endpoint path
   * @param data - The request body payload
   * @returns API response
   */
  async put(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.put(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  /**
   * Sends a PATCH request to the specified endpoint.
   *
   * @param endpoint - The API endpoint path
   * @param data - The request body payload
   * @returns API response
   */
  async patch(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.patch(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param endpoint - The API endpoint path
   * @param params - Optional query parameters
   * @returns API response
   */
  async delete(endpoint: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.delete(this.url(endpoint), {
      headers: await this.headers(endpoint),
      params,
    });
  }
}
