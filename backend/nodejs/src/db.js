import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', '..', 'ecommerce.db');

const db = new Database(dbPath, { verbose: console.log });

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 10
  );
  
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL,
    items TEXT NOT NULL
  );
`);

// Insert initial products
const products = [
  // PS5
  { id: 1, name: 'God of War Ragnarök', description: 'Epic action-adventure', price: 69.99, image_url: 'public/images/god_of_war_ragnarok.jpg', category: 'PS5', stock: 8 },
  { id: 2, name: 'Final Fantasy VII Remake', description: 'JRPG masterpiece', price: 59.99, image_url: '/images/final_fantasy_vii.jpg', category: 'PS5', stock: 5 },
  { id: 3, name: 'Call Of Duty', description: 'Modern Shooter', price: 49.99, image_url: '/images/call_of_duty.jpg', category: 'PS5', stock: 10 },
  // Xbox
  { id: 4, name: 'Halo 4', description: 'Sci-fi Shooter', price: 59.99, image_url: '/images/halo_4.jpg', category: 'Xbox', stock: 7 },
  { id: 5, name: 'Mortal Kombat', description: 'Fighting Game', price: 69.99, image_url: '/images/mortal_kombat.jpg', category: 'Xbox', stock: 4 },
  { id: 6, name: 'Resident Evil', description: 'Survival Horror', price: 59.99, image_url: '/images/resident_evil.jpg', category: 'Xbox', stock: 9 },
  // Switch
  { id: 7, name: 'Super Mario Odyssey', description: 'Platformer adventure', price: 49.99, image_url: '/images/super_mario_odyssey.jpg', category: 'Switch', stock: 12 },
  { id: 8, name: 'Mario Kart 8 Deluxe', description: 'Racing game', price: 54.99, image_url: '/images/mario_kart_8_deluxe.jpg', category: 'Switch', stock: 15 },
  { id: 9, name: 'Street Fighter IV', description: 'Fighting Game', price: 59.99, image_url: '/images/street_fighter_4.jpg', category: 'Switch', stock: 6 }
];

const insertStmt = db.prepare(`
  INSERT OR IGNORE INTO products (id, name, description, price, image_url, category, stock)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

products.forEach(p => {
  insertStmt.run(p.id, p.name, p.description, p.price, p.image_url, p.category, p.stock);
});

// Prepared statements
export const getProducts = db.prepare('SELECT * FROM products');
export const getProduct = db.prepare('SELECT * FROM products WHERE id = ?');
export const createOrder = db.prepare(`
  INSERT INTO orders (total, items)
  VALUES (?, ?)
`);
export const updateProductStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

export default db;
