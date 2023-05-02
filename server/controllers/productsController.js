const Products = require('../models/productsModel');

class productsController {

    async addProduct (req, res) {
        const { subCategoryProduct, categoryId, name, price, brand, status, description, image, image2, bestSeller } = req.body
        try {
        const add = await Products.create({subCategoryProduct, categoryId, name, price, brand, status, description, image, image2, bestSeller })
        res.send({ok: true, data: `product ${name} added successfully!`})
        } catch (error) {
            res.send({ok: false, data: `product ${name} already exists`})
        }
    }
    async showProduct (req,res) {
        const {name} = req.params
        try {
            const showProduct = await Products.findOne({name: name}).populate('categoryId')
            res.send({ok: true, data: showProduct})
        } catch (error) {
            res.send({ok: false, data: `product ${name} doesn't exists`})
        }
    }
    async allProducts(req, res) {
        try {
            const showProducts = await Products.find({}).populate('categoryId')
            res.send({ ok: true, data: showProducts })
        } catch (error) {
            res.send({ error })
        }
    }

    async updateProduct (req,res) {
        const {old_name,old_categoryId, old_subCategoryProduct,old_price,old_brand,old_status, old_description, old_image,old_image2, old_bestSeller, new_categoryId, new_subCategoryProduct, new_name, new_price, new_brand, new_status, new_description, new_image, new_image2, new_bestSeller} = req.body
        try {
            const findProduct = await Products.findOne({name: old_name})
            if(findProduct) {
                const updated = await Products.updateOne({categoryId: old_categoryId, subCategoryProduct: old_subCategoryProduct, name: old_name, price: old_price, brand: old_brand, description: old_description, image: old_image, image2: old_image2, bestSeller: old_bestSeller}, {categoryId: new_categoryId, subCategoryProduct: new_subCategoryProduct, name: new_name, price: new_price, brand: new_brand, description: new_description, image: new_image, image2: new_image2, bestSeller: new_bestSeller})
                res.send({ok: true, data: `product ${old_name} updated successfully!`})
            } else if(!findProduct) {
                res.send({ok: false, data: `product ${old_name} doesn't exist`})
            }
        } catch (error) {
                res.send({error})
        }
    }
    async deleteProduct (req,res) {
        const { name } = req.body
        try {
            const findProd = await Products.findOne({name: name})
            if(findProd) {
                const deleteProd = await Products.deleteOne ({name: name})
                res.send({ok: true, data: `product ${name} deleted successfully!`})
            } else if (!findProd) {
                res.send({ok: false, data: `product ${name} doesn't exist`})
            }
        } catch (error) {
            res.send({error})
        }
    }
}

module.exports = new productsController();



// async allProd(req, res) {
//   try {
//     const allProd = await products.find({});
//     const allCat = await categories.find({});
//     let all = [];
//     allCat.forEach((x) => {
//       all.push({ catName: x.category });
//       all.push({
//         products: allProd.filter((y) => {

//           return x._id.toString() == y.category_id.toString();
//         }),
//       });
//     });
//     res.send({ all });
//   } catch (e) {
//     res.send({ e });
//   }
// }