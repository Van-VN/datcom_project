"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./src/routers/router"));
const ConnectDB_1 = require("./src/models/ConnectDB");
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const app = express();
const port = 3000;
const db = new ConnectDB_1.ConnectDB();
db.connect().then(r => {
    console.log(`connect database successfully`);
}).catch(err => {
    console.log(`connect database error`);
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use((0, connect_livereload_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, connect_flash_1.default)());
app.set('view engine', "ejs");
app.set("views", "./src/views");
app.use(router_1.default);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map