export interface GeneralSuccessResponse<T = any> {
  /** Indicates the success status of the request. */
  success: boolean;
  /** A human-readable message describing the result. */
  message: string;
  /** The actual payload returned by the API. */
  data: T;
}
