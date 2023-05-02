const mongoose = require('mongoose');
var Schema = mongoose.Schema
const subCategorySchema = new mongoose.Schema({
    subCategoryName: {type: String, required: true, unique: true },
    categoryId: {type:mongoose.Types.ObjectId, required: true, ref: 'categories'},
  },
  {strictQuery: false})
module.exports = mongoose.model('subCategories', subCategorySchema);