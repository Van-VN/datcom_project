"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: String,
    type: String,
    des: String,
    imageUrl: String,
    status: { type: Boolean, default: true },
    comment: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
        },
    ],
});
const Food = (0, mongoose_1.model)("food", foodSchema);
exports.default = Food;
//# sourceMappingURL=food.model.js.map