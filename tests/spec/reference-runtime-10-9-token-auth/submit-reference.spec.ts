import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { ENDPOINTS } from '../../api/endpoints/api-endpoints';
import { SubmitReferencePayloadBuilder } from '../../models/request/Employee-onboarding-config/reference-runtime-10-9-token-auth/submit-reference';

// ─────────────────────────────────────────────────────────────────────────────
// Submit Reference Answers — POST /onboarding/reference/:token/answers
//
// The Payload Builder is used in every test below.
// See submit-reference.ts for full builder documentation & examples.
//
// Flow overview:
//   1. Instantiate the builder   → new SubmitReferencePayloadBuilder()
//   2. Set answer values         → .withDefaults() / .withYearsKnown(10) / …
//   3. Optionally break the payload for negative tests
//        • .withoutAnswer('years_known')   → removes a required field  (422)
//        • .withYearsKnown('five' as any)  → wrong type for NUMBER     (422)
//        • .withoutAnswersKey()            → strips outer "answers"    (400)
//   4. Build the final object    → .build()
//   5. Pass it to api.post()
// ─────────────────────────────────────────────────────────────────────────────

const VALID_TOKEN = process.env.REFERENCE_TOKEN ?? '<REPLACE_WITH_VALID_TOKEN>';
const COMPLETED_TOKEN = process.env.COMPLETED_REFERENCE_TOKEN ?? '<REPLACE_WITH_COMPLETED_TOKEN>';

test.describe('SUBMIT REFERENCE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  // ── 200  Happy path ────────────────────────────────────────────────────────
  test('Submit Reference Answers (200)', async () => {
    const payload = new SubmitReferencePayloadBuilder()
      .withDefaults()       // years_known: 5, would_rehire: "yes", communication_skill: "Excellent"
      .build();             // → { answers: { ... } }

    const response = await api.post(
      ENDPOINTS.REFERENCE_RUNTIME.SUBMIT_ANSWERS(VALID_TOKEN),
      payload,
    );
    expect(response.status()).toBe(200);
  });

  // ── 404  Already completed reference ───────────────────────────────────────
  test('Submit Reference Answers — Already completed (404)', async () => {
    const payload = new SubmitReferencePayloadBuilder()
      .withDefaults()
      .build();

    const response = await api.post(
      ENDPOINTS.REFERENCE_RUNTIME.SUBMIT_ANSWERS(COMPLETED_TOKEN),
      payload,
    );
    // Submitting to an already-completed reference returns 404
    expect(response.status()).toBe(404);
  });

  // ── 422  Missing a required question ───────────────────────────────────────
  test('Submit Reference Answers — Missing required question (422)', async () => {
    const payload = new SubmitReferencePayloadBuilder()
      .withWouldRehire('yes')
      .withCommunicationSkill('Excellent')
      // NOTE: years_known is intentionally NOT set → required field missing
      .build();

    const response = await api.post(
      ENDPOINTS.REFERENCE_RUNTIME.SUBMIT_ANSWERS(VALID_TOKEN),
      payload,
    );
    expect(response.status()).toBe(422);
  });

  // ── 422  Wrong type for a NUMBER question ──────────────────────────────────
  test('Submit Reference Answers — Wrong type for NUMBER question (422)', async () => {
    const payload = new SubmitReferencePayloadBuilder()
      .withDefaults()
      .withYearsKnown('five' as any)  // string instead of number
      .build();

    const response = await api.post(
      ENDPOINTS.REFERENCE_RUNTIME.SUBMIT_ANSWERS(VALID_TOKEN),
      payload,
    );
    expect(response.status()).toBe(422);
  });

  // ── 400  Missing the outer "answers" key ───────────────────────────────────
  test('Submit Reference Answers — Missing answers key (400)', async () => {
    const payload = new SubmitReferencePayloadBuilder()
      .withDefaults()
      .withoutAnswersKey()   // strips the "answers" wrapper
      .build();              // → { years_known: 5, would_rehire: "yes", ... }  (flat)

    const response = await api.post(
      ENDPOINTS.REFERENCE_RUNTIME.SUBMIT_ANSWERS(VALID_TOKEN),
      payload,
    );
    expect(response.status()).toBe(400);
  });
});
