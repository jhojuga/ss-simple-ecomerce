import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
}

export interface OrderResponse {
  success: boolean;
  order_id: number;
  total: string;
  message: string;
  items: any[];
}

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const submitOrder = async (items: OrderItem[]): Promise<OrderResponse> => {
  try {
    const response = await apiClient.post<OrderResponse>('/orders', { items });
    return response.data;
  } catch (error) {
    console.error('Failed to submit order:', error);
    throw error;
  }
};

export default apiClient;
