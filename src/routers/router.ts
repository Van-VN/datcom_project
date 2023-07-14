import { Router } from "express";
const router = Router();
import HomeController from "../controllers/home.controller";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";
import checkUrl from "../middlewares/idregex.middleware";

router.get("/", HomeController.getHomePage);
router.get("/detail/:id", checkUrl, HomeController.showFoodDetail);
router.post(
  "/detail/:id",
  checkUrl,
  blockSwitchFromCusMiddleware,
  HomeController.foodComment
);
router.get(
  "/comment/delete/:id",
  checkUrl,
  blockSwitchFromCusMiddleware,
  HomeController.deleteComment
);
router.get("/search", HomeController.searchFood);
router.get("/meatsort", HomeController.meatSort);
router.get("/vegsort", HomeController.vegSort);
router.get("/allsort", HomeController.allSort);

export default router;
