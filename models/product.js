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
