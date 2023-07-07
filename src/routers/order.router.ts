import { Router } from "express";
const orderRouter = Router();
import OrderController from "../controllers/order.controller";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";

orderRouter.use(blockSwitchFromCusMiddleware);
orderRouter.post("/order", OrderController.addToCart);

// orderRouter.post("/login", OrderController.getUserInfo);

export default orderRouter;
