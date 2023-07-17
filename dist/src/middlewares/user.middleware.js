"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
passport_1.default.use(new passport_local_1.Strategy(async function verify(username, password, cb) {
    const user = await user_model_1.default.findOne({ name: username });
    if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}));
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user._id, name: user.name, role: user.role });
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
exports.default = passport_1.default;
//# sourceMappingURL=user.middleware.js.map