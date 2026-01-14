import ProductRepository from '../repositories/productRepository.js';
import OrderRepository from '../repositories/orderRepository.js';
import { validateOrderItems, validateProduct } from '../utils/validation.js';

export class OrderService {
  constructor(productRepo = new ProductRepository(), orderRepo = new OrderRepository()) {
    this.productRepository = productRepo;
    this.orderRepository = orderRepo;
  }

  async createOrder(items) {
    validateOrderItems(items);

    // Validate stock and calculate total
    let orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = this.productRepository.getProductById(item.id);

      validateProduct(product);

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      orderItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: parseFloat(subtotal.toFixed(2))
      });
    }

    // Use transaction
    const orderId = this.orderRepository.executeTransaction(() => {
      // Insert order
      const result = this.orderRepository.createOrder(parseFloat(total.toFixed(2)), JSON.stringify(orderItems));
      const id = result.lastInsertRowid;

      // Update stock
      for (const item of items) {
        this.orderRepository.updateProductStock(item.quantity, item.id);
      }

      return id;
    });

    return {
      success: true,
      order_id: orderId,
      total: parseFloat(total.toFixed(2)),
      message: 'Compra realizada exitosamente',
      items: orderItems
    };
  }
}

export default OrderService;