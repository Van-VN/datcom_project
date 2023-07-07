"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_model_1 = __importDefault(require("../models/schemas/food.model"));
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const app_1 = require("firebase/app");
const firebase_config_1 = __importDefault(require("../../firebase.config"));
const storage_1 = require("firebase/storage");
(0, app_1.initializeApp)(firebase_config_1.default.firebaseConfig);
const storage = (0, storage_1.getStorage)();
class AdminController {
    static async showAdminPage(req, res) {
        res.redirect("/admin/food");
    }
    static async showUserList(req, res) {
        const users = await user_model_1.default.find();
        if (users) {
            res.render("adminViews/adminUserList", { data: users });
        }
        else {
            res.redirect("/404");
        }
    }
    static async showUserEdit(req, res) {
        const userId = req.params.id;
        const user = await user_model_1.default.findById(userId);
        if (user) {
            res.render("adminViews/adminUserEdit", { data: user });
        }
        else {
            res.redirect("/404");
        }
    }
    static async updateUser(req, res) {
        try {
            const user = await user_model_1.default.findOne({ _id: req.params.id }).catch((err) => {
                console.log(err);
                res.redirect("/404");
            });
            if (user) {
                user.name = req.body.signinname;
                user.fullName = req.body.username;
                user.password = req.body.password;
                user.className = req.body.userclass;
                await user.save();
                res.redirect("/admin/user");
            }
            else {
                res.redirect("/404");
            }
        }
        catch (err) {
            res.redirect("/404");
            console.log(err.message);
        }
    }
    static async deleteUser(req, res) {
        const user = user_model_1.default.findOne({ _id: req.params.id });
        if (user) {
            await user_model_1.default.findByIdAndDelete({ _id: req.params.id });
            res.redirect("/admin/user");
        }
        else {
            res.redirect("/admin/user");
        }
    }
    static async showCreateUser(req, res) {
        res.render("adminViews/adminCreateUser", { alert: null });
    }
    static async createUser(req, res) {
        try {
            const user = await user_model_1.default.findOne({ name: req.body.signinname });
            if (user) {
                const alert = `Đã tồn tại người dùng với tên ${user.name} vui lòng chọn tên đăng nhập khác!`;
                res.render("adminViews/adminCreateUser", { alert: alert });
            }
            else {
                const newUser = new user_model_1.default({
                    name: req.body.signinname,
                    fullName: req.body.username,
                    password: req.body.password,
                    className: req.body.userclass,
                });
                await newUser.save();
                res.redirect("/admin");
            }
        }
        catch (err) {
            console.log(err.message);
        }
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
        const foodStatus = await food_model_1.default.find({ status: true });
        let check;
        if (foodStatus.length === 0) {
            check = false;
        }
        else {
            check = true;
        }
        res.render("adminViews/adminFoodList", { data: foods, check: check });
    }
    static async showUpdateFood(req, res) {
        const foodId = req.params.id;
        const food = await food_model_1.default.findOne({ _id: foodId });
        if (food) {
            res.render("adminViews/adminFoodUpdate", { data: food });
        }
        else {
            res.render("404");
        }
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
        if (food) {
            res.redirect("/admin/food");
        }
        else {
            res.render("404");
        }
    }
    static async updateStatus(req, res) {
        const food = await food_model_1.default.findOne({ _id: req.body.id });
        await food.updateOne({ $set: { status: req.body.state } });
    }
    static async closeOrder(req, res) {
        const food = await food_model_1.default.find();
        if (food) {
            await food_model_1.default.updateMany({}, { $set: { status: req.body.state } });
            res.redirect("/admin/food");
        }
        else {
            res.render("404");
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map