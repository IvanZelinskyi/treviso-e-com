const Brands = require('../models/brandsModel');
const Products = require('../models/productsModel');

class brandsController {
    async findAll (req,res) {
        try {
        const brandList = await Brands.find({})
        res.send({ok: true, data: brandList})
        } catch(error){
            res.send({error})
        }
    }
    async findProdOfBrand(req, res) {        // ? 
        let { brand } = req.params
        try {
            const findProducts = await Products.findOne({ brand })
            if(findProducts) {
              res.send({ ok: true, data: findProducts })
            } else if(!findProducts){
              res.send({ok: false, data: `There are no '${brand}' products yet !`})
            }
        }
        catch (error) {
            res.send({ error })
        }
    }
    async addBrand (req, res) {
        const { brand } = req.body
        try {
            const findBrand = await Brands.findOne({brandName: brand})
            if(!findBrand) {
              const addBrand = await Brands.create({ brandName: brand})
              res.send({ok: true, data: `Brand ${brand} added successfully`})
            } else if(findBrand) {
              res.send({ok: false, data: `Brand ${brand} already exist`})
            }
        } catch (error) {
            res.send({error})
        }
    }
    
    async updateBrand(req,res) {
        const {old_brand, new_brand} = req.body
        try {
        const findBrand = await Brands.findOne({brandName: old_brand})
        if(findBrand) {
           const updated = await Brands.updateOne({brandName: old_brand}, {brandName: new_brand})
           res.send({ok: true, data: `brand ${old_brand} updated successfully!`})
        } else if (!findBrand) {
            res.send({ok: false, data: `brand ${old_brand} doesn't exist`})
        }
        } catch (error) {
            res.send({error})
        }
    } 
    async deleteBrand (req,res) {
        const { brand } = req.body
        try {
            const findBrand = await Brands.findOne({brandName: brand})
            if(findBrand) {
            const deleteBrand = await Brands.deleteOne({brandName: brand})
            res.send({ok: true, data: `brand ${brand} deleted successfully!`})
            } else if(!findBrand) {
                res.send({ok: false, data: `brand ${brand} doesn't exist`})
            }
        } catch (error) {
            res.send({error})
        }
    }
}
module.exports = new brandsController();
