"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const home_controller_1 = __importDefault(require("../controllers/home.controller"));
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const idregex_middleware_1 = __importDefault(require("../middlewares/idregex.middleware"));
router.get("/", home_controller_1.default.getHomePage);
router.get("/detail/:id", idregex_middleware_1.default, home_controller_1.default.showFoodDetail);
router.post("/detail/:id", idregex_middleware_1.default, checkLogin_middleware_1.default, home_controller_1.default.foodComment);
router.get("/comment/delete/:id", idregex_middleware_1.default, checkLogin_middleware_1.default, home_controller_1.default.deleteComment);
router.get("/search", home_controller_1.default.searchFood);
router.get("/meatsort", home_controller_1.default.meatSort);
router.get("/vegsort", home_controller_1.default.vegSort);
router.get("/allsort", home_controller_1.default.allSort);
router.get("/download", home_controller_1.default.exportExcel);
exports.default = router;
//# sourceMappingURL=router.js.map