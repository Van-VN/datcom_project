"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: String,
    type: String,
    des: String,
    imageUrl: String,
    status: { type: Boolean, default: true },
});
const Food = (0, mongoose_1.model)("class", foodSchema);
exports.default = Food;
//# sourceMappingURL=food.model.js.map