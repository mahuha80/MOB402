const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", (req, res) => res.render("index"));
app.get("/register", (req, res) => {
  res.render("register");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
