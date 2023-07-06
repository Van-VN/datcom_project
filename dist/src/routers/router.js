"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const app_1 = require("firebase/app");
const firebase_config_1 = __importDefault(require("../../firebase.config"));
const storage_1 = require("firebase/storage");
(0, app_1.initializeApp)(firebase_config_1.default.firebaseConfig);
const storage = (0, storage_1.getStorage)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
const router = (0, express_1.Router)();
const home_controller_1 = __importDefault(require("../controllers/home.controller"));
router.get("/", home_controller_1.default.getHomePage);
router.get("/create", home_controller_1.default.getCreatePage);
router.post("/create", upload.single("picture"), home_controller_1.default.createFood);
exports.default = router;
//# sourceMappingURL=router.js.map