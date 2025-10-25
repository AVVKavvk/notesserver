const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const Dbconnect = require("./Dbconnect");
const Bot = require("./bot");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const otpRouter = require("./routers/otpRouter");
const adminRouter = require("./routers/admin");
const morgan = require("morgan");
const cookie = require("cookie-parser");
// const PORT=process.env.PORT||4006
const sem1 = require("./routers/sem1");
const sem2 = require("./routers/sem2");
const sem3 = require("./routers/sem3");
const sem4 = require("./routers/sem4");
const sem5 = require("./routers/sem5");
const sem6 = require("./routers/sem6");
const ratingRouter = require("./routers/ratingRouter");

const adminSem1Router = require("./routers/admin/sem1");
const adminSem2Router = require("./routers/admin/sem2");
const adminSem3Router = require("./routers/admin/sem3");
const adminSem4Router = require("./routers/admin/sem4");
const adminSem5Router = require("./routers/admin/sem5");
const adminSem6Router = require("./routers/admin/sem6");
const adminSem7Router = require("./routers/admin/sem7");
const adminSem8Router = require("./routers/admin/sem8");
const accountRouter = require("./routers/account");

const PORT = 4006;
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://vipinnotes.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // origin: process.env.Client_URL,
  })
);
app.use(cookie());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/otp", otpRouter);

app.use("/sem1", sem1);
app.use("/sem2", sem2);
app.use("/sem3", sem3);
app.use("/sem4", sem4);
app.use("/sem5", sem5);
app.use("/sem6", sem6);
app.use("/rating", ratingRouter);

app.use("/admin", adminRouter);
app.use("/sem1admin", adminSem1Router);
app.use("/sem2admin", adminSem2Router);
app.use("/sem3admin", adminSem3Router);
app.use("/sem4admin", adminSem4Router);
app.use("/sem5admin", adminSem5Router);
app.use("/sem6admin", adminSem6Router);
app.use("/sem7admin", adminSem7Router);
app.use("/sem8admin", adminSem8Router);

app.use("/account", accountRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

Dbconnect();

Bot();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
