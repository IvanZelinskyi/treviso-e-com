const express = require('express'),
router = express.Router(),
controller = require('../controllers/subCategoriesController');


router.get('/all', controller.findAll)
router.get('/:subcategory', controller.findCat)
router.post('/add', controller.addCat)
router.post('/update', controller.updateCat)
router.post('/delete', controller.deleteCat)

module.exports = router;