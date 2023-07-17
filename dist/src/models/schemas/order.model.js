"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    dateOrder: { type: Date, default: Date.now },
    foods: [
        {
            food: { type: mongoose_1.Schema.Types.ObjectId, ref: "food" },
            quantity: Number,
            imgUrl: String,
        }
    ],
    userID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String, default: "waiting" },
    createAt: { type: Date, default: Date.now },
});
const Order = (0, mongoose_1.model)("order", orderSchema);
exports.Order = Order;
//# sourceMappingURL=order.model.js.map