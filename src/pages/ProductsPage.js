import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

function ProductsPage({ cart, addToCart, products }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    const product = products.find(p => p.id === productId);
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
      if (quantity > product.stock) {
        alert(`Only ${product.stock} units available in stock!`);
        return;
      }
      
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
      
      // Reset quantity input
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
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
              <p className="product-stock" style={{ color: product.stock === 0 ? '#dc3545' : '#28a745' }}>
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
                  disabled={quantities[product.id] >= product.stock || product.stock === 0}
                >
                  +
                </button>
              </div>

              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                style={{ 
                  opacity: product.stock === 0 ? 0.5 : 1,
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
