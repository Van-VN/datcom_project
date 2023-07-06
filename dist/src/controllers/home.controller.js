"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_model_1 = __importDefault(require("../models/schemas/food.model"));
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
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map