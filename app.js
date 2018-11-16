var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users', {useNewUrlParser:true})

var indexRouter = require('./routes/index');

const app = express()

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
   console.log("Connexion à la base OK");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
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

app.listen(3005, function () {
  console.log('Application démarrée sur le port 3005!')
})

module.exports = app;
