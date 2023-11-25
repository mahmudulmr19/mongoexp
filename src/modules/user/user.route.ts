import express from "express";
import { userController } from "./user.controller";

// user route declare
const userRoute = express.Router();

// endpoints
userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:userId", userController.getSingleUser);

export default userRoute;
