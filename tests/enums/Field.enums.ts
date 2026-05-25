// tests/enums/Field.enums.ts

export enum FieldType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  FILE = 'FILE',
  SIGNATURE = 'SIGNATURE',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  HEADING = 'HEADING',
}

export enum DataTarget {
  CORE_COLUMN = 'CORE_COLUMN',
  EAV = 'EAV',
}

export enum FillerRole {
  EMPLOYEE = 'EMPLOYEE',
  EMPLOYER = 'EMPLOYER',
  ANY = 'ANY',
}

export enum RuleAction {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  SHOW = 'SHOW',
  HIDE = 'HIDE',
  SET_REQUIRED = 'SET_REQUIRED',
}

export enum VisibilityOperator {
  EQ = 'eq',
  NEQ = 'neq',
  IN = 'in',
  NOT_IN = 'not_in',
}
