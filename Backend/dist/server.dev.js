"use strict";

var express = require("express");

var PORT = 3090;
var app = express();

var authRouter = require("./routers/login");

app.use("/login", authRouter);

var registerRouter = require("./routers/register");

app.use("/register", registerRouter);

var UsersRouter = require("./routers/users");

app.use("/users", UsersRouter);

var GoalsRouter = require("./routers/goals");

app.use("/goals", GoalsRouter);
app.listen(PORT, function () {
  console.log("Westagilelabs portal app is Up now");
});