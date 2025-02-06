const Product = require('../models/productModel');

// Create a product
exports.createProduct = async (req, res) => {
    try {
        console.log('REQ.BODY:', req.body);

        const { brand, title, code, store_code, sold_by, price, specifications, additional_info } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.create({
            brand,
            title,
            code,
            store_code,
            sold_by,
            price,
            image: imageUrl,
            specifications: JSON.parse(specifications),
            additional_info: JSON.parse(additional_info)
        });

        console.log('PRODUCTO CREADO:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ message: 'Error creando el producto', error });
    }
};


// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a product by id
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, title, code, store_code, sold_by, price, images, specifications, additional_info } = req.body;

        const [updated] = await Product.update(
            { brand, title, code, store_code, sold_by, price, images, specifications, additional_info },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
