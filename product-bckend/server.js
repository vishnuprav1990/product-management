// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// parse requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('less-middleware')({
    src: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./routes/product.routes.js')(app);
require('./routes/category.routes.js')(app);
require('./routes/cart.routes.js')(app);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
mongoose.set('useFindAndModify', false);
// default route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Sims City Build it Product Manager app"
    });
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});