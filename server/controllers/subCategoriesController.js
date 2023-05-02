const subCategories = require('../models/subCategoriesModel')
const Products = require('../models/productsModel')
const Categories = require('../models/categoriesModel')
class subCategoriesController {

    async findAll (req,res) {
        try {
        const catList = await subCategories.find({}).populate('categoryId')
        res.send({ok: true, data: catList})
        } catch (error) {
          console.log(error)
            res.send({error})
        }
    }
    async findCat(req, res) {
        let { subcategory } = req.params
        try {
              const catProducts = await Products.find({ subCategoryProduct: subcategory }).populate('categoryId')
              res.send({ ok: true, data: catProducts })
        }
        catch (error) {
          res.send({error})
        }
    }

    async addCat (req, res) {
        const { subcategory, categoryId } = req.body
        try {
        const createCat = await subCategories.create({subCategoryName: subcategory, categoryId})
        res.send({ok: true, data: `subcategory ${subcategory} added successfully!`})
        } catch (error) {
        res.send({error})
        }
    }

    async updateCat (req,res) {
        const { old_subcategory, new_subcategory } = req.body
        try {
            const findCat = await subCategories.findOne({subCategoryName: old_subcategory})
            if(findCat) {
                const update = await subCategories.updateOne({subCategoryName: old_subcategory}, {subCategoryName: new_subcategory})
                res.send({ok: true, data: `subcategory ${old_subcategory} updated successfully!`})
            } else if(!findCat) {
                res.send({ok: false, data: `subcategory ${old_subcategory} doesn't exist` })
            }
        } catch (error) {
                res.send({error})
        }
    }
    async deleteCat (req,res) {
        const { subcategory } = req.body
        try {
        const findCat = await subCategories.findOne({subCategoryName: subcategory})
        if(findCat) {
            const deleteCat = await subCategories.deleteOne({subCategoryName: subcategory})
            res.send({ok: true, data: `subcategory ${subcategory} deleted successfully!`})
        } else if(!findCat) {
          res.send({ok: false, data: `subcategory ${subcategory} doesn't exist`})
        }
        } catch (error) {
        res.send({error})
        }
    }
}




module.exports = new subCategoriesController();
