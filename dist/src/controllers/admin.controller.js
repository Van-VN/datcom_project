"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_model_1 = __importDefault(require("../models/schemas/food.model"));
const app_1 = require("firebase/app");
const firebase_config_1 = __importDefault(require("../../firebase.config"));
const storage_1 = require("firebase/storage");
(0, app_1.initializeApp)(firebase_config_1.default.firebaseConfig);
const storage = (0, storage_1.getStorage)();
class AdminController {
    static async showAdminPage(req, res) {
        res.redirect("/admin/food");
    }
    static async showCreateUser(req, res) {
        res.render("adminViews/adminCreateUser");
    }
    static async getCreatePage(req, res) {
        try {
            res.render("adminViews/adminCreateFood");
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
            const food = new food_model_1.default({
                name: req.body.name,
                type: req.body.type,
                des: req.body.des,
                imageUrl: downloadURL,
            });
            await food.save();
            res.redirect("/admin/food");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static async showFoodList(req, res) {
        const foods = await food_model_1.default.find();
        res.render("adminViews/adminFoodList", { data: foods });
    }
    static async showUpdateFood(req, res) {
        const foodId = req.params.id;
        const food = await food_model_1.default.findOne({ _id: foodId });
        res.render("adminViews/adminFoodUpdate", { data: food });
    }
    static async updateFood(req, res) {
        if (req.file) {
            const storageRef = (0, storage_1.ref)(storage, `files/${req.file.originalname}`);
            const metadata = { contentType: req.file.mimetype };
            const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
            const downloadURL = await (0, storage_1.getDownloadURL)(snapshot.ref);
            const foodId = req.params.id;
            const food = await food_model_1.default.findOne({ _id: foodId });
            food.imageUrl = downloadURL;
            food.name = req.body.name;
            food.type = req.body.type;
            food.des = req.body.des;
            await food.save();
        }
        else {
            const foodId = req.params.id;
            const food = await food_model_1.default.findOne({ _id: foodId });
            food.name = req.body.name;
            food.type = req.body.type;
            food.des = req.body.des;
            await food.save();
        }
        res.redirect("/admin/food");
    }
    static async deleteFood(req, res) {
        const food = await food_model_1.default.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/food");
    }
    static async updateStatus(req, res) {
        const food = await food_model_1.default.findOne({ _id: req.body.id });
        await food.updateOne({ $set: { "status": req.body.state } });
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map