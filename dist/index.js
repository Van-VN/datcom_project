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
const order_router_1 = __importDefault(require("./src/routers/order.router"));
const passport_1 = __importDefault(require("passport"));
const app = express();
const port = process.env.PORT || 3000;
const express_session_1 = __importDefault(require("express-session"));
const db = new ConnectDB_1.ConnectDB();
db.connect()
    .then((r) => {
    console.log(`connect database successfully`);
})
    .catch((err) => {
    console.log(`connect database error`);
});
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("./public"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            res.locals.userLogin = req.user;
        }
        catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    next();
});
app.use(router_1.default);
app.use(order_router_1.default);
app.use(user_router_1.default);
app.use(admin_router_1.default);
app.get("*", (req, res) => {
    res.render("404");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map