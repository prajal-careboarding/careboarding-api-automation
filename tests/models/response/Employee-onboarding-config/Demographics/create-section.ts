import { FillerRole } from 'tests/enums/field.enums';

export interface CreateSectionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    templateId: string;
    organizationId: string;
    name: string;
    description: string | null;
    order: number;
    isSystem: boolean;
    isRepeatable: boolean;
    isVisible: boolean;
    requiredRole: FillerRole | string;
    isRehireOnly: boolean;
  };
}
