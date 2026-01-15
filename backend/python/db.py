import sqlite3
import json
from typing import List
from pathlib import Path

class Database:
    def __init__(self):
        # Shared database path with Node.js backend
        self.db_path = Path(__file__).parent.parent / 'ecommerce.db'
        self.init_db()
    
    def init_db(self):
        """Initialize database with tables and initial data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create products table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                image_url TEXT,
                category TEXT NOT NULL,
                stock INTEGER NOT NULL DEFAULT 10
            )
        ''')
        
        # Create orders table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                total REAL NOT NULL,
                items TEXT NOT NULL
            )
        ''')
        
        # Insert initial products if not exist
        products = [
            # PS5 Games
            (1, 'God of War Ragnarök', 'Epic action-adventure', 69.99, 'public/images/god_of_war_ragnarok.jpg', 'PS5', 8),
            (2, 'Final Fantasy VII Remake', 'JRPG masterpiece', 59.99, 'public/images/final_fantasy_vii.jpg', 'PS5', 5),
            (3, 'Call Of Duty', 'Modern Shooter', 49.99, 'public/images/call_of_duty.jpg', 'PS5', 10),
            # Xbox Games
            (4, 'Halo 4', 'Sci-fi Shooter', 59.99, 'public/images/halo_4.jpg', 'Xbox', 7),
            (5, 'Mortal Kombat', 'Fighting Game', 69.99, 'public/images/mortal_kombat.jpg', 'Xbox', 4),
            (6, 'Resident Evil', 'Survival Horror', 59.99, 'public/images/resident_evil.jpg', 'Xbox', 9),
            # Nintendo Switch
            (7, 'Super Mario Odyssey', 'Platformer adventure', 49.99, 'public/images/super_mario_odyssey.jpg', 'Switch', 12),
            (8, 'Mario Kart 8 Deluxe', 'Racing game', 54.99, 'public/images/mario_kart_8_deluxe.jpg', 'Switch', 15),
            (9, 'Street Fighter IV', 'fighting Game', 59.99, 'public/images/street_fighter_4.jpg', 'Switch', 6),
        ]
        
        for product in products:
            cursor.execute(
                'INSERT OR IGNORE INTO products (id, name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
                product
            )
        
        conn.commit()
        conn.close()
    
    def get_products(self):
        """Fetch all products"""
        try:
            print(f"DEBUG: Connecting to DB at {self.db_path}")
            conn = sqlite3.connect(self.db_path)
            print("DEBUG: Connected to DB")
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM products')
            rows = cursor.fetchall()
            print(f"DEBUG: Fetched {len(rows)} products")
            products = [dict(row) for row in rows]
            conn.close()
            print("DEBUG: Closed DB connection")
            return products
        except Exception as e:
            print(f"DEBUG: Error in get_products: {e}")
            raise
    
    def get_product_by_id(self, product_id: int):
        """Fetch product by ID"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM products WHERE id = ?', (product_id,))
        product = cursor.fetchone()
        conn.close()
        return dict(product) if product else None
    
    def create_order(self, items: List):
        """Create order and update stock"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            # Validate stock and calculate total
            order_items = []
            total = 0.0
            
            for item in items:
                print(f"DEBUG: Processing item: {item}")
                product = self.get_product_by_id(item['id'])
                if not product:
                    raise ValueError(f"Product {item['id']} not found")
                
                if product['stock'] < item['quantity']:
                    raise ValueError(f"Insufficient stock for {product['name']}")
                
                subtotal = float(product['price']) * item['quantity']
                total += subtotal
                
                order_items.append({
                    'id': product['id'],
                    'name': product['name'],
                    'price': float(product['price']),
                    'quantity': item['quantity'],
                    'subtotal': round(subtotal, 2)
                })
            
            # Insert order
            cursor.execute(
                'INSERT INTO orders (total, items) VALUES (?, ?)',
                (round(total, 2), json.dumps(order_items))
            )
            order_id = cursor.lastrowid
            
            # Update product stock
            for item in items:
                cursor.execute(
                    'UPDATE products SET stock = stock - ? WHERE id = ?',
                    (item['quantity'], item['id'])
                )
            
            conn.commit()
            
            return {
                'success': True,
                'order_id': order_id,
                'total': round(total, 2),
                'message': 'Compra realizada exitosamente',
                'items': order_items
            }
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()
