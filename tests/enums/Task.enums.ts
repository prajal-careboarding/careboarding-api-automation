// tests/enums/Task.enums.ts

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export enum TaskSubjectType {
  EMPLOYEE = 'EMPLOYEE',
  PATIENT = 'PATIENT',
}

export enum TaskCategory {
  FORM = 'FORM',
  POLICY = 'POLICY',
  DOCUMENT = 'DOCUMENT',
  CLINICAL = 'CLINICAL',
  GENERAL = 'GENERAL',
}

export enum TaskAssigneeType {
  USER = 'USER',
  ROLE = 'ROLE',
  EMPLOYEE = 'EMPLOYEE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum TaskRecurrence {
  ONE_TIME = 'ONE_TIME',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUALLY = 'ANNUALLY',
}

export enum TaskNotificationChannel {
  IN_APP = 'IN_APP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

// ─── Response enums (read-only, returned on TaskListItem / TaskDetail) ─────

export enum TaskOrigin {
  MANUAL = 'MANUAL',
  DERIVED_DOCUMENT_EXPIRY = 'DERIVED_DOCUMENT_EXPIRY',
}

export enum TaskStoredStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// TaskDisplayStatus is derived server-side at read time — never sent in requests.
// Listed here so FE can type the response field.
export enum TaskDisplayStatus {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  OVERDUE = 'OVERDUE',
  COMPLETED = 'COMPLETED',
}

// ─── List endpoint — view filter (NOT a Prisma enum; query-param only) ─────

export enum TaskListView {
  ALL = 'all',
  UPCOMING = 'upcoming',
  OVERDUE = 'overdue',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
}
