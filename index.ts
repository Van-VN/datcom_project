import express = require("express");
import bodyParser from "body-parser";
import router from "./src/routers/router";
import { ConnectDB } from "./src/models/ConnectDB";
import livereload from "connect-livereload";
import flash from "connect-flash";

const app = express();
const port = 3000;

const db = new ConnectDB();
db.connect()
  .then((r) => {
    console.log(`connect database successfully`);
  })
  .catch((err) => {
    console.log(`connect database error`);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(livereload());
app.use(flash());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
