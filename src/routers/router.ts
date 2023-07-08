import { Router } from "express";
const router = Router();
import HomeController from "../controllers/home.controller";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";

router.get("/", HomeController.getHomePage);
router.get('/detail/:id', HomeController.showFoodDetail);
router.post('/detail/:id', blockSwitchFromCusMiddleware, HomeController.foodComment);

export default router;
