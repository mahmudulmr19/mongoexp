import { NextFunction, Request, Response } from "express";
import { sendResponse } from "@/helpers/response";
import { userZodSchema } from "./user.validator";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const parsedUser = userZodSchema.safeParse(req.body);
    if (parsedUser.success) {
      const result = await userService.createUserIntoDB(parsedUser.data);
      sendResponse({
        res,
        response: {
          success: true,
          message: "User created successfully!",
          data: result,
        },
      });
    } else {
      sendResponse({
        res,
        response: {
          success: false,
          message: "Failed to parse user data",
          error: {
            code: 400,
            description: "Failed to parse user data",
          },
          errors: parsedUser.error.errors,
        },
      });
    }
  } catch (error: any) {
    sendResponse({
      res,
      response: {
        success: false,
        message: "Something went wrong!",
        error: {
          code: 400,
          description: error.message,
        },
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUserFromDB();

    sendResponse({
      res,
      response: {
        success: true,
        message: "Users fetched successfully!",
        data: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getSingleUserFromDB(userId);
    if (!user) {
      sendResponse({
        res,
        response: {
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found",
          },
        },
      });
    }

    sendResponse({
      res,
      response: {
        success: true,
        message: "User fetched successfully!",
        data: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
