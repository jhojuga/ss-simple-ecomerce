import db, { createOrder, updateProductStock } from '../db.js';

export class OrderRepository {
  constructor(database = db) {
    this.db = database;
  }

  createOrder(total, items) {
    return createOrder.run(total, items);
  }

  updateProductStock(quantity, productId) {
    return updateProductStock.run(quantity, productId);
  }

  executeTransaction(callback) {
    const transaction = this.db.transaction(callback);
    return transaction();
  }
}

export default OrderRepository;