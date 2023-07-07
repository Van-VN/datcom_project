import { Router } from "express";
const userRouter = Router();
import passport from "../middlewares/user.middleware";
import UserController from "../controllers/user.controller";
import HomeController from "../controllers/home.controller";
import blockUserLogged from "../middlewares/blockUserLogged";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";

userRouter.get(
  "/user",
  blockSwitchFromCusMiddleware,
  UserController.showUserPage
);
userRouter.get("/cart", blockSwitchFromCusMiddleware, UserController.showCart);
userRouter.get("/login", blockUserLogged, UserController.showLoginForm);
userRouter.post(
  "/login",
  blockUserLogged,
  passport.authenticate("local", { session: true, failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);
userRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
export default userRouter;
