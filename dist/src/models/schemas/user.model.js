"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    role: String,
    password: String,
});
const user = (0, mongoose_1.model)("user", userSchema);
exports.user = user;
//# sourceMappingURL=user.model.js.map