// ─────────────────────────────────────────────────────────────────────────────
// Request interfaces for POST /onboarding/reference/:referenceToken/answers
// ─────────────────────────────────────────────────────────────────────────────

/** Shape of the answers map: each key is a question key, value is the answer. */
export interface ReferenceAnswers {
  [questionKey: string]: string | number | boolean;
}

/** Successful submit – all required fields present, correct types. */
export interface SubmitReferenceAnswers200Request {
  answers: ReferenceAnswers;
}

/** Re-submit to an already-completed reference – same valid body, server returns 404. */
export interface SubmitReferenceAnswersAlreadyCompleted404Request {
  answers: ReferenceAnswers;
}

/** Missing a required question key inside `answers` – server returns 422. */
export interface SubmitReferenceAnswersMissingRequiredQuestion422Request {
  answers: ReferenceAnswers;
}

/** Wrong type for a NUMBER question (e.g. string instead of number) – server returns 422. */
export interface SubmitReferenceAnswersWrongTypeForNUMBERQuestion422Request {
  answers: ReferenceAnswers;
}

/** Outer `answers` key is completely absent – server returns 400. */
export interface SubmitReferenceAnswersMissingAnswersKey400Request {
  [key: string]: unknown; // intentionally no `answers` property
}

// ─────────────────────────────────────────────────────────────────────────────
// Payload Builder  (chainable / fluent API)
// ─────────────────────────────────────────────────────────────────────────────
//
//  WHY a builder?
//  ──────────────
//  Each test scenario needs a slightly different payload:
//    • 200  → all three answers present, correct types
//    • 422  → one required answer removed, or wrong type
//    • 400  → the outer "answers" key stripped entirely
//
//  Instead of copy-pasting JSON in every test, the builder lets you:
//    1. Start from sensible defaults            → .withDefaults()
//    2. Override individual fields via chaining  → .withYearsKnown(10)
//    3. Create intentionally invalid payloads    → .withoutAnswersKey()
//    4. Produce the final object                 → .build()
//
//  USAGE EXAMPLES
//  ──────────────
//  ✅ Happy-path payload:
//      new SubmitReferencePayloadBuilder().withDefaults().build()
//      // → { answers: { years_known: 5, would_rehire: "yes", communication_skill: "Excellent" } }
//
//  ✅ Override one field:
//      new SubmitReferencePayloadBuilder()
//        .withDefaults()
//        .withYearsKnown(10)
//        .build()
//      // → { answers: { years_known: 10, would_rehire: "yes", communication_skill: "Excellent" } }
//
//  ❌ Missing required field (for 422 test):
//      new SubmitReferencePayloadBuilder()
//        .withWouldRehire("yes")
//        .withCommunicationSkill("Excellent")
//        .build()
//      // → { answers: { would_rehire: "yes", communication_skill: "Excellent" } }
//      //   (years_known is missing → 422)
//
//  ❌ Wrong type (for 422 test):
//      new SubmitReferencePayloadBuilder()
//        .withDefaults()
//        .withYearsKnown("five" as any)
//        .build()
//      // → { answers: { years_known: "five", ... } } → 422
//
//  ❌ Missing answers key (for 400 test):
//      new SubmitReferencePayloadBuilder()
//        .withDefaults()
//        .withoutAnswersKey()
//        .build()
//      // → { years_known: 5, would_rehire: "yes", communication_skill: "Excellent" }
//      //   (flat object, no "answers" wrapper → 400)
//
// ─────────────────────────────────────────────────────────────────────────────

export class SubmitReferencePayloadBuilder {
  private answersMap: ReferenceAnswers = {};
  private stripAnswersKey = false;

  // ── Presets ────────────────────────────────────────────────────────────────

  /** Populate all three default answers in one call. */
  withDefaults(): this {
    this.answersMap = {
      years_known: 5,
      would_rehire: 'yes',
      communication_skill: 'Excellent',
    };
    return this;
  }

  // ── Individual setters (chainable) ─────────────────────────────────────────

  withYearsKnown(value: number | string): this {
    this.answersMap['years_known'] = value;
    return this;
  }

  withWouldRehire(value: string): this {
    this.answersMap['would_rehire'] = value;
    return this;
  }

  withCommunicationSkill(value: string): this {
    this.answersMap['communication_skill'] = value;
    return this;
  }

  /** Add an arbitrary answer key (useful for custom / dynamic questions). */
  withAnswer(key: string, value: string | number | boolean): this {
    this.answersMap[key] = value;
    return this;
  }

  /** Remove a specific key from the answers map (to simulate missing fields). */
  withoutAnswer(key: string): this {
    delete this.answersMap[key];
    return this;
  }

  // ── Structural modifiers ──────────────────────────────────────────────────

  /**
   * When called, `build()` will return a FLAT object (no outer `answers` key).
   * This simulates the 400 Bad Request scenario.
   */
  withoutAnswersKey(): this {
    this.stripAnswersKey = true;
    return this;
  }

  // ── Build ─────────────────────────────────────────────────────────────────

  /**
   * Produce the final payload object.
   *
   * Normal:  `{ answers: { ... } }`
   * Flat:    `{ years_known: 5, ... }`  (when `withoutAnswersKey()` was called)
   */
  build(): Record<string, unknown> {
    if (this.stripAnswersKey) {
      // Return the raw answers without the wrapper – triggers 400
      return { ...this.answersMap };
    }
    return { answers: { ...this.answersMap } };
  }
}
