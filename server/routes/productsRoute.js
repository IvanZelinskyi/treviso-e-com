const express = require('express'),
router = express.Router(),
controller = require('../controllers/productsController');


router.get('/all', controller.allProducts)
router.get('/:name', controller.showProduct)
router.post('/add', controller.addProduct)
router.post('/update', controller.updateProduct)
router.post('/delete', controller.deleteProduct)

module.exports = router;