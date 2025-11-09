import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { mockProducts } from './data/mockData';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState(mockProducts);

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

    // Reduce stock when adding to cart
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - quantity }
        : p
    ));
  };

  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;

    const quantityDifference = newQuantity - cartItem.quantity;

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      const product = products.find(p => p.id === productId);
      if (quantityDifference > 0 && product.stock < quantityDifference) {
        alert(`Only ${product.stock} units available in stock!`);
        return;
      }

      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));

      setProducts(products.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock - quantityDifference }
          : p
      ));
    }
  };

  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      setProducts(products.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock + cartItem.quantity }
          : p
      ));
    }
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    cart.forEach(item => {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === item.id
            ? { ...p, stock: p.stock + item.quantity }
            : p
        )
      );
    });
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<ProductsPage cart={cart} addToCart={addToCart} products={products} />} 
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
