const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./utils/database')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const clubRouter = require('./routes/club');
const eventRouter = require('./routes/event');
const userRouter = require('./routes/users');
const userClubRouter = require('./routes/userClub');
const userEventRouter = require('./routes/userEvent');

const authRouter = require('./routes/auth');
const tokenRouter = require('./routes/refreshToken');

const { isAuthenticated, isAdmin } = require('./middlewares/authJwt');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// authenticated middleware for all routes except /auth
app.use((req, res, next) => {
  if (!req.path.startsWith('/auth')) {
    isAuthenticated(req, res, next);
  } else {
    next();
  }
});


app.use('/', indexRouter);
app.use('/admins',isAdmin, adminRouter);
app.use('/clubs', clubRouter);
app.use('/events', eventRouter);
app.use('/users', userRouter);
app.use('/userClubs', userClubRouter);
app.use('/userEvents', userEventRouter);

app.use('/auth', authRouter);
app.use('/refreshToken', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
