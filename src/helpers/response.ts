import { Response } from "express";

// Define response types
interface BaseResponse {
  success: boolean;
  message?: string;
}

interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data?: T;
}

interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: number;
    description: string;
  };
}

// Combined response type using discriminated unions
type DynamicResponse<T> = SuccessResponse<T> | ErrorResponse;

// Props interface for the function
interface ResponseHandlerProps<T> {
  res: Response;
  response: DynamicResponse<T>;
}

// Function to handle dynamic responses
export function sendResponse<T>({
  res,
  response,
}: ResponseHandlerProps<T>): void {
  const { success, message } = response;

  if (success) {
    const successResponse = response as SuccessResponse<T>;
    const { data } = successResponse;
    res.status(200).json({ success, message, data });
  } else {
    const errorResponse = response as ErrorResponse;
    const { error } = errorResponse;
    res.status(error.code).json({ success, message, error });
  }
}
