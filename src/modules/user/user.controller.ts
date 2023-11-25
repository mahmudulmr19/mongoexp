import { NextFunction, Request, Response } from "express";
import { sendResponse } from "@/helpers/response";
import { orderSchema, userZodSchema } from "./user.validator";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const parsedUser = userZodSchema.safeParse(req.body);
    if (!parsedUser.success) {
      return sendResponse({
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

    const result = await userService.createUserIntoDB(parsedUser.data);
    const finalResult = { ...result.toJSON() };
    delete finalResult.orders;
    delete finalResult.id;

    sendResponse({
      res,
      response: {
        success: true,
        message: "User created successfully!",
        data: finalResult,
      },
    });
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
      return sendResponse({
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

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const result = await userService.deleteUserFromDB(userId);
    if (result.deletedCount !== 1) {
      return sendResponse({
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
        message: "User deleted successfully!",
        data: null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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

    const parsedUser = userZodSchema.safeParse(req.body);
    if (!parsedUser.success) {
      return sendResponse({
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
    await userService.updateUserFromDB(userId, parsedUser.data);
    const result = await userService.getSingleUserFromDB(userId);
    sendResponse({
      res,
      response: {
        success: true,
        message: "User updated successfully!",
        data: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addProductToOrder = async (
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

    const parsedOrder = orderSchema.safeParse(req.body);
    if (!parsedOrder.success) {
      return sendResponse({
        res,
        response: {
          success: false,
          message: "Failed to parse order data",
          error: {
            code: 400,
            description: "Failed to parse order data",
          },
          errors: parsedOrder.error.errors,
        },
      });
    }

    await userService.addProductToUserOrder(userId, parsedOrder.data);
    sendResponse({
      res,
      response: {
        success: true,
        message: "Order created successfully!",
        data: null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUserAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getAllUserOrdersFromDB(userId);
    if (!user) {
      return sendResponse({
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
    const orders = user.orders;
    sendResponse({
      res,
      response: {
        success: true,
        message: "Order fetched successfully!",
        data: {
          orders,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTotalPriceOfOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getAllUserOrdersFromDB(userId);
    if (!user) {
      return sendResponse({
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

    const totalPrice = await userService.getTotalPriceOfOrdersFromDB(userId);

    sendResponse({
      res,
      response: {
        success: true,
        message: "Total price calculated successfully!",
        data: {
          totalPrice,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  addProductToOrder,
  getSingleUserAllOrders,
  getTotalPriceOfOrders,
};
