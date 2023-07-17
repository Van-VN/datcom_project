"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderRouter = (0, express_1.Router)();
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const idregex_middleware_1 = __importDefault(require("../middlewares/idregex.middleware"));
orderRouter.post("/order", checkLogin_middleware_1.default, order_controller_1.default.addToCart);
orderRouter.get("/cart", checkLogin_middleware_1.default, order_controller_1.default.showCart);
orderRouter.get('/cartcount', checkLogin_middleware_1.default, order_controller_1.default.getCartCount);
orderRouter.post('/order/delete/:id', idregex_middleware_1.default, checkLogin_middleware_1.default, order_controller_1.default.deleteOrder);
orderRouter.post('/order/update-count/:id', idregex_middleware_1.default, checkLogin_middleware_1.default, order_controller_1.default.UpdateCount);
orderRouter.post("/cart", checkLogin_middleware_1.default, order_controller_1.default.checkOut);
exports.default = orderRouter;
//# sourceMappingURL=order.router.js.map