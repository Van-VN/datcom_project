"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_model_1 = __importDefault(require("../models/schemas/food.model"));
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const json2csv_1 = require("json2csv");
class HomeController {
    static async getHomePage(req, res) {
        try {
            const foods = await food_model_1.default.find({ status: "true" });
            return res.render("home", { data: foods });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async showFoodDetail(req, res) {
        try {
            const foodId = req.params.id;
            const food = await food_model_1.default.findOne({ _id: foodId }).populate("comment.postedBy");
            res.render("foodDetail", { data: food, alert: null });
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static async foodComment(req, res) {
        try {
            const food = await food_model_1.default.findOne({ _id: req.params.id });
            if (req.user) {
                const user = await user_model_1.default.findOne({ _id: req.user.id });
                let comment = req.body;
                if (comment.text.length > 10) {
                    comment.postedBy = user;
                    await food_model_1.default.findByIdAndUpdate({
                        _id: req.params.id,
                    }, {
                        $push: { comment: comment },
                    }, { new: true });
                    res.redirect(`/detail/${req.params.id}`);
                }
                else {
                    const data = "Bình luận chưa đủ 10 chữ cái!";
                    res.render("foodDetail", { data: food, alert: data });
                }
            }
            else {
                res.redirect("/login");
            }
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static async deleteComment(req, res) {
        try {
            const commentId = req.params.id;
            const foodId = req.query.q;
            const comment = await food_model_1.default.findOne({ "comment._id": commentId });
            await comment.updateOne({ $pull: { comment: { _id: commentId } } });
            res.redirect(`/detail/${foodId}`);
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static showErrorPage(req, res) {
        try {
            res.render("404");
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static async searchFood(req, res) {
        const query = req.query.q;
        const results = await food_model_1.default.find({ name: { $regex: query, $options: "i" } });
        return res.json(results);
    }
    static async meatSort(req, res) {
        const results = await food_model_1.default.find({ type: "Món thịt" });
        return res.json(results);
    }
    static async vegSort(req, res) {
        const results = await food_model_1.default.find({ type: "Món rau" });
        return res.json(results);
    }
    static async allSort(req, res) {
        const results = await food_model_1.default.find();
        return res.json(results);
    }
    static async exportExcel(req, res) {
        const data = await food_model_1.default.find();
        const parser = new json2csv_1.Parser();
        const csv = parser.parse(data);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=foodexport${Date.now()}.csv`);
        res.send(csv);
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map