var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const viewRoutes = require("./routes/viewRoutes");



var app = express();

// view engine setup
app.get("/", (req, res) => {
  res.render("index");
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/", viewRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  console.error(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 res.status(err.status || 500).json({
message: err.message || "Server Error"
})
  res.render('error');
});




const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
