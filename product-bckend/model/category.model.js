const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    cname: String,
    imageUrl: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);