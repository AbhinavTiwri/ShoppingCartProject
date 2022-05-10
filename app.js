const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var session = require('express-session');
var expressValidator = require('express-validator');

var fileUpload = require('express-fileupload');




const connectDB = require("./config/connection.js")
// import path from "path";
const PORT = process.env.PORT || 4000

// Db connection 
const DATABASE_URL = process.env.DATABASE_URI || "mongodb://localhost:27017"; 
connectDB(DATABASE_URL)

//init app
const app = express();

app.use(expressValidator())

app.use(expressValidator({
  custimValidator: {
    isImage: function (value, filename){
      var extension = (path.extname(filename)).toLowerCase();
      switch(extension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        case '':
          return '.jpg';
        default:
          return false;
      }
    }
  }
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    // cookie: {secure: true
    // }
}));

// Express Validator middleware
// app.use(expressValidator()); 

// Express massage middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(join(process.cwd(), "public")))


// set globel errors variable
app.locals.errors = null;

//Express fileUpload middleware
app.use(fileUpload());
// Set routers
const web = require('./routes/web.js');
const admin = require('./routes/admin.js');
const adminCategories = require('./routes/admin_categories.js');
const adminProducts = require('./routes/admin_products.js');
app.use('/', web);
app.use('/admin/pages', admin);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);


// Start server
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});