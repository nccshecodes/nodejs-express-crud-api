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
