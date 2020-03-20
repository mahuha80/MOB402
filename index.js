const express = require("express");

const app = express();

const port = 3000;

var bodyParser = require("body-parser");

const registerRoute=require('./routes/user.route');

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

app.set("view engine", "pug");

app.set("views", "./views");

app.get("/", (req, res) => res.render("index"));

app.use('/api',registerRoute)
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
