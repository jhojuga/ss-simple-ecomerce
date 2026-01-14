import db, { getProducts, getProduct } from '../db.js';

export class ProductRepository {
  constructor(database = db) {
    this.db = database;
  }

  getAllProducts() {
    return getProducts.all();
  }

  getProductById(id) {
    return getProduct.get(id);
  }
}

export default ProductRepository;