import { Router } from "express";
const router = Router();
import HomeController from "../controllers/home.controller";

router.get("/", HomeController.getHomePage);

export default router;
