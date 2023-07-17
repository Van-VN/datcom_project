"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const blockSwitchFromCusMiddleware = async (req, res, next) => {
    if (req.user) {
        let id = req.session.passport.user.id;
        let customer = await user_model_1.default.findOne({ _id: id });
        if (customer) {
            next();
        }
        else {
            res.redirect("/");
        }
    }
    else {
        res.redirect("/login");
    }
};
exports.default = blockSwitchFromCusMiddleware;
//# sourceMappingURL=checkLogin.middleware.js.map