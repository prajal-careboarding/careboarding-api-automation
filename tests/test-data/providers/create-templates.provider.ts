import { RandomGenerator } from '@utils/random-generator';
import { CreateTemplateRequest } from '../../models/request/employee-onboarding-config/templates/create-template';

const random = new RandomGenerator();
const randomNumber = random.integer(5);
const expectedStatus = 201;

export interface TemplateTestData {
  name: string;
  payload: Partial<CreateTemplateRequest>;
  expectedStatus: number;
}

export const createTemplateTestData: TemplateTestData[] = [
  {
    name: 'GOVERNMENT_FORM',
    expectedStatus: 201,
    payload: {
      name: `Government Form ${randomNumber}`,
      type: 'GOVERNMENT_FORM',
    },
  },
  {
    name: 'DOCUMENT_REQUIREMENT',
    expectedStatus: 201,
    payload: {
      name: `Document Requirement ${randomNumber}`,
      type: 'DOCUMENT_REQUIREMENT',
    },
  },
  {
    name: 'AGENCY_FORM',
    expectedStatus: 201,
    payload: {
      name: `Agency Form ${randomNumber}`,
      type: 'AGENCY_FORM',
    },
  },
  {
    name: 'DEMOGRAPHICS',
    expectedStatus: 400,
    payload: {
      name: `Demographics ${randomNumber}`,
      type: 'DEMOGRAPHICS',
    },
  },
  {
    name: 'REFERENCE',
    expectedStatus: 400,
    payload: {
      name: `Reference ${randomNumber}`,
      type: 'REFERENCE',
    },
  },
  {
    name: 'ONBOARDING_QUESTION',
    expectedStatus: 400,
    payload: {
      name: `Onboarding Question ${randomNumber}`,
      type: 'ONBOARDING_QUESTION',
    },
  },
];
