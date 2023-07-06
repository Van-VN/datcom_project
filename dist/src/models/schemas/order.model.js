"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    foods: []
});
const Order = (0, mongoose_1.model)("class", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map