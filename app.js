// dependencies
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

// intiating express object
const app = express();

// dotenv package configuration
dotenv.config();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 - not found error handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successfull.");
    // port listening
    app.listen(process.env.PORT, () => {
      console.log(`app listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
