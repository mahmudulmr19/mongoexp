import express from "express";
import { userController } from "./user.controller";

// user route declare
const userRoute = express.Router();

// endpoints
userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:userId", userController.getSingleUser);
userRoute.put("/:userId", userController.updateUser);
userRoute.delete("/:userId", userController.deleteUser);

export default userRoute;
