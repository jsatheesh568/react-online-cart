import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage({ cart, setOrderDetails, clearCart }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateTotal();
    const tax = subtotal * 0.18;
    return subtotal + tax;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      alert('Please fill in all shipping details');
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.cardName)) {
      alert('Please fill in card details');
      return;
    }

    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter UPI ID');
      return;
    }

    // Generate order ID
    const orderId = 'ORD' + Date.now();
    
    // Simulate payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate

    const orderData = {
      orderId,
      items: cart,
      total: calculateGrandTotal(),
      paymentMethod,
      shippingAddress,
      paymentSuccess,
      orderDate: new Date().toLocaleString()
    };

    setOrderDetails(orderData);
    
    if (paymentSuccess) {
      clearCart();
    }

    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="payment-page">
        <div className="empty-message">
          <h2>No items in cart</h2>
          <button onClick={() => navigate('/')}>Go to Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <header className="header">
        <h1>Checkout</h1>
        <button onClick={() => navigate('/cart')}>← Back to Cart</button>
      </header>

      <div className="payment-content">
        <div className="payment-form">
          <h2>Shipping Address</h2>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                  required
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            
            <div className="payment-methods">
              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <label>💳 Credit/Debit Card</label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                      maxLength="16"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                        maxLength="5"
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div 
                className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <label>📱 UPI / GPay</label>
              </div>

              {paymentMethod === 'upi' && (
                <div className="upi-details">
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <label>💵 Cash on Delivery</label>
              </div>
            </div>

            <button type="submit" className="pay-now-btn">
              {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
            </button>
          </form>
        </div>

        <div className="order-summary-sidebar">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>GST (18%)</span>
            <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span><strong>Total Amount</strong></span>
            <span><strong>₹{calculateGrandTotal().toFixed(2)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
