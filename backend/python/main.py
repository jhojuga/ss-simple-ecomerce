from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import yaml
from db import Database
from services.order_service import OrderService
from pydantic import BaseModel
from typing import List
import uvicorn
from pathlib import Path

app = FastAPI(title="Mini Ecommerce API", version="1.0.0")

# CORS - Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database and Services
db = Database()
order_service = OrderService(db)

# =====================
# Pydantic Models
# =====================

class OrderItem(BaseModel):
    id: int
    quantity: int

class OrderRequest(BaseModel):
    items: List[OrderItem]

# =====================
# API Endpoints
# =====================

@app.get("/api/products")
def get_products():
    """Get all products from catalog"""
    try:
        return db.get_products()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch products")

@app.post("/api/orders")
def create_order(order: OrderRequest):
    """Create a new order and process payment"""
    try:
        result = order_service.create_order([item.dict() for item in order.items])
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process order")

@app.get("/api-docs/openapi.json")
def get_openapi_schema():
    """Get OpenAPI schema"""
    try:
        openapi_path = Path(__file__).parent / 'openapi.yaml'
        with open(openapi_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except Exception as e:
        return {"error": "OpenAPI schema not found"}

# =====================
# Startup
# =====================

if __name__ == "__main__":
    print("🚀 FastAPI Server running on http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
