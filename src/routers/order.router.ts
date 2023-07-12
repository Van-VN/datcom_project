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
orderRouter.get('/cartcount', blockSwitchFromCusMiddleware, OrderController.getCartCount);
orderRouter.post('/order/delete/:id', checkUrl , blockSwitchFromCusMiddleware, OrderController.deleteOrder);
orderRouter.post('/order/update-count/:id', checkUrl , blockSwitchFromCusMiddleware, OrderController.UpdateCount);


orderRouter.post(
    "/cart", blockSwitchFromCusMiddleware, OrderController.checkOut
  );

export default orderRouter;
