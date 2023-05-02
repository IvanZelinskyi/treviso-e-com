const mongoose = require('mongoose');
var Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true },
    price: {type: Number, required: true},
    brand: {type: String, required: true },
    description: {type: String, required: true },
    status: {type: String},
    image: {type: String, required: true, unique: true },
    image2: {type: String, unique: true },
    subCategoryProduct: {type: String, required: true},
    bestSeller: {type: Boolean},
    categoryId: {type:Schema.Types.ObjectId, required: true, ref: 'categories'}
},
{strictQuery: false});
module.exports = mongoose.model('products', productSchema);