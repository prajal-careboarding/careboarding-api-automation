/**
 * Logger
 *
 * Lightweight logger for API automation.
 * Provides structured request/response logging with timestamps.
 */
class Logger {
  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  /** Log an outgoing HTTP request */
  logRequest(method: string, url: string, body?: object): void {
    const ts = this.formatTimestamp();
    console.log(`\n[${ts}] REQ: ${method} ${url}`);
    if (body) {
      console.log(`Body: ${JSON.stringify(body, null, 2)}`);
    }
  }

  /** Log an incoming HTTP response */
  logResponse(method: string, url: string, status: number): void {
    const ts = this.formatTimestamp();
    const statusPrefix = status < 400 ? 'PASS' : 'FAIL';
    console.log(`[${ts}] RES [${statusPrefix}]: ${method} ${url} → ${status}`);
  }

  /** General info log */
  info(message: string, data?: unknown): void {
    const ts = this.formatTimestamp();
    console.log(`[${ts}] INFO: ${message}`);
    if (data !== undefined) {
      console.log(`  ${JSON.stringify(data, null, 2)}`);
    }
  }

  /** Warning log */
  warn(message: string, data?: unknown): void {
    const ts = this.formatTimestamp();
    console.warn(`[${ts}] WARN: ${message}`);
    if (data !== undefined) {
      console.warn(`  ${JSON.stringify(data, null, 2)}`);
    }
  }

  /** Error log */
  error(message: string, error?: unknown): void {
    const ts = this.formatTimestamp();
    console.error(`[${ts}] ERROR: ${message}`);
    if (error !== undefined) {
      console.error(`  `, error);
    }
  }
}

/** Singleton logger instance */
export const logger = new Logger();
