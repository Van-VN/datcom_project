import { Router } from "express";
import multer from "multer";
import checkUrl from "../middlewares/idregex.middleware";
import { initializeApp } from "firebase/app";
import config from "../../firebase.config";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

initializeApp(config.firebaseConfig);
const storage = getStorage();
const upload = multer({
  storage: multer.memoryStorage(),
});

const adminRouter = Router();
import AdminController from "../controllers/admin.controller";
import { Admin } from "mongodb";
import blockSwitchFromCusMiddleware from "../middlewares/checkLogin.middleware";
import userRouter from "./user.router";
adminRouter.use(blockSwitchFromCusMiddleware);
adminRouter.get("/admin", AdminController.showFoodList);
adminRouter.get("/admin/user/create", AdminController.showCreateUser);
adminRouter.post("/admin/user/create", AdminController.createUser);
adminRouter.get("/admin/create", AdminController.getCreatePage);
adminRouter.post(
  "/admin/create",
  upload.single("picture"),
  AdminController.createFood
);
adminRouter.get("/admin/food", AdminController.showFoodList);
adminRouter.get(
  "/admin/food/edit/:id",
  checkUrl,
  AdminController.showUpdateFood
);
adminRouter.post(
  "/admin/food/edit/:id",
  checkUrl,
  upload.single("picture"),
  AdminController.updateFood
);
adminRouter.get("/admin/food/delete/:id", checkUrl, AdminController.deleteFood);
adminRouter.post(
  "/admin/updatestatus/:id",
  checkUrl,
  AdminController.updateStatus
);
adminRouter.get("/admin/user", AdminController.showUserList);
adminRouter.get("/admin/user/edit/:id", checkUrl, AdminController.showUserEdit);
adminRouter.post("/admin/user/edit/:id", checkUrl, AdminController.updateUser);
adminRouter.get("/admin/user/delete/:id", checkUrl, AdminController.deleteUser);

export default adminRouter;
