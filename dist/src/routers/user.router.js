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
userRouter.get("/user", user_controller_1.default.showUserPage);
userRouter.get("/cart", user_controller_1.default.showCart);
userRouter.get("/login", blockUserLogged_1.default, user_controller_1.default.showLoginForm);
userRouter.post("/login", blockUserLogged_1.default, user_middleware_1.default.authenticate("local", { session: true, failureRedirect: "/login" }), (req, res) => {
    res.redirect("/");
});
userRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map