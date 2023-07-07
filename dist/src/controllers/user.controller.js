"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    static async showLoginForm(req, res) {
        res.render("login");
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
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map