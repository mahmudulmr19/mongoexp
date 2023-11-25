import express from "express";
import { userController } from "./user.controller";

// user route declare
const userRoute = express.Router();

// endpoints
userRoute.post("/", userController.createUser);

export default userRoute;
