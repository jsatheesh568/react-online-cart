import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<ProductsPage cart={cart} addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
          <Route 
            path="/payment" 
            element={
              <PaymentPage 
                cart={cart} 
                setOrderDetails={setOrderDetails} 
                clearCart={clearCart} 
              />
            } 
          />
          <Route 
            path="/order-confirmation" 
            element={
              <OrderConfirmationPage 
                orderDetails={orderDetails} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
