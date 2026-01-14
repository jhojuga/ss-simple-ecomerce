from typing import List, Dict, Any
from db import Database

class OrderService:
    def __init__(self, db: Database):
        self.db = db

    def create_order(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not items or len(items) == 0:
            raise ValueError("Cart items cannot be empty")

        result = self.db.create_order(items)
        return result