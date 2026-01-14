import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { getProducts } from './db.js';
import OrderService from './services/orderService.js';
import { SERVER_CONFIG, API_ENDPOINTS } from './config/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = SERVER_CONFIG.PORT;

// Initialize services
const orderService = new OrderService();

// Middleware
app.use(cors());
app.use(express.json());

// Load OpenAPI
const openApiPath = path.join(__dirname, '..', '..', 'openapi.yaml');
const swaggerDocument = YAML.load(openApiPath);

// Swagger
app.use(API_ENDPOINTS.DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// =====================
// API Endpoints
// =====================

// GET /api/products - Get all products
app.get(API_ENDPOINTS.PRODUCTS, (req, res) => {
  try {
    const products = getProducts.all();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/orders - Create order
app.post(API_ENDPOINTS.ORDERS, async (req, res) => {
  try {
    const { items } = req.body;
    const result = await orderService.createOrder(items);
    res.json(result);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message || 'Failed to process order' });
  }
});

// =====================
// Start Server
// =====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});
