let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const multer = require('multer')


// let indexRouter = require('./routes/api/v1');
// let authRouter = require('./routes/api/v1/auth');
// let carsRouter = require('./routes/api/v1/cars');
// let usersRouter = require('./routes/api/v1/users');
// let rentalsRouter = require('./routes/api/v1/rentals');
// let earningsRouter = require('./routes/api/v1/earnings');

let mainRouter = require('./routes/api/v1/main');


let app = express();
const upload = multer();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(upload.any())
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/cars', carsRouter);
// app.use('/api/v1/customers', usersRouter);
// app.use('/api/v1/rentals', rentalsRouter);
// app.use('/api/v1/earnings',earningsRouter)

app.use('/api/v1/',mainRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
