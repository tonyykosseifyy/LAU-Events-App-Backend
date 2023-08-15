const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./utils/database");

const indexRouter = require("./routes/index");
const clubRouter = require("./routes/club");
const eventRouter = require("./routes/event");
const userRouter = require("./routes/users");
const clubEventRouter = require("./routes/clubEvent");
const userEventsRouter = require("./routes/userEvent");
const dashboardRouter = require("./routes/dashboard");
const uploadRouter = require("./routes/upload.js");

const authRouter = require("./routes/auth");

const { isAuthenticated, isAdmin } = require("./middlewares/authJwt");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// authenticated middleware for all routes except /auth
app.use((req, res, next) => {
  if (
    !req.path.startsWith("/auth") &&
    !req.path.startsWith("/api-docs") &&
    !req.path.startsWith("/images")
  ) {
    isAuthenticated(req, res, next);
  } else {
    next();
  }
});

require("./services/swagger.service.js")(app);

app.use("/", indexRouter);
app.use("/clubs", clubRouter);
app.use("/events", eventRouter);
app.use("/dashboard", isAdmin, dashboardRouter);
app.use("/users", isAdmin, userRouter);
app.use("/clubEvents", clubEventRouter);
app.use("/userEvents", userEventsRouter);
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);
app.use("/images", express.static(path.join(__dirname, "images")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error Page" });
});

module.exports = app;
