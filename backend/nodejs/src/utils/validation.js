// Basic validation utilities without external libraries

export const validateOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart items cannot be empty');
  }

  for (const item of items) {
    if (!item.id || typeof item.id !== 'number' || item.id <= 0) {
      throw new Error('Invalid product ID');
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error('Invalid quantity');
    }
  }
};

export const validateProduct = (product) => {
  if (!product) {
    throw new Error('Product not found');
  }
  if (typeof product.stock !== 'number' || product.stock < 0) {
    throw new Error('Invalid product stock');
  }
  if (typeof product.price !== 'number' || product.price <= 0) {
    throw new Error('Invalid product price');
  }
};