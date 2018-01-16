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
