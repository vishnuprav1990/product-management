module.exports = (app) => {
  const cart = require('../controller/cart.controller.js');
  // add a new Product to cart
  app.post('/cart', cart.addToCart);

  // Retrieve all Cart Item
  app.get('/cart', cart.findAll);

  // Delete a Note with categoryId
  app.delete('/cart/:cartId', cart.delete);

}