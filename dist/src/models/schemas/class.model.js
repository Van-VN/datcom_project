"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassName = void 0;
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    name: String
});
const ClassName = (0, mongoose_1.model)("className", classSchema);
exports.ClassName = ClassName;
//# sourceMappingURL=class.model.js.map