const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
      category: {type: String, required: true, unique: true }
},
{strictQuery: false});
module.exports = mongoose.model('categories', categorySchema);