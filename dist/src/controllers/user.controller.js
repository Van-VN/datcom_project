"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
class UserController {
    static async showLoginForm(req, res) {
        res.render("login", { data: null });
    }
    static getUserInfo(req, res) {
        res.redirect("/");
    }
    static showUserPage(req, res) {
        try {
            res.render("user");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static showCart(req, res) {
        try {
            res.render("cart");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static checkLogged(req, res) {
        try {
            if (req.user) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static showEditPassword(req, res) {
        res.render("usereditpassword", { data: null });
    }
    static async updateUserPassword(req, res) {
        try {
            const user = await user_model_1.default.findOne({ _id: req.user.id }).populate("password");
            if (user.password === req.body.oldpassword) {
                if (req.body.newpassword === req.body.newpasswordconfirm) {
                    user.password = req.body.newpassword;
                    await user.save();
                    res.redirect("/logout");
                }
                else {
                    const data = "Mật khẩu mới nhập không trùng nhau!";
                    res.render("usereditpassword", { data: data });
                }
            }
            else {
                const data = "Mật khẩu cũ không chính xác";
                res.render("usereditpassword", { data: data });
            }
        }
        catch (err) {
            console.log(err);
            res.redirect("/404");
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map