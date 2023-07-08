"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const blockUserLogged_1 = __importDefault(require("../middlewares/blockUserLogged"));
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
userRouter.get('/user/editpassword', checkLogin_middleware_1.default, user_controller_1.default.showEditPassword);
userRouter.post('/user/editpassword', checkLogin_middleware_1.default, user_controller_1.default.updateUserPassword);
userRouter.get("/user", checkLogin_middleware_1.default, user_controller_1.default.showUserPage);
userRouter.get("/cart", checkLogin_middleware_1.default, user_controller_1.default.showCart);
userRouter.get("/login", blockUserLogged_1.default, user_controller_1.default.showLoginForm);
userRouter.post('/login', blockUserLogged_1.default, (req, res, next) => {
    user_middleware_1.default.authenticate('local', (err, user, info) => {
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
});
userRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map