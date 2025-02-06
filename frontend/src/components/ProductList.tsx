import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/products');
        setProducts(response.data);
      } catch (err) {
        setError('Error al obtener los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <Card key={product.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Marca:</strong> {product.brand}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              {product.image && (
                <img
                  src={`http://localhost:3002${product.image}`} // Ajusta la ruta según tu backend
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center">No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductsList;
