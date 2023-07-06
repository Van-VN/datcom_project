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
const router = Router();
import HomeController from "../controllers/home.controller";

router.get("/", HomeController.getHomePage);
router.get("/create", HomeController.getCreatePage);
router.post("/create", upload.single("picture"), HomeController.createFood);
// router.get('*', function (req, res) {
//     res.render('notfound')
// });
export default router;
