import { Router } from "express";
const userRouter = Router();
import passport from "../middlewares/user.middleware";
import UserController from "../controllers/user.controller";
import HomeController from "../controllers/home.controller";
import blockUserLogged from "../middlewares/blockUserLogged";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";

userRouter.get('/user/editpassword', blockSwitchFromCusMiddleware, UserController.showEditPassword)
userRouter.post('/user/editpassword', blockSwitchFromCusMiddleware, UserController.updateUserPassword)
userRouter.get(
  "/user",
  blockSwitchFromCusMiddleware,
  UserController.showUserPage
);
userRouter.get("/cart", blockSwitchFromCusMiddleware, UserController.showCart);
userRouter.get("/login", blockUserLogged, UserController.showLoginForm);
userRouter.post('/login', blockUserLogged, (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return res.render('404');
        }
        if (!user) {
            const data = "Tên đăng nhập hoặc mật khẩu không chính xác";
            res.render('login', { data: data });
            return;
        }
        req.login(user, (err) => {
            if (err) {
                return res.render('404');
            }
            return res.redirect('/');
        });
    })(req, res, next);
})
userRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
export default userRouter;
