const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    pname: String,
    imageUrl: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      },
    minPrice: Number,
    maxPrice: Number,
    buildTime: Number,
    buildCost: Number,
    rawMaterials: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            count: Number
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', ProductSchema);