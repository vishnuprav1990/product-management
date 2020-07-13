const Cart = require('../model/cart.model.js');


//Create new Cart
exports.addToCart = (req, res) => {
        // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Cart content can not be empty"
        });
    }

    if (req.body.item === undefined){
        req.body.item = 1;
    }
    Cart.findOneAndUpdate({
            item: req.body.item
        }, // find a document with that filter
        req.body, // document to insert when nothing was found
        {
            upsert: true,
            new: true,
            runValidators: true
        }, // options
        function (err, doc) { // callback
            if (err) {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the category."
                });
                console.log(err)
            } else {
                res.send(doc)
            }
        }
    );
};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
    Cart.find().populate('item')
        .then(cartItem => {
            res.send(cartItem);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving categories."
            });
        });
};


// Delete a cart item with the specified cart id in the request
exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
        .then(cartItem => {
            if (!cartItem) {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.cartId
                });
            }
            res.send({
                message: "Cart item deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cart item not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Could not delete cart item with id " + req.params.cartId
            });
        });
};