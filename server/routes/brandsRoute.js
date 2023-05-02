const express = require('express'),
router = express.Router(),
controller = require('../controllers/brandsController')


router.get('/all', controller.findAll)
router.get('/:brand', controller.findProdOfBrand)
router.post('/add', controller.addBrand)
router.post('/update', controller.updateBrand)
router.post('/delete', controller.deleteBrand)

module.exports = router;