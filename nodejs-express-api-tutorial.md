# Setting Up node.js and express api server with SQLite db creating db from csv file.

## Create node app

1. **Create app**

	run `npn init`

1. **Install npm packages**

	run `npm install express body-parser sqlite3 sequelize`

## Create server

1. **Server**

	Create server.js and require express and body-parser and set the server port on 3001. React which will be front end runs on 3000 by default.
	```
	// server.js

	const express = require( 'express' );
	const app = express();
	const sqlite3 = require('sqlite3').verbose();
	const bodyParser = require('body-parser');
	const port = 3001;

	app.use(EXPRESS.static('views'));
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());
	app.set('json spaces', 2);
	app.get('/', function(req, res) {
    res.send('Hello from express');
	});

 	// Start listening on port 3001.
	console.log();
	app.listen(port, function(){
    console.log('Products RESTful API server running on port ' + port);
	});
```
1. **Connecting database to server**

```
// server.js

// connect database
const Sequelize = require('sequelize'); // Constructor function - capitalised
let db_connection = new Sequelize('products', 'null', 'null', {
    dialect: 'sqlite',
    storage: './db/myDatabase.sqlite',
    operatorsAliases: false
});
```

## Set the Routes / Model / Controller

1. **Set the routes**

	The api will run from the url localhost:30001/api/v1. This examples assumes we are listing all Products, creating a new Product, viewing just one Product selected by ID and deleting one Product by ID.

	```
	// server.js

	const router = express.Router();
	const path = require('path');

	// Rest API Routes
	app.use('/api/v1', require('./routes/v1/api'));

	```

	```
	// routes/v1/api.js

	const express = require('express');
	const router = express.Router();

	// Controller
	const productController = require('../controllers/productController');

	// Routes

	// Products Index
	router.get('/products', productController.getAll);
	router.get('/products/:ID', productController.getOne);
	router.post('/products/new', productController.putOne);
  router.put('/products/:ID', productController.updateOne);
  router.delete('/products/:ID', productController.deleteOne);

	//Return router
	module.exports = router;

	```



1. **Create the Model**

This examples assumes we are creating a Product which has a title, description and price with an ID.

```
// server.js

// Model
const Product = require('./models/product');
```

```
const Sequelize = require('sequelize'); // Constructor function - capitalised
let db_connection = new Sequelize('products', 'null', 'null', {
    dialect: 'sqlite',
    storage: './db/products.sqlite',
    operatorsAliases: false
});


// Product Model
let Product = db_connection
    .define('product', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        Title: {
            type: Sequelize.TEXT,
            unique: true,
            allowNull: false
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        Price: {
            type: Sequelize.REAL,
            allowNull: false,
            isFloat: true // checks for valid floating point numbers
        }
    },
    {
        createdAt: 'Created_at', // rename sequelize createdAt & updatedAt to match SQLite table names
        updatedAt: 'Updated_at'
    });

//Return model
module.exports = Product;
```

1. **Add the Controller**

```
//controllers/productController.js

// Database
const Sequelize = require('sequelize'); // Constructor function - capitalised
let db_connection = new Sequelize('products', 'null', 'null', {
    dialect: 'sqlite',
    storage: './db/products.sqlite',
    operatorsAliases: false
});

// Model
const Product = require('../models/product');

module.exports = {

    getAll(req, res) {
        db_connection
            .sync({
                logging: console.log
            })
            .then(function(){
                Product.findAll().then(function(products) {
                    res.json(products);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        db_connection
            .connectionManager.close()
            .then(() => console.log('Closing connection to database'));
    },

    getOne(req, res) {
        const productId = req.params.ID;
        db_connection
            .sync({
                logging: console.log
            })
            .then(function(){
                Product.findOne({
                    where: {
                        ID: productId
                    }
                })
                    .then(function(product) {
                        res.json(product);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        db_connection
            .connectionManager.close()
            .then(() => console.log('Closing connection to database'));
    },

    putOne(req, res) {
        const productReq = {
            body: {
                Title: req.body.title,
                Description: req.body.description,
                Price: req.body.price
            }
        };
        db_connection
            .sync({
                logging: console.log
            })
            .then(function(){
                Product.create(productReq.body, {
                    fields: ['Title', 'Description', 'Price']
                })
                    .then(function(newProduct) {
                        console.log('New Product successfully added.');
                        Product.findOne({
                            where: {
                                Title: newProduct.Title
                            }
                        })
                            .then(function(product) {
                                res.json(product);
                            });
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        db_connection
            .connectionManager.close()
            .then(() => console.log('Closing connection to database'));
    },

    updateOne(req, res) {
        const updateReq = {
            body: {
                Title: req.body.title,
                Description: req.body.description,
                Price: req.body.price
            }
        };
        db_connection
            .sync({
                logging: console.log
            })
            .then(function(){
                Product.update(updateReq.body, {
                    where: { ID: req.params.ID },
                    fields: ['Title', 'Description', 'Price']
                })
                    .then(function() {
                        console.log('Product successfully updated.');
                        Product.findOne({
                            where: {
                                ID: req.params.ID
                            }
                        })
                            .then(function(updatedProduct) {
                                res.json(updatedProduct);
                            });
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        db_connection
            .connectionManager.close()
            .then(() => console.log('Closing connection to database'));
    },

    deleteOne(req, res) {
        const productId = req.params.ID;
        db_connection
            .sync({
                logging: console.log
            })
            .then(function(){
                Product.destroy({
                    where: {
                        ID: productId
                    }
                });
                console.log('Product successfully deleted.');
                res.send('Product successfully deleted.');
            })
            .catch(function (error) {
                console.log(error);
            });
        db_connection
            .connectionManager.close()
            .then(() => console.log('Closing connection to database'));
    }

};
```

## To complete

Run the files through JSLint and test CRUD endpoints using postman. The Create (PutOne) only worked with postman if `application/x-www-form-urlencoded` was selected in the header.
