/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import { sendResponse } from "./response";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendResponse({
    res,
    response: {
      success: false,
      message: err.message || "Something went wrong!",
      error: {
        code: 500,
        description: err.stack || "unknown error",
      },
    },
  });
};

export default globalErrorHandler;
