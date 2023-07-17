"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkUrl = function (req, res, next) {
    const regex = /^[a-z0-9]{24}$/;
    const check = regex.test(req.params.id);
    if (check) {
        next();
    }
    else {
        res.redirect("/404");
    }
};
exports.default = checkUrl;
//# sourceMappingURL=idregex.middleware.js.map