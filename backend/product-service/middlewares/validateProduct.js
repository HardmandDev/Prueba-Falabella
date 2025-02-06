const Joi = require('joi');

const productSchema = Joi.object({
    brand: Joi.string().min(2).max(50).required().messages({
        'string.base': 'La marca debe ser una cadena de texto',
        'string.empty': 'La marca no puede estar vacía',
        'string.min': 'La marca debe tener al menos 2 caracteres',
        'string.max': 'La marca no puede tener más de 50 caracteres',
        'any.required': 'La marca es obligatoria'
    }),
    title: Joi.string().min(3).max(100).required().messages({
        'string.base': 'El título debe ser una cadena de texto',
        'string.empty': 'El título no puede estar vacío',
        'string.min': 'El título debe tener al menos 3 caracteres',
        'string.max': 'El título no puede tener más de 100 caracteres',
        'any.required': 'El título es obligatorio'
    }),
    code: Joi.string().max(50).required().messages({
        'string.base': 'El código debe ser una cadena de texto',
        'string.empty': 'El código no puede estar vacío',
        'string.max': 'El código no puede tener más de 50 caracteres',
        'any.required': 'El código es obligatorio'
    }),
    store_code: Joi.string().max(50).required().messages({
        'string.base': 'El código de tienda debe ser una cadena de texto',
        'string.empty': 'El código de tienda no puede estar vacío',
        'string.max': 'El código de tienda no puede tener más de 50 caracteres',
        'any.required': 'El código de tienda es obligatorio'
    }),
    sold_by: Joi.string().min(3).max(100).required().messages({
        'string.base': 'El vendedor debe ser una cadena de texto',
        'string.empty': 'El vendedor no puede estar vacío',
        'string.min': 'El vendedor debe tener al menos 3 caracteres',
        'string.max': 'El vendedor no puede tener más de 100 caracteres',
        'any.required': 'El campo vendido por es obligatorio'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'El precio debe ser un número',
        'number.min': 'El precio no puede ser menor que 0',
        'any.required': 'El precio es obligatorio'
    }),
    images: Joi.array().items(Joi.string().uri()).messages({
        'array.base': 'Las imágenes deben ser una lista de URLs',
        'string.uri': 'Cada imagen debe ser una URL válida'
    }),
    specifications: Joi.object().messages({
        'object.base': 'Las especificaciones deben ser un objeto JSON'
    }),
    additional_info: Joi.string().max(1000).messages({
        'string.base': 'La información adicional debe ser una cadena de texto',
        'string.max': 'La información adicional no puede tener más de 1000 caracteres'
    })
});

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Error en la validación de los datos del producto',
            details: error.details.map((err) => err.message)
        });
    }

    next();
};

module.exports = validateProduct;
