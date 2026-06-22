// src/pages/Orders.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await authApi.getUserCarts(user.id);
      setOrders(data.carts || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [user.id]); // Add user.id as dependency

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Add fetchOrders to dependencies

  const handleDeleteOrder = async (orderId) => {
    const deletedOrder = orders.find((order) => order.id === orderId);
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    toast.success('Order deleted');

    try {
      await authApi.deleteCart(orderId);
    } catch (error) {
      setOrders((prev) => [...prev, deletedOrder].sort((a, b) => a.id - b.id));
      toast.error('Failed to delete order');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
            <span className="logo">📦 My Orders</span>
          </div>
        </div>
      </nav>

      <div className="orders-content">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet</h2>
            <p>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="orders-list">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="order-card"
                >
                  <div className="order-header">
                    <div className="order-info">
                      <p className="order-id">Order #{order.id}</p>
                      <p className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status === 'completed' ? 'completed' : 'pending'}`}>
                        {order.status || 'Pending'}
                      </span>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="delete-order-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="order-products">
                    {order.products.map((product) => (
                      <div key={product.id} className="order-product">
                        <span className="product-name">{product.title}</span>
                        <span className="product-qty">Qty: {product.quantity}</span>
                        <span className="product-price">
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <span className="total-label">Total</span>
                    <span className="total-amount">
                      ${order.total?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;