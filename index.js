const express = require("express");

const app = express();

const port = 3000;

var bodyParser = require("body-parser");

const hbs = require("express-handlebars");
//declare route in project
const userRoute = require("./routes/user.route");

const api = require("./api/routes/user.route");

const product = require("./routes/product.route");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/mob402", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("connect db successfully");
    },
    err => {
      console.log(`connect failed ${err}`);
    }
  );

app.engine(
  ".hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "",
    layoutsDir: ""
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => res.render("index"));

app.use("/user", userRoute);

app.use("/api", api);

app.use("/product",product)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
