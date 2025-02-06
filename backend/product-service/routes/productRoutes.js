const express = require('express');
const multer = require('multer');
const router = express.Router();
const validateProduct = require('../middlewares/validateProduct');
const authenticate = require('../middlewares/authenticate');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/backend/product-service/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post(
    '/products',
    // authenticate,
    upload.single('image'),
    // validateProduct,
    createProduct
);

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', authenticate, upload.single('image'), updateProduct);
router.delete('/products/:id', authenticate, deleteProduct);

module.exports = router;
