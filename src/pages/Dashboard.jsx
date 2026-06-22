// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optimisticItems, setOptimisticItems] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data for user:', user?.id);
      const [productsData, cartsData] = await Promise.all([
        authApi.getAllProducts(),
        authApi.getUserCarts(user?.id),
      ]);
      
      console.log('Products loaded:', productsData.products?.length);
      setProducts(productsData.products || []);
      
      const items = cartsData.carts?.[0]?.products || [];
      setOptimisticItems(items);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    const newItem = {
      id: Date.now(),
      title: product.title,
      price: product.price,
      quantity: 1,
      isOptimistic: true,
    };
    
    setOptimisticItems((prev) => [...prev, newItem]);
    toast.success(`Added ${product.title} to cart`);

    try {
      const response = await authApi.addToCart({
        userId: user.id,
        products: [{ id: product.id, quantity: 1 }],
      });
      
      setOptimisticItems((prev) =>
        prev.filter((item) => item.id !== newItem.id)
      );
      setOptimisticItems((prev) => [
        ...prev,
        { ...product, quantity: 1, id: response.id },
      ]);
    } catch (error) {
      setOptimisticItems((prev) =>
        prev.filter((item) => item.id !== newItem.id)
      );
      toast.error('Failed to add to cart. Reverted.');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    const removedItem = optimisticItems.find((item) => item.id === itemId);
    setOptimisticItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success('Removed from cart');

    try {
      await authApi.deleteCart(itemId);
    } catch (error) {
      setOptimisticItems((prev) => [...prev, removedItem]);
      toast.error('Failed to remove. Reverted.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <span className="logo">🛍️ MyStore</span>
          </div>
          <div className="nav-right">
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Products Section */}
        <div className="products-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.slice(0, 6).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="product-card"
              >
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="price">${product.price}</p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="cart-section">
          <div className="cart-card">
            <h2>🛒 Cart ({optimisticItems.length})</h2>
            <div className="cart-items">
              <AnimatePresence>
                {optimisticItems.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  optimisticItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`cart-item ${item.isOptimistic ? 'optimistic' : ''}`}
                    >
                      <div>
                        <p className="item-title">{item.title}</p>
                        <p className="item-price">${item.price} × {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            {optimisticItems.length > 0 && (
              <div className="cart-total">
                <p>Total: ${optimisticItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;