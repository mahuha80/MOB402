const express = require("express");

const app = express();

const port = 3000 || process.env.port;

require("dotenv").config();

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

const hbs = require("express-handlebars");

//declare route in project
const userRoute = require("./routes/user.route");

// const userAPI = require("./api/routes/user.route");
const userAPI = require("./api/routes/user.route");

const productAPI = require("./api/routes/product.route");

const product = require("./routes/product.route");

// const verify = require("./api/controllers/verify.controller");

const requireLogin = require("./middlewares/checkLogin.middleware");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser(process.env.secret));

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connect db successfully");
    },
    (err) => {
      console.log(`connect failed ${err}`);
    }
  );

app.engine(
  ".hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "common",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.redirect("/product");
});

app.use("/user", userRoute);

app.use("/api/product", productAPI);

app.use("/api/user", userAPI);

app.use("/product", requireLogin.requireAuth, product);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
