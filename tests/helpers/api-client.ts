import { APIRequestContext, APIResponse } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Lightweight API client that wraps Playwright's request context
 * with automatic auth headers. No inheritance, no fixtures needed.
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

  constructor(request: APIRequestContext, token?: string | null, baseUrl?: string) {
    this.request = request;
    this.baseUrl = (baseUrl ?? process.env.BASE_URL ?? '').replace(/\/$/, '');
    this.token = ApiClient.cachedToken ?? token ?? null;

    if (!this.baseUrl) throw new Error('BASE_URL not set in .env');
  }

  static setGlobalToken(token: string) {
    ApiClient.cachedToken = token;
  }

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

  private url(endpoint: string) {
    return `${this.baseUrl}${endpoint}`;
  }

  async get(endpoint: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.get(this.url(endpoint), {
      headers: await this.headers(endpoint),
      params,
    });
  }

  async post(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.post(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  async put(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.put(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  async patch(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.patch(this.url(endpoint), {
      headers: await this.headers(endpoint),
      data,
    });
  }

  async delete(endpoint: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.delete(this.url(endpoint), {
      headers: await this.headers(endpoint),
      params,
    });
  }
}
