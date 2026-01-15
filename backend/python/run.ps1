# Script para ejecutar el backend FastAPI en Windows

# Navegar a la carpeta de Python
#Set-Location backend/python

# Crear virtual environment si no existe
if (-not (Test-Path "venv")) {
    Write-Host "Creando virtual environment..."
    python -m venv venv
}

# Activar virtual environment
.\venv\Scripts\Activate.ps1

# Actualizar pip
Write-Host "Actualizando pip..."
python -m pip install --upgrade pip

# Instalar dependencias
Write-Host "Instalando dependencias..."
pip install -r requirements.txt

# Ejecutar FastAPI
Write-Host "Iniciando FastAPI en http://localhost:8001"
Write-Host "API Docs: http://localhost:8001/docs"
python main.py
