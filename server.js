
// SQLite database
const Sequelize = require('sequelize'); // Constructor function - capitalised
let db_connection = new Sequelize('products', 'null', 'null', {
    dialect: 'sqlite',
    storage: './db/products.sqlite',
    operatorsAliases: false
});


// express server
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('json spaces', 2);

app.use(express.static('views'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.render('./index');
});


// Model
const Product = require('./models/product');

// Rest API Routes
app.use('/api/v1', require('./routes/api'));


// Start listening on port 3000
console.log();
app.listen(port, function(){
    console.log('Products RESTful API server running on port ' + port);
});
