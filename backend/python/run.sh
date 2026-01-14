#!/bin/bash
# Script para ejecutar el backend FastAPI

# Navegar a la carpeta de Python
#cd backend/python

# Crear virtual environment si no existe
if [ ! -d "venv" ]; then
    echo "Creando virtual environment..."
    python -m venv venv
fi

# Activar virtual environment
source venv/bin/activate  # Para Windows: venv\Scripts\activate

# Instalar dependencias
echo "Instalando dependencias..."
pip install -r requirements.txt

# Ejecutar FastAPI
echo "Iniciando FastAPI en http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
python main.py
