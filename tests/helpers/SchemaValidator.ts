import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/Logger';

/**
 * Minimal JSON-Schema-style validator.
 *
 * For production-grade validation consider `ajv`, but this lightweight
 * implementation keeps the dependency tree small for test automation.
 */
export class SchemaValidator {
  /**
   * Load a JSON schema from the `schemas/` directory.
   *
   * @param schemaName - Filename (e.g. `user.schema.json`)
   */
  static loadSchema(schemaName: string): Record<string, unknown> {
    const fullPath = path.resolve(__dirname, '../../schemas', schemaName);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(raw) as Record<string, unknown>;
  }

  /**
   * Assert that `data` contains every required top-level key
   * listed in the schema's `required` array.
   *
   * Throws on the first missing key.
   */
  static assertRequiredFields(
    data: Record<string, unknown>,
    schema: Record<string, unknown>
  ): void {
    const required = schema.required as string[] | undefined;
    if (!required) return;

    for (const field of required) {
      if (!(field in data)) {
        throw new Error(`Missing required field: "${field}"`);
      }
    }
    logger.info('Schema required-field validation passed');
  }

  /**
   * Assert that every key in `data` is listed in the schema's
   * `properties` object (no unexpected fields).
   */
  static assertNoExtraFields(data: Record<string, unknown>, schema: Record<string, unknown>): void {
    const properties = (schema.properties as Record<string, unknown>) ?? {};
    const allowed = new Set(Object.keys(properties));

    for (const key of Object.keys(data)) {
      if (!allowed.has(key)) {
        throw new Error(`Unexpected field: "${key}"`);
      }
    }
    logger.info('Schema no-extra-fields validation passed');
  }

  /**
   * Convenience: run both required + no-extra validations.
   */
  static validate(data: Record<string, unknown>, schema: Record<string, unknown>): void {
    SchemaValidator.assertRequiredFields(data, schema);
    SchemaValidator.assertNoExtraFields(data, schema);
  }
}
