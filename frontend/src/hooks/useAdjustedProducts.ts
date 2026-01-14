import { useState, useEffect } from 'react';
import type { Product } from '../services/api';
import type { CartItem } from '../context/CartContext';

interface UseAdjustedProductsProps {
  fetchedProducts: Product[];
  cartItems: CartItem[];
}

export const useAdjustedProducts = ({ fetchedProducts, cartItems }: UseAdjustedProductsProps): Product[] => {
  const [products, setProducts] = useState<Product[]>(fetchedProducts);

  // Update products when cart changes to reflect correct stock
  useEffect(() => {
    const updatedProducts = fetchedProducts.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return {
        ...product,
        stock: product.stock - (cartItem?.quantity || 0),
      };
    });
    setProducts(updatedProducts);
  }, [fetchedProducts, cartItems]);

  return products;
};