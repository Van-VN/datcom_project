import Food from "../models/schemas/food.model";
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

class AdminController {
  static async showAdminPage(req: any, res: any) {
    // res.render("adminViews/admin");
    res.redirect("/admin/food");
  }

  static async showCreateUser(req: any, res: any) {
    res.render("adminViews/adminCreateUser");
  }

  static async getCreatePage(req: any, res: any) {
    try {
      res.render("adminViews/adminCreateFood");
    } catch (err) {
      console.log(err.message);
    }
  }

  static async createFood(req: any, res: any) {
    try {
      const storageRef = ref(storage, `files/${req.file.originalname}`);
      const metadata = { contentType: req.file.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      // LẤY ĐƯỢC ẢNH FIREBASE
      const food = new Food({
        name: req.body.name,
        type: req.body.type,
        des: req.body.des,
        imageUrl: downloadURL,
      });
      await food.save();
      res.redirect("/admin/food");
    } catch (err) {
      console.log(err.message);
    }
  }

  static async showFoodList(req: any, res: any) {
    const foods = await Food.find();
    res.render("adminViews/adminFoodList", { data: foods });
  }

  static async showUpdateFood(req: any, res: any) {
    const foodId = req.params.id;
    const food = await Food.findOne({ _id: foodId });
    res.render("adminViews/adminFoodUpdate", { data: food });
  }

  static async updateFood(req: any, res: any) {
    if (req.file) {
      const storageRef = ref(storage, `files/${req.file.originalname}`);
      const metadata = { contentType: req.file.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      const foodId = req.params.id;
      const food = await Food.findOne({ _id: foodId });
      food.imageUrl = downloadURL;
      food.name = req.body.name;
      food.type = req.body.type;
      food.des = req.body.des;
      await food.save();
    } else {
      const foodId = req.params.id;
      const food = await Food.findOne({ _id: foodId });
      food.name = req.body.name;
      food.type = req.body.type;
      food.des = req.body.des;
      await food.save();
    }
    res.redirect("/admin/food");
  }
}

export default AdminController;
