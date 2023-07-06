"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firebase_config_1 = __importDefault(require("../../firebase.config"));
const storage_1 = require("firebase/storage");
(0, app_1.initializeApp)(firebase_config_1.default.firebaseConfig);
const storage = (0, storage_1.getStorage)();
class HomeController {
    static async getHomePage(req, res) {
        try {
            return res.render("home");
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getCreatePage(req, res) {
        try {
            res.render("create");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static async createFood(req, res) {
        try {
            const storageRef = (0, storage_1.ref)(storage, `files/${req.file.originalname}`);
            const metadata = { contentType: req.file.mimetype };
            const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
            const downloadURL = await (0, storage_1.getDownloadURL)(snapshot.ref);
            console.log(downloadURL);
        }
        catch (err) {
            console.log(err.message);
        }
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map