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

class HomeController {
  static async getHomePage(req: any, res: any) {
    try {
      return res.render("home");
    } catch (err) {
      console.log(err);
    }
  }

  static async getCreatePage(req: any, res: any) {
    try {
      res.render("create");
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
        console.log(downloadURL);
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default HomeController;
