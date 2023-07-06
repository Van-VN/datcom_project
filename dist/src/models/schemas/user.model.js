"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    role: String,
    password: String,
    className: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ClassName' }
});
const User = (0, mongoose_1.model)("user", userSchema);
exports.User = User;
//# sourceMappingURL=user.model.js.map