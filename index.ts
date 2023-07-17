import express = require("express");
import bodyParser from "body-parser";
import router from "./src/routers/router";
import userRouter from "./src/routers/user.router";
import adminRouter from "./src/routers/admin.router";
import { ConnectDB } from "./src/models/ConnectDB";
import livereload from "connect-livereload";
import HomeController from "./src/controllers/home.controller";
import orderRouter from "./src/routers/order.router";
import passport from "passport";
const app = express();
const port = process.env.PORT || 3000;
import session from "express-session";
const db = new ConnectDB();
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(
  require("connect-livereload")({
    port: 35729,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(async (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    try {
      res.locals.userLogin = req.user;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
  next();
});
app.use(router);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);
app.get("*", (req: any, res: any) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
