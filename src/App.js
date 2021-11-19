import './App.css';
import { commerce } from './lib/commerce';
// Components are imported from components folder with index.js exports
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Hooks
import { useState, useEffect } from 'react';

function App() {
  // States
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  
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
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route 
            exact path="/" 
            element={<Products products={products} handleAddCart={handleAddCart}/>} />
          <Route 
            exact path="/cart" 
            element={<Cart 
              cart={cart} 
              handleUpdateCartQty={ handleUpdateCartQty }
              handleRemoveFromCart={               handleRemoveFromCart }
              handleEmptyCart={               handleEmptyCart }
              />} />
          <Route 
            exact path="/checkout"
            element={<Checkout  
                        cart={cart}
                        order={order}
                        handleCaptureCheckout={handleCaptureCheckout}
                        errorMessage={errorMessage} />} />  
        </Routes>           
      </div>
    </Router>
  );
}

export default App;
