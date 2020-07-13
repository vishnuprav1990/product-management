module.exports = (app) => {
  const products = require('../controller/product.controller.js');
  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if (file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if (file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if (file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
  });
  var upload = multer({
    storage: storage
  });
  // Create a new Product
  app.post('/products', upload.single('fileUpload'), products.create);

  // Retrieve all Products
  app.get('/products', products.findAll);

  // Retrieve a single Product with productId
  app.get('/products/:productId', products.findOne);

  // Update a Note with productId
  app.put('/products/:productId', upload.single('fileUpload'), products.update);

  // Delete a Note with productId
  app.delete('/products/:productId', products.delete);

  // upload
  app.post('/product/upload', upload.single('image'), products.upload);
}