const Categories = require('../models/categoriesModel')
const Products = require('../models/productsModel')

class CategoriesController {
    async findAll (req,res) {
        try {
            const catList = await Categories.find({})
            res.send({ok: true, categories: catList})
        } catch(error) {
            res.send({error})
        }
    }
    async findProdOfCat(req, res) {
      let { category } = req.params;
      try {
        let cat = await Categories.findOne({ category: category });
        if(cat) {
          const prod = await Products.find({ categoryId: cat._id.toString() });
          res.send({ok: true, data: prod});
        } else if(!cat) {
          res.send({ ok: false, data: `Category ${category} doesn't exist`})
        }
      } catch (e) {
        console.log(e);
        res.send({ e });
      }
    }

    async addCat(req,res) {
        const { category } = req.body
        try {
        const findCat = await Categories.findOne({category})
        if(!findCat) {
          const addCat = await Categories.create({category})
          res.send({ok: true, data: `category ${category} added successfully!`})
        } else if(findCat) {
          res.send({ok: false, data: `category ${category} already exist`})
        }
        } catch(error) {
            res.send({error})
        }
    }
    
    async updateCat (req, res) {
        const { old_category, new_category} = req.body
        try {
        const findCat = await Categories.findOne({category: old_category})
        if(findCat) {
            const updated = await Categories.updateOne({category: old_category}, {category: new_category})
            res.send({ok: true, data: `category ${old_category} successfully updated!`})
        } else if(!findCat) {
            res.send({ok: false, data: `category ${category} doesn't exist`})
        }
        } catch (error) {
            res.send({ok: false, data: `category ${old_category} doesn't exist`})
        }
    }

    async deleteCat (req,res) {
        const {category} = req.body
        try {
            const findCat = await Categories.findOne({category: category})
            if(findCat) {
                const deleteCat = await Categories.deleteOne({category: category})
                res.send({ok: true, data: `category ${category} deleted successfully!`})
            } else if(!findCat) {
                res.send({ok: false, data: `category ${category} doesn't exist`})
            }
        } catch(error) {
            res.send({error})
        }
    }
        // FIND ALL PRODUCTS FOR EACH CATEGORY

}


module.exports = new CategoriesController();
