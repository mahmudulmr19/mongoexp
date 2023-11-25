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
  const users = await UserModel.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    }
  );
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

const updateUserFromDB = async (userId: string, userData: User) => {
  const result = await UserModel.updateOne({ userId }, { $set: userData });
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
