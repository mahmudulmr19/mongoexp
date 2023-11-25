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

const getSingleUserFromDB = async (userId: string) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
