import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


const CreateProduct = () => {
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const [soldBy, setSoldBy] = useState('');
  const [price, setPrice] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación básica
    if (!title || !price || !image || !brand || !code || !storeCode || !soldBy || !specifications || !additionalInfo) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    let parsedSpecifications;
    let parsedAdditionalInfo;

    try {
      parsedSpecifications = JSON.parse(specifications);  // Intentar parsear como JSON
      parsedAdditionalInfo = JSON.parse(additionalInfo);
    } catch (err) {
      setError('Las especificaciones y la información adicional deben ser JSON válidos.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('title', title);
    formData.append('code', code);
    formData.append('store_code', storeCode);
    formData.append('sold_by', soldBy);
    formData.append('price', parseFloat(price));  // Convertir precio a número
    formData.append('specifications', JSON.stringify(parsedSpecifications)); // Asegurar JSON válido
    formData.append('additional_info', JSON.stringify(parsedAdditionalInfo)); // Asegurar JSON válido
    formData.append('image', image);

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post('http://localhost:3002/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Producto creado con éxito');
        setBrand('');
        setTitle('');
        setCode('');
        setStoreCode('');
        setSoldBy('');
        setPrice('');
        setSpecifications('');
        setAdditionalInfo('');
        setImage(null);
      }
    } catch (error) {
      setError('Hubo un error al crear el producto. Intenta nuevamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="brand">Marca</Label>
          <Input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            placeholder="Introduce la marca del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="title">Nombre del Producto</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Introduce el nombre del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="code">Código del Producto</Label>
          <Input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="Introduce el código del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="store_code">Código de Tienda</Label>
          <Input
            type="text"
            id="store_code"
            value={storeCode}
            onChange={(e) => setStoreCode(e.target.value)}
            required
            placeholder="Introduce el código de tienda"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="sold_by">Vendido por</Label>
          <Input
            type="text"
            id="sold_by"
            value={soldBy}
            onChange={(e) => setSoldBy(e.target.value)}
            required
            placeholder="Introduce quién lo vende"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="price">Precio</Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Introduce el precio del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="specifications">Especificaciones</Label>
          <Textarea
            id="specifications"
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
            required
            placeholder="Introduce las especificaciones del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="additional_info">Información Adicional</Label>
          <Textarea
            id="additional_info"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
            placeholder="Introduce información adicional del producto"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="image">Imagen del Producto</Label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creando Producto...' : 'Crear Producto'}
        </Button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
