"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockUserLogged = async (req, res, next) => {
    let user = req.user;
    if (!user) {
        next();
    }
    else {
        res.redirect('/');
    }
};
exports.default = blockUserLogged;
//# sourceMappingURL=blockUserLogged.js.map