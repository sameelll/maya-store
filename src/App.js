import './App.css';
import { commerce } from './lib/commerce';
// Components are imported from components folder with index.js exports
import { Products, Navbar } from './components';
// Hooks
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  // Fetching data
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products)

  return (
    <div className="App">
      <Navbar />
      <Products products={products} />
    </div>
  );
}

export default App;
