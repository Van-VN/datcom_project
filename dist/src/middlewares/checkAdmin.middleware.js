"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin = function (req, res, next) {
    if (req.user.role === "Admin") {
        next();
    }
    else {
        res.render("404");
    }
};
exports.default = checkAdmin;
//# sourceMappingURL=checkAdmin.middleware.js.map