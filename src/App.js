import './App.css';
import { commerce } from './lib/commerce';
// Components are imported from components folder with index.js exports
import { Products, Navbar } from './components';

// Hooks
import { useState, useEffect } from 'react';

function App() {
  // States
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  
  // Fetching data
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // Fetching the cart
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // Cart adding
  const handleAddCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart)

  return (
    <div className="App">
      <Navbar total_items={cart.total_items} />
      <Products products={products} handleAddCart={handleAddCart}/>
    </div>
  );
}

export default App;
