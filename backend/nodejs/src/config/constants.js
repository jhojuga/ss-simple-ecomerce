// Centralized configuration constants

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost'
};

export const DATABASE_CONFIG = {
  PATH: process.env.DATABASE_PATH || '../../ecommerce.db'
};

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  DOCS: '/api-docs'
};

export const ERROR_MESSAGES = {
  CART_EMPTY: 'Cart items cannot be empty',
  PRODUCT_NOT_FOUND: 'Product not found',
  INSUFFICIENT_STOCK: 'Insufficient stock',
  INVALID_INPUT: 'Invalid input data'
};

export const CATEGORY_COLORS = {
  PS5: '#003087',
  Xbox: '#107C10',
  Switch: '#E60012'
};