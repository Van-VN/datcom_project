import { Router } from "express";
const orderRouter = Router();
import OrderController from "../controllers/order.controller";

orderRouter.post("/order", OrderController.addToCart);

// orderRouter.post("/login", OrderController.getUserInfo);

export default orderRouter;
