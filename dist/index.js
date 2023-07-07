"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./src/routers/router"));
const user_router_1 = __importDefault(require("./src/routers/user.router"));
const admin_router_1 = __importDefault(require("./src/routers/admin.router"));
const ConnectDB_1 = require("./src/models/ConnectDB");
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const home_controller_1 = __importDefault(require("./src/controllers/home.controller"));
const app = express();
const port = 3000;
const db = new ConnectDB_1.ConnectDB();
db.connect()
    .then((r) => {
    console.log(`connect database successfully`);
})
    .catch((err) => {
    console.log(`connect database error`);
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express.static("./public"));
app.use((0, connect_livereload_1.default)());
app.use((0, connect_flash_1.default)());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(router_1.default);
app.use(user_router_1.default);
app.use(admin_router_1.default);
app.get("*", home_controller_1.default.showErrorPage);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map