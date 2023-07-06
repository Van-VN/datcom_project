import { Router } from "express";
import multer from "multer";
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

adminRouter.get("/admin", AdminController.showAdminPage);
adminRouter.get("/admin/user/create", AdminController.showCreateUser);
adminRouter.post("/admin/user/create", AdminController.createUser);
adminRouter.get("/admin/create", AdminController.getCreatePage);
adminRouter.post(
  "/admin/create",
  upload.single("picture"),
  AdminController.createFood
);
adminRouter.get("/admin/food", AdminController.showFoodList);
adminRouter.get("/admin/food/edit/:id", AdminController.showUpdateFood);
adminRouter.post(
  "/admin/food/edit/:id",
  upload.single("picture"),
  AdminController.updateFood
);
adminRouter.get("/admin/food/delete/:id", AdminController.deleteFood);
adminRouter.post("/admin/updatestatus/:id", AdminController.updateStatus);
adminRouter.get("/admin/user", AdminController.showUserList);
adminRouter.get("/admin/user/edit/:id", AdminController.showUserEdit);

export default adminRouter;
