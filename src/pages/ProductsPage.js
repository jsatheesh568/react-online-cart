import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import './ProductsPage.css';

function ProductsPage({ cart, addToCart }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    const product = mockProducts.find(p => p.id === productId);
    const currentQty = quantities[productId] || 0;
    const newQty = Math.max(0, Math.min(product.stock, currentQty + change));
    
    setQuantities({
      ...quantities,
      [productId]: newQty
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
      setQuantities({
        ...quantities,
        [product.id]: 0
      });
    } else {
      alert('Please select quantity first!');
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="products-page">
      <header className="header">
        <h1>Online Store</h1>
        <button 
          className="cart-icon-btn"
          onClick={() => navigate('/cart')}
        >
          🛒 Cart ({getTotalItems()})
        </button>
      </header>

      <div className="products-grid">
        {mockProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
              <p className="product-stock">
                Stock Available: <strong>{product.stock} units</strong>
              </p>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(product.id, -1)}
                  disabled={!quantities[product.id] || quantities[product.id] === 0}
                >
                  −
                </button>
                <span className="quantity-display">
                  {quantities[product.id] || 0}
                </span>
                <button 
                  onClick={() => handleQuantityChange(product.id, 1)}
                  disabled={quantities[product.id] >= product.stock}
                >
                  +
                </button>
              </div>

              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
