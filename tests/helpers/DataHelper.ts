import * as fs from 'fs';
import * as path from 'path';

/**
 * DataHelper
 *
 * Utility for loading test data from static JSON files
 * and generating dynamic test payloads.
 */
export class DataHelper {
  /**
   * Load a JSON file from the static test-data directory.
   *
   * @param relativePath - Path relative to `tests/test-data/static/`
   * @returns Parsed JSON content
   */
  static loadStaticData<T = unknown>(relativePath: string): T {
    const fullPath = path.resolve(__dirname, '../test-data/static', relativePath);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(raw) as T;
  }

  /**
   * Generate a unique string suitable for test names / identifiers.
   *
   * @param prefix - Optional prefix
   * @returns A string like "prefix_1682345678901"
   */
  static uniqueName(prefix = 'test'): string {
    return `${prefix}_${Date.now()}`;
  }

  /**
   * Generate a random email address for testing.
   */
  static randomEmail(domain = 'test.careboarding.com'): string {
    return `auto_${Date.now()}@${domain}`;
  }

  /**
   * Deep-clone an object (structuredClone polyfill for older Node).
   */
  static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }
}
