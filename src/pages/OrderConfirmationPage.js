import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';

function OrderConfirmationPage({ orderDetails }) {
  const navigate = useNavigate();

  if (!orderDetails) {
    return (
      <div className="order-confirmation-page">
        <div className="no-order">
          <h2>No order found</h2>
          <button onClick={() => navigate('/')}>Go to Products</button>
        </div>
      </div>
    );
  }

  const { orderId, items, total, paymentMethod, shippingAddress, paymentSuccess, orderDate } = orderDetails;

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        {paymentSuccess ? (
          <>
            <div className="success-icon">✓</div>
            <h1 className="success-title">Order Placed Successfully!</h1>
            <p className="success-message">
              Thank you for your order. Your payment has been confirmed.
            </p>

            <div className="order-id-box">
              <h3>Order ID</h3>
              <p className="order-id">{orderId}</p>
            </div>

            <div className="order-details-section">
              <h2>Order Details</h2>
              
              <div className="detail-row">
                <span className="label">Order Date:</span>
                <span className="value">{orderDate}</span>
              </div>

              <div className="detail-row">
                <span className="label">Payment Method:</span>
                <span className="value">
                  {paymentMethod === 'card' && '💳 Credit/Debit Card'}
                  {paymentMethod === 'upi' && '📱 UPI / GPay'}
                  {paymentMethod === 'cod' && '💵 Cash on Delivery'}
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Total Amount:</span>
                <span className="value total-amount">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="shipping-details-section">
              <h2>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}, {shippingAddress.pincode}</p>
            </div>

            <div className="items-ordered-section">
              <h2>Items Ordered</h2>
              
              {items.map(item => (
                <div key={item.id} className="ordered-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="delivery-info">
              <p>📦 Your order will be delivered within 5-7 business days</p>
              <p>📧 Order confirmation has been sent to your email</p>
            </div>

            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <div className="failure-icon">✗</div>
            <h1 className="failure-title">Payment Failed</h1>
            <p className="failure-message">
              Unfortunately, your payment could not be processed. Please try again.
            </p>

            <div className="order-id-box failed">
              <h3>Transaction ID</h3>
              <p className="order-id">{orderId}</p>
            </div>

            <div className="failure-details">
              <p><strong>Order Date:</strong> {orderDate}</p>
              <p><strong>Amount:</strong> ₹{total.toFixed(2)}</p>
              <p><strong>Status:</strong> <span className="failed-status">FAILED</span></p>
            </div>

            <div className="failure-reasons">
              <h3>Possible Reasons:</h3>
              <ul>
                <li>Insufficient funds in account</li>
                <li>Incorrect card details</li>
                <li>Network connectivity issues</li>
                <li>Payment gateway timeout</li>
              </ul>
            </div>

            <div className="action-buttons">
              <button 
                className="retry-btn"
                onClick={() => navigate('/payment')}
              >
                Retry Payment
              </button>
              <button 
                className="home-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
