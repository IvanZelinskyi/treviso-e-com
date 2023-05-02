const express = require('express'),
router = express.Router(),
controller = require('../controllers/categoriesController');


router.get('/all', controller.findAll)
router.get('/:category', controller.findProdOfCat)
router.post('/add', controller.addCat)
router.post('/update', controller.updateCat)
router.post('/delete', controller.deleteCat)

module.exports = router;