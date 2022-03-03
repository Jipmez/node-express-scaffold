const Guard = require("./guard");
const RestRouter = require("../router");
const express = require("express");
const appConfig = require("../config/app.configuration").fomart;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const restRouter = new RestRouter(new Guard());

if (appConfig != "api") {
  app.use(express.static("public"));
  app.set("view engine", "ejs");
}

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "DELETE", "PATCH", "POST"],
    allowedHeaders:
      "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  })
);
app.use(logger("combined"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: appConfig == "api" ? false : true,
  })
);
app.use(cookieParser());

app.use(restRouter.setup());

app.listen("3000", "localhost", () => {
  console.log("listing on port 3000");
});

module.exports = app;
