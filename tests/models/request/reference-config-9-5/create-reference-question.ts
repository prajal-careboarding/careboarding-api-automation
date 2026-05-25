export interface CreateReferenceQuestion201Request {
  templateId?: string;
  key?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
}

export interface CreateReferenceQuestionInvalidKeyFormat400Request {
  templateId?: string;
  key?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
}

export interface CreateReferenceQuestionDuplicateKey409Request {
  templateId?: string;
  key?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
}

export interface CreateReferenceQuestionSELECTWithoutOptions400Request {
  templateId?: string;
  key?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
}

export interface CreateReferenceQuestionRejectedTypeFILE400Request {
  templateId?: string;
  key?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
}
