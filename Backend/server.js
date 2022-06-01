const express=require("express");
const PORT=3000;
const app=express();

const authRouter = require("./routers/auth");
app.use("/login", authRouter);

const UsersRouter = require("./routers/users");
app.use("/users", UsersRouter);

const GoalsRouter = require("./routers/goals");
app.use("/goals", GoalsRouter);

app.listen(PORT,()=>{
console.log("Westagilelabs portal app is Up now");
});