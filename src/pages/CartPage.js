import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ cart, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.18;
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <header className="header">
          <h1>Shopping Cart</h1>
        </header>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="header">
        <h1>Shopping Cart</h1>
        <button onClick={() => navigate('/')}>← Continue Shopping</button>
      </header>

      <div className="cart-content">
        <div className="cart-items">
          <h2>Cart Items ({cart.length})</h2>
          
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">₹{item.price.toLocaleString()} per unit</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                <p className="item-total-price">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>GST (18%)</span>
            <span>₹{calculateTax().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span><strong>Grand Total</strong></span>
            <span><strong>₹{calculateGrandTotal().toFixed(2)}</strong></span>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => navigate('/payment')}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
