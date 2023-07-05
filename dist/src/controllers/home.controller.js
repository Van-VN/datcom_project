"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    static async getHomePage(req, res) {
        try {
            return res.render('home');
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map