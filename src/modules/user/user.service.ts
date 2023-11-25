import { UserModel } from "./user.model";
import { User } from "./user.validator";

const createUserIntoDB = async (usersData: User) => {
  const existUser = await UserModel.findOne({ userId: usersData.userId });
  if (existUser) {
    throw new Error("User already exist");
  }

  const result = await UserModel.create(usersData);
  return result;
};

const getAllUserFromDB = async () => {
  const users = await UserModel.find();
  return users;
};

export const userService = { createUserIntoDB, getAllUserFromDB };
