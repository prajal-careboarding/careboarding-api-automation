export interface SaveDocumentRequest {
  templateId?: string;
  fileKey?: string;
  mimeType?: string;
  size?: number;
  issueDate?: string;
  expiryDate?: string;
  documentName?: string;
}

export interface SaveDocumentMissingRequiredFields400Request {
  templateId?: string;
}

export interface SaveDocumentEmptyDocumentsArray400Request {
  documents?: any[];
}

export interface SaveDocumentEXPIRINGTemplateMissingExpiryDate422Request {
  documents?: any[];
}

export interface SaveDocumentMimeTypeNotAllowed422Request {
  documents?: any[];
}

export interface SaveDocumentSizeExceedsMaxSizeMb422Request {
  documents?: any[];
}
