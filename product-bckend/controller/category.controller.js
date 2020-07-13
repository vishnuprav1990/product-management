const Category = require('../model/category.model.js');


//Create new Category
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Create a Category
    const category = new Category({
        cname: req.body.cname || "No category name",
        imageUrl: req.body.fileUpload
    });

    // Save Category in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the category."
            });
        });

};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
        .then(categories => {
            res.send(categories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving categories."
            });
        });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving category with id " + req.params.categoryId
            });
        });
};

// Update a category
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Find and update category with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
            cname: req.body.cname || "No category name",
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            buildTime: req.body.buildTime,
            buildCost: req.body.buildCost,
            imageUrl: req.body.fileUpload
        }, {
            new: true
        })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.categoryId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            res.send({
                message: "Category deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.categoryId
            });
        });
};

exports.upload = (req, res) => {
    res.json({
        fileUrl: 'http://localhost:3000/images/' + req.file.filename
    });
};