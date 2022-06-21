const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const { init } = require("./db");
const routes = require("./routes");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(routes);

init()
  .then(() => {
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.get("/", (req, res) => res.render("pages/index"));
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });