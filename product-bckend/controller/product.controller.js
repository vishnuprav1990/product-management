const Product = require('../model/product.model.js');


//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        pname: req.body.pname || "No product name",
        minPrice: req.body.minPrice,
        categoryId: req.body.categoryId,
        maxPrice: req.body.maxPrice,
        buildTime: req.body.buildTime,
        buildCost: req.body.buildCost,
        imageUrl: req.body.fileUpload,
        rawMaterials:req.body.rawMaterials
    });

    // Save Product in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the product."
            });
        });

};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.find().populate('categoryId')
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving products."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId).populate('categoryId')
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.productId
            });
        });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    Product.findByIdAndUpdate(req.params.productId, {
            pname: req.body.pname || "No product name",
            minPrice: req.body.minPrice,
            categoryId: req.body.categoryId,
            maxPrice: req.body.maxPrice,
            buildTime: req.body.buildTime,
            buildCost: req.body.buildCost,
            imageUrl: req.body.fileUpload,
            rawMaterials:req.body.rawMaterials
        }, {
            new: true
        })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.productId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({
                message: "Product deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};

exports.upload = (req, res) => {
    res.json({
        fileUrl: 'http://localhost:3000/images/' + req.file.filename
    });
};