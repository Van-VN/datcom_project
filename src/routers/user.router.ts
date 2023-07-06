import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/user.controller";

userRouter.get("/login", UserController.showLoginForm);
userRouter.post("/login", UserController.getUserInfo);

export default userRouter;
