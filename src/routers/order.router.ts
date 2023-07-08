import { Router } from "express";
const orderRouter = Router();
import OrderController from "../controllers/order.controller";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";

// orderRouter.use(blockSwitchFromCusMiddleware);
// orderRouter.post("/order", OrderController.addToCart);
// orderRouter.post("/order", (req: any, res: any) => {
//   console.log(123);
// });
orderRouter.post(
  "/order",
  blockSwitchFromCusMiddleware,
  OrderController.addToCart
);

orderRouter.get(
  "/cart",
  blockSwitchFromCusMiddleware,
  OrderController.showCart
);

// orderRouter.post("/login", OrderController.getUserInfo);

export default orderRouter;
