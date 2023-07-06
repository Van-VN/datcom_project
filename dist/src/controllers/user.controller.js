"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    static async showLoginForm(req, res) {
        res.render("login");
    }
    static getUserInfo(req, res) {
        console.log(req.body);
        res.redirect("/");
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map