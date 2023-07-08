import { Router } from "express";
const orderRouter = Router();
import OrderController from "../controllers/order.controller";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";
import checkUrl from "../middlewares/idregex.middleware";

orderRouter.post(
  "/order", blockSwitchFromCusMiddleware, OrderController.addToCart
);

orderRouter.get(
  "/cart", blockSwitchFromCusMiddleware, OrderController.showCart
);

orderRouter.get('/order/delete/:id', checkUrl , blockSwitchFromCusMiddleware, OrderController.deleteOrder)

export default orderRouter;
