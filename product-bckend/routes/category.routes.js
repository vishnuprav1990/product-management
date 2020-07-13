module.exports = (app) => {
  const categories = require('../controller/category.controller.js');
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
  app.post('/categories', upload.single('fileUpload'), categories.create);

  // Retrieve all Products
  app.get('/categories', categories.findAll);

  // Retrieve a single Product with categoryId
  app.get('/categories/:categoryId', categories.findOne);

  // Update a Note with categoryId
  app.put('/categories/:categoryId', upload.single('fileUpload'), categories.update);

  // Delete a Note with categoryId
  app.delete('/categories/:categoryId', categories.delete);

  // upload
  app.post('/category/upload', upload.single('image'), categories.upload);
}