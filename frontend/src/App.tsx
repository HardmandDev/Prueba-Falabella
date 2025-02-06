import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/create-product" element={<CreateProduct />} />
        {/* <Route path="/update-product/:id" element={<UpdateProduct />} /> */} {/** Get, update and delete A product by id */}
      </Routes>
    </Router>
  );
}

export default App;
