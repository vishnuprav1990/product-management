const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({

            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                unique: true
            },
            count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CategorySchema);