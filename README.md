# Careboarding API Automation

A comprehensive API test automation framework for the **Careboarding** platform, built with [Playwright](https://playwright.dev/) and TypeScript. The framework covers employee onboarding configuration, identity management, runtime APIs, and reference configuration endpoints.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
  - [All Tests](#all-tests)
  - [Targeted Test Suites](#targeted-test-suites)
- [Architecture](#architecture)
  - [API Client](#api-client)
  - [Helpers](#helpers)
  - [Utilities](#utilities)
  - [Enums](#enums)
  - [Models](#models)
  - [Schemas](#schemas)
  - [Test Data Providers](#test-data-providers)
- [CI/CD](#cicd)
- [Reports](#reports)
- [Path Aliases](#path-aliases)

---

## Overview

This project provides end-to-end API test automation for the Careboarding platform. Tests cover:

- **Employee Onboarding Configuration** — Templates, sections, fields, demographics, forms, positions, and template categories
- **Reference Configuration** — Reference templates, questions, position config, and reordering
- **Runtime APIs** — Dashboard, demographics submission, document handling, and task management
- **Identity v2** — Organizations, entities, branches, service lines, agreements, and setup wizard

Tests validate:
- Correct HTTP status codes
- Response body structure and field values
- JSON schema compliance
- Error responses and validation messages
- Business logic (ordering, visibility toggling, system resource protection)

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev/) | `^1.58.2` | Test runner & API request context |
| [TypeScript](https://www.typescriptlang.org/) | `^6.0.3` | Strongly typed test code |
| [Faker.js](https://fakerjs.dev/) | `^10.4.0` | Dynamic test data generation |
| [AJV](https://ajv.js.org/) | `^8.20.0` | JSON Schema validation |
| [ajv-formats](https://github.com/ajv-validator/ajv-formats) | `^3.0.1` | AJV format extensions |
| [dotenv](https://github.com/motdotla/dotenv) | `^17.4.2` | Environment variable management |
| [Prettier](https://prettier.io/) | `^3.8.3` | Code formatting |

---

## Project Structure

```
careboarding-api-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI pipeline
├── schemas/                        # JSON Schema definitions for response validation
│   ├── create-fields.schema.json
│   ├── create-section.schema.json
│   ├── error-response.schema.json
│   ├── list-demographics.schema.json
│   ├── success-response.schema.json
│   └── user.schema.json
├── scripts/
│   ├── generate.js                 # Code generation utility
│   └── generate-msmf.js            # MSMF-specific generation utility
├── tests/
│   ├── api/
│   │   └── endpoints/
│   │       └── api-endpoints.ts    # Centralised endpoint registry
│   ├── enums/                      # Shared TypeScript enums
│   │   ├── field.enums.ts
│   │   ├── onboarding-template.enums.ts
│   │   ├── policy-signer.enums.ts
│   │   ├── reference.enums.ts
│   │   ├── system-fields.enums.ts
│   │   ├── system-positions.enums.ts
│   │   ├── system-sections.enums.ts
│   │   ├── system-template-categories.enums.ts
│   │   ├── system-templates.enums.ts
│   │   └── task.enums.ts
│   ├── fixtures/
│   │   └── demographics.fixture.ts
│   ├── helpers/
│   │   ├── api-client.ts           # HTTP client wrapping Playwright's APIRequestContext
│   │   ├── assertion-helper.ts     # Reusable success/error response assertions
│   │   ├── data-helper.ts          # Test data utilities
│   │   ├── field-helper.ts         # Field-specific helpers
│   │   ├── login-helper.ts         # Authentication helper
│   │   ├── schema-validator.ts     # JSON Schema assertion helper
│   │   └── section-helper.ts       # Section-specific helpers
│   ├── models/
│   │   ├── request/                # TypeScript interfaces for request payloads
│   │   └── response/               # TypeScript interfaces for response bodies
│   ├── spec/                       # Test suites
│   │   ├── employee-onboarding-config/
│   │   │   ├── demographics/       # 17 spec files (CRUD, reorder, toggle, etc.)
│   │   │   ├── employee-forms/
│   │   │   ├── employee-position/
│   │   │   ├── employee-position-templates/
│   │   │   ├── employee-positions/
│   │   │   ├── template-categories/
│   │   │   └── templates/          # 6 spec files (create, list, get, update, delete)
│   │   ├── reference-config-9-5/   # 13 spec files (reference questions & templates)
│   │   ├── reference-runtime-10-9-token-auth/
│   │   └── runtime-apis/           # 8 spec files (dashboard, demographics, documents, tasks)
│   ├── test-data/
│   │   ├── providers/              # Dynamic test data factories (Faker.js)
│   │   └── static/                 # Static test data files
│   └── utils/
│       ├── logger.ts               # Structured timestamped logger
│       ├── random-generator.ts     # Random data generators
│       └── retry-util.ts           # Exponential backoff retry utility
├── .env.example                    # Sample environment variables
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript config with path aliases
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** `>=18.x` (LTS recommended)
- **npm** `>=9.x`

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd careboarding-api-automation

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps
```

### Environment Configuration

Copy `.env.example` to `.env` and fill in the values for your target environment:

```bash
cp .env.example .env
```

| Variable | Description | Required |
|---|---|---|
| `BASE_URL` | Base URL of the Careboarding API (e.g. `https://dev-api.yourapp.com`) | ✅ |
| `IDENTITY_API_BASE_URL` | Base URL of the Identity/Auth service | ✅ |
| `AUTH_USERNAME` | Login email for the test user | ✅ |
| `AUTH_PASSWORD` | Login password for the test user | ✅ |
| `API_KEY` | API key (if used instead of bearer auth) | Optional |

> **Note:** Never commit your `.env` file — it is already listed in `.gitignore`.

---

## Running Tests

### All Tests

```bash
npm test
# or equivalently
npm run test:all
```

### Targeted Test Suites

```bash
# Employee Onboarding Configuration (all sub-suites)
npm run test:employee-onboarding-config

# Demographics
npm run test:employee-onboarding-config:demographics

# Templates
npm run test:employee-onboarding-config:templates

# Template Categories
npm run test:employee-onboarding-config:template-categories

# Employee Forms
npm run test:employee-onboarding-config:employee-forms

# Employee Positions (list)
npm run test:employee-onboarding-config:employee-positions

# Employee Position (single)
npm run test:employee-onboarding-config:employee-position

# Employee Position Templates
npm run test:employee-onboarding-config:employee-position-templates

# Reference Configuration (v9.5)
npm run test:reference-config-9-5

# Reference Runtime (v10.9, token auth)
npm run test:reference-runtime-10-9-token-auth

# Runtime APIs
npm run test:runtime-apis

# Run only CREATE BASIC FIELDS tests
npm run test:check-all-field-types
```

> Run with `--debug` for interactive debugging:
> ```bash
> npx playwright test --debug
> ```

---

## Architecture

### API Client

[`tests/helpers/api-client.ts`](tests/helpers/api-client.ts)

A lightweight HTTP client that wraps Playwright's `APIRequestContext`. Key features:

- Automatically attaches `Authorization: Bearer <token>` headers
- Globally caches authentication tokens — no repeated logins per test file
- Supports lazy login via `IDENTITY_API_BASE_URL` + credentials from `.env`
- Exposes typed `get`, `post`, `put`, `patch`, `delete` methods

```ts
const api = new ApiClient(request);
const res = await api.post('/employees', { firstName: 'John' });
```

### Helpers

| File | Purpose |
|---|---|
| `api-client.ts` | Core HTTP client with automatic auth token injection |
| `assertion-helper.ts` | `assertGeneralSuccessResponse` / `assertGeneralErrorResponse` — reusable structural + value assertions |
| `login-helper.ts` | Performs login, caches and returns bearer token globally |
| `schema-validator.ts` | Loads JSON schemas from `schemas/` and asserts required/no-extra fields |
| `section-helper.ts` | Creates and manages onboarding template sections within tests |
| `field-helper.ts` | Creates and manages onboarding section fields within tests |
| `data-helper.ts` | Miscellaneous test data construction utilities |

### Utilities

| File | Purpose |
|---|---|
| `logger.ts` | Singleton structured logger with timestamps (`info`, `warn`, `error`, `logRequest`, `logResponse`) |
| `retry-util.ts` | `retry()` — exponential-backoff retry for flaky network conditions; configurable `maxRetries`, `delayMs`, `backoffMultiplier`, and `retryableStatuses` |
| `random-generator.ts` | Random string/number/UUID generators powered by Faker.js |

### Enums

Shared TypeScript enums in [`tests/enums/`](tests/enums/) prevent magic strings across test files:

| File | Description |
|---|---|
| `field.enums.ts` | Field input types (text, number, date, dropdown, etc.) |
| `onboarding-template.enums.ts` | Onboarding template types |
| `system-fields.enums.ts` | Identifiers for system-reserved fields |
| `system-sections.enums.ts` | Identifiers for system-reserved sections |
| `system-templates.enums.ts` | Identifiers for system-reserved templates |
| `system-template-categories.enums.ts` | System template category identifiers |
| `system-positions.enums.ts` | System position identifiers |
| `reference.enums.ts` | Reference configuration enums |
| `policy-signer.enums.ts` | Policy signer type enums |
| `task.enums.ts` | Onboarding task status/type enums |

### Models

TypeScript interfaces for strongly typed request/response objects in [`tests/models/`](tests/models/):

- `models/request/` — Request body interfaces, organized by domain (onboarding config, identity, runtime, reference)
- `models/response/general-success-response.ts` — Standard `{ success: true, message, data }` wrapper
- `models/response/general-error-response.ts` — Standard `{ success: false, statusCode, error, message, validationErrors }` wrapper

### Schemas

JSON Schema files in [`schemas/`](schemas/) are used by `SchemaValidator` to assert API response shapes at runtime:

| Schema | Description |
|---|---|
| `create-fields.schema.json` | Field creation response shape |
| `create-section.schema.json` | Section creation response shape |
| `error-response.schema.json` | Standard error response envelope |
| `success-response.schema.json` | Standard success response envelope |
| `list-demographics.schema.json` | Demographics listing response |
| `user.schema.json` | User object shape |

### Test Data Providers

[`tests/test-data/providers/`](tests/test-data/providers/) — Factory functions that generate unique test payloads using Faker.js on every run, reducing data collision issues in parallel test execution.

[`tests/test-data/static/`](tests/test-data/static/) — Hardcoded payloads for deterministic test scenarios where exact values matter.

---

## CI/CD

The GitHub Actions workflow at [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) automatically:

1. Triggers on every **push** or **pull request** to `main` / `master`
2. Sets up Node.js (LTS)
3. Installs npm dependencies via `npm ci`
4. Installs Playwright browsers with system dependencies
5. Runs all Playwright tests
6. Uploads the HTML test report as a build artifact (retained for **30 days**)

```yaml
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

On CI, tests automatically:
- Enable 2 retries on failure (`retries: 2`)
- Forbid `test.only` in committed code (`forbidOnly: true`)

---

## Reports

After a test run, Playwright generates an HTML report in `playwright-report/`:

```bash
# Open the HTML report in your default browser
npx playwright show-report
```

Test result traces (captured on first retry for failed tests) are saved under `test-results/`.

---

## Path Aliases

The `tsconfig.json` defines path aliases for clean, IDE-friendly imports:

| Alias | Resolves to |
|---|---|
| `@api/*` | `tests/api/*` |
| `@models/*` | `tests/models/*` |
| `@helpers/*` | `tests/helpers/*` |
| `@fixtures/*` | `tests/fixtures/*` |
| `@utils/*` | `tests/utils/*` |

```ts
// Example usage in test files
import { ApiClient } from '@helpers/api-client';
import { ENDPOINTS } from '@api/endpoints/api-endpoints';
import { logger } from '@utils/logger';
import { assertGeneralSuccessResponse } from '@helpers/assertion-helper';
```
