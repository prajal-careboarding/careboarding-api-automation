import { logger } from './Logger';

/**
 * Options for the retry mechanism.
 */
export interface RetryOptions {
  /** Maximum number of attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay between retries in ms (default: 1000) */
  delayMs?: number;
  /** Backoff multiplier applied after each retry (default: 2) */
  backoffMultiplier?: number;
  /** HTTP status codes that should trigger a retry (default: [408, 429, 500, 502, 503, 504]) */
  retryableStatuses?: number[];
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> =
  {
    maxRetries: 3,
    delayMs: 1000,
    backoffMultiplier: 2,
    retryableStatuses: [
      408, 429, 500, 502, 503, 504,
    ],
  };

/**
 * Execute an async function with retry logic.
 *
 * @param fn - The async function to execute
 * @param options - Retry configuration
 * @returns The result of the function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const config = {
    ...DEFAULT_RETRY_OPTIONS,
    ...options,
  };

  let lastError: Error | undefined;
  let delay = config.delayMs;

  for (
    let attempt = 1;
    attempt <= config.maxRetries;
    attempt++
  ) {
    try {
      return await fn();
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error(String(error));

      if (attempt < config.maxRetries) {
        logger.warn(
          `Attempt ${attempt}/${config.maxRetries} failed. Retrying in ${delay}ms…`,
          { error: lastError.message }
        );
        await sleep(delay);
        delay *= config.backoffMultiplier;
      }
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}
