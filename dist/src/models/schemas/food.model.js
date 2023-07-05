"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.className = void 0;
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    name: String,
    imageUrl: String,
});
const className = (0, mongoose_1.model)("class", classSchema);
exports.className = className;
//# sourceMappingURL=food.model.js.map