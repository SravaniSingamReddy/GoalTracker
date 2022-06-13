const express = require("express");
const PORT = 3050;
const app = express();

const authRouter = require("./routers/login");
app.use("/login", authRouter);

const registerRouter = require("./routers/register");
app.use("/register", registerRouter);

const UsersRouter = require("./routers/users");
app.use("/users", UsersRouter);

const GoalsRouter = require("./routers/goals");
app.use("/goals", GoalsRouter);

app.listen(PORT, () => {
  console.log("Westagilelabs portal app is Up now");
});
