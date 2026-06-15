import { faker } from '@faker-js/faker';

/**
 * Utility class to generate random test data.
 * Encapsulates the faker library to provide a unified interface for data generation.
 */
export class RandomGenerator {
  /**
   * Generates a random string.
   */
  string(length?: number): string {
    return faker.string.alpha(length);
  }

  /**
   * Generates a random integer between min and max.
   */
  integer(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return faker.number.int({ min, max });
  }

  /**
   * Generates random lorem ipsum words.
   */
  words(wordCount: number = 5): string {
    return faker.lorem.words(wordCount);
  }

  /**
   * Generates a random paragraph.
   */
  paragraph(sentenceCount?: number): string {
    return faker.lorem.paragraph(sentenceCount);
  }

  /**
   * Generates a random first name.
   */
  firstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generates a random last name.
   */
  lastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generates a random full name.
   */
  fullName(): string {
    return faker.person.fullName();
  }

  /**
   * Generates a random email address.
   */
  email(): string {
    return faker.internet.email();
  }

  /**
   * Generates a random UUID.
   */
  uuid(): string {
    return faker.string.uuid();
  }

  /**
   * Generates a random boolean.
   */
  boolean(): boolean {
    return faker.datatype.boolean();
  }

  /**
   * Generates a random date in the past.
   */
  pastDate(years: number = 1): Date {
    return faker.date.past({ years });
  }

  /**
   * Generates a random date in the future.
   */
  futureDate(years: number = 1): Date {
    return faker.date.future({ years });
  }

  /**
   * Helper to append a random number to a base prefix to ensure uniqueness.
   */
  uniqueName(prefix: string): string {
    return `${prefix} ${this.integer(5)}`;
  }
}
