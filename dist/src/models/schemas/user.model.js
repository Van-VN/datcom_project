"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    fullName: String,
    role: { type: String, default: "User" },
    password: String,
    className: String,
});
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map