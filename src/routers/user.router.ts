import { Router } from "express";
const userRouter = Router();
import UserController from "../controllers/user.controller";

userRouter.get("/login", UserController.showLoginForm);
userRouter.post("/login", UserController.getUserInfo);
userRouter.get('/user', UserController.showUserPage);
userRouter.get('/cart', UserController.showCart)

export default userRouter;
