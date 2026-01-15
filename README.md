# SS Simple Ecommerce - Videogame Shop

Una aplicación de ecommerce moderna para una tienda de videojuegos, con frontend en React + TypeScript y dual backend (Node.js/Express y FastAPI/Python).

![Uploading Recording 2026-01-14 at 22.59.22.gif…]()

## � Estructura del Proyecto

```
ss-simple-ecomerce/
├── .gitignore
├── arquitectura.html
├── CAMBIOS_IMPLEMENTADOS.md
├── ESTRUCTURA_BD_Y_OPENAPI.md
├── Prueba Técnica React + Python — Mini Ecommerce.pdf
├── README.md
├── RESUMEN_CAMBIOS.md
├── RUTAS_CENTRALIZADAS.md
│
├── backend/                    # Recursos y backends compartidos
│   ├── CONFIGURACION.md
│   ├── ecommerce.db           # BD SQLite (accesible por ambos backends)
│   ├── INICIO_RAPIDO.md
│   ├── openapi.yaml           # API Documentation (compartida)
│   │
│   ├── nodejs/                # Express.js backend
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── src/
│   │       ├── db.js          # Accede a ../ecommerce.db
│   │       └── index.js       # Accede a ../openapi.yaml
│   │
│   └── python/                # FastAPI backend
│       ├── .gitignore
│       ├── db.py              # Accede a ../ecommerce.db
│       ├── main.py            # Accede a ../openapi.yaml
│       ├── requirements.txt
│       ├── run.ps1
│       └── run.sh
│
└── frontend/                   # React + TypeScript + Vite
    ├── .env.dev-nodejs        # Variables para Node.js backend (puerto 3000)
    ├── .env.dev-python        # Variables para FastAPI backend (puerto 8000)
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    │
    ├── public/
    │   ├── vite.svg
    │   └── images/
    │       ├── call_of_duty.jpg
    │       ├── final_fantasy_vii.jpg
    │       ├── god_of_war_ragnarok.jpg
    │       ├── halo_4.jpg
    │       ├── mario_kart_8_deluxe.jpg
    │       ├── mortal_kombat.jpg
    │       ├── resident_evil.jpg
    │       ├── street_fighter_4.jpg
    │       └── super_mario_odyseey.jpg
    │
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        │
        ├── assets/
        │   └── react.svg
        │
        ├── context/
        │   └── CartContext.tsx
        │
        ├── hooks/
        │   ├── useCart.ts
        │   └── useProducts.ts
        │
        ├── pages/
        │   ├── CartPage.tsx
        │   ├── Home.tsx
        │   └── OrderConfirmation.tsx
        │
        └── services/
            └── api.ts
```

## 🛠️ Stack Tecnológico

**Frontend:** React ^19.2.0 • TypeScript ^5.9.3 • Vite ^7.2.4 • Tailwind CSS ^3.4.1 • Material-UI ^5.14.19
**Backend (Node.js):** Express ^5.2.1 • better-sqlite3 ^12.6.0 • swagger-ui-express ^5.0.1
**Backend (FastAPI):** FastAPI >=0.100.0 • Pydantic >=2.0.0 • PyYAML >=6.0
**Base de Datos:** SQLite (compartida entre backends)

## 🚀 Instalación y Ejecución

### ⚡ Quick Start (Recomendado)

Abre **3 terminales** para desarrollo local:

```bash
# Terminal 1: Backend Node.js
cd backend/nodejs
npm install
npm run dev              # http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev:nodejs       # http://localhost:5173

# (Opcionalmente) Backend FastAPI en lugar de Node.js:
# cd backend/python && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python main.py
```

### Instalación Detallada

#### Backend Node.js + Express
```bash
cd backend/nodejs
npm install
npm run dev              # Inicia en http://localhost:3000
                         # API: http://localhost:3000/api/products
                         # Docs: http://localhost:3000/api-docs
```

#### Backend FastAPI + Python
```bash
cd backend/python
python -m venv venv
source venv/bin/activate                # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py                          # Inicia en http://localhost:8000
                                        # API: http://localhost:8000/api/products
                                        # Docs: http://localhost:8000/docs
```

#### Frontend React + Vite

**Requisito:** Uno de los backends debe estar ejecutándose primero.

```bash
cd frontend
npm install

# Con Node.js backend (puerto 3000)
npm run dev:nodejs                      # http://localhost:5173

# O con FastAPI backend (puerto 8000)
npm run dev:python                      # http://localhost:5173

# Build para producción
npm run build
```

**Sistema de Proxy:** Los scripts `dev:nodejs` y `dev:python` usan archivos `.env` para configurar automáticamente el puerto del backend proxy sin CORS.

## ✨ Características

✅ Catálogo de 9 videojuegos (PS5, Xbox, Switch)  
✅ Carrito de compras con localStorage  
✅ Stock dinámico en tiempo real  
✅ Checkout y confirmación de orden  
✅ Dual backend (Node.js + FastAPI) intercambiable
✅ Base de datos compartida  
✅ OpenAPI documentation  
✅ Validaciones en frontend y backend  

## 📡 API Endpoints

```
GET /api/products          → Lista de productos
POST /api/orders          → Crear orden
GET /api-docs             → Documentación (Node.js)
GET /docs                 → Documentación (FastAPI)
```

## 🗂️ Rutas Frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Catálogo de productos |
| `/carrito` | Carrito de compras |
| `/orden/:id` | Confirmación de orden |

## 🏗️ Arquitectura

Implementa principios SOLID, YAGNI, DRY y Clean Code:
- **Separación de responsabilidades:** CartContext, useProducts, useCart en módulos independientes
- **Endpoints mínimos:** Solo lo esencial (GET products, POST orders)
- **BD compartida:** Mismo SQLite para ambos backends
- **Type-safe:** TypeScript en todo el proyecto
- **Proxy Vite:** El frontend usa proxy nativo para evitar CORS

### Sistema de Proxy & CORS

El frontend está configurado con Vite proxy que redirige todas las requests a `/api/*` al backend:

```
Frontend (puerto 5173) → Vite Proxy → Backend
    /api/products    →    localhost:3000/api/products
    /api/orders      →    localhost:3000/api/orders
```

Los scripts de desarrollo usan archivos `.env`:
- `.env.dev-nodejs` → `VITE_BACKEND_PORT=3000` (Node.js)
- `.env.dev-python` → `VITE_BACKEND_PORT=8000` (FastAPI)

**Cambiar Backend sin Reinstalar:**
```bash
# Detén el servidor Vite (Ctrl+C) y ejecuta:
npm run dev:nodejs    # Cambia a Node.js (puerto 3000)
npm run dev:python    # Cambia a FastAPI (puerto 8000)
```

## 🛠️ Scripts Disponibles

### Frontend (cd frontend)
```bash
npm run dev:nodejs    # Proxy a Node.js/Express (puerto 3000) + HMR
npm run dev:python    # Proxy a FastAPI/Python (puerto 8000) + HMR
npm run dev           # Alias de dev:nodejs
npm run build         # Build optimizado para producción (dist/)
npm run lint          # Ejecutar ESLint
npm run preview       # Vista previa del build
```

### Backend Node.js (cd backend/nodejs)
```bash
npm install           # Instalar dependencias
npm run dev           # Iniciar servidor en puerto 3000 con nodemon
```

### Backend Python (cd backend/python)
```bash
python -m venv venv                  # Crear virtual environment
source venv/bin/activate             # Activar (Windows: venv\Scripts\activate)
pip install -r requirements.txt      # Instalar dependencias
python main.py                       # Iniciar servidor en puerto 8000
```

## 📦 Stack Tecnológico Detallado

### Frontend
- **React** ^19.2.0 - UI library
- **TypeScript** ^5.9.3 - Type safety
- **Vite** ^7.2.4 - Build tool (HMR, esbuild)
- **Tailwind CSS** ^3.4.1 - Utility-first CSS
- **Material-UI** ^5.14.19 - React components
- **Axios** ^1.6.5 - HTTP client
- **React Router** ^6.21.2 - Client-side routing
- **ESLint** ^9.39.1 - Code linting

### Backend Node.js
- **Express** ^5.2.1 - Web framework
- **better-sqlite3** ^12.6.0 - SQLite driver (sync)
- **swagger-ui-express** ^5.0.1 - API docs
- **yamljs** ^0.3.0 - YAML parser
- **cors** ^2.8.5 - CORS middleware

### Backend FastAPI
- **FastAPI** >=0.100.0 - Web framework (async)
- **Pydantic** >=2.0.0 - Data validation
- **PyYAML** >=6.0 - YAML parser
- **uvicorn** >=0.24.0 - ASGI server

### Base de Datos
- **SQLite** - Archivo compartido en `backend/ecommerce.db`
  - Accedido por ambos backends (Node.js y Python)
  - Transacciones explícitas
  - Integridad referencial

## 📁 Estructura Completa de Carpetas

```
ss-simple-ecomerce/
├── README.md                          # Este archivo
├── arquitectura.html                  # Diagrama visual de arquitectura
├── CAMBIOS_IMPLEMENTADOS.md           # Historial de cambios
├── ESTRUCTURA_BD_Y_OPENAPI.md         # Especificación de BD y API
├── RESUMEN_CAMBIOS.md                 # Resumen ejecutivo
├── RUTAS_CENTRALIZADAS.md             # Documentación de rutas
│
├── backend/
│   ├── ecommerce.db                   # Base de datos SQLite compartida
│   ├── openapi.yaml                   # Especificación de API (compartida)
│   │
│   ├── nodejs/
│   │   ├── package.json               # Dependencias Node.js
│   │   ├── src/
│   │   │   ├── index.js               # Servidor Express
│   │   │   └── db.js                  # Capa de datos SQLite
│   │   └── node_modules/              # Dependencias instaladas
│   │
│   └── python/
│       ├── requirements.txt           # Dependencias Python
│       ├── main.py                    # Servidor FastAPI
│       ├── db.py                      # Capa de datos SQLite
│       ├── run.ps1                    # Script de inicio (Windows)
│       ├── run.sh                     # Script de inicio (Unix)
│       └── venv/                      # Virtual environment
│
└── frontend/
    ├── .env.dev-nodejs                # Config proxy para Node.js
    ├── .env.dev-python                # Config proxy para FastAPI
    ├── package.json                   # Dependencias React
    ├── vite.config.ts                 # Configuración Vite + proxy
    ├── tsconfig.json                  # Configuración TypeScript
    ├── index.html                     # HTML raíz
    │
    ├── src/
    │   ├── main.tsx                   # Punto de entrada
    │   ├── App.tsx                    # Componente raíz
    │   ├── App.css                    # Estilos globales
    │   ├── index.css                  # Reset y base styles
    │   │
    │   ├── context/
    │   │   └── CartContext.tsx        # Estado global del carrito
    │   │
    │   ├── hooks/
    │   │   ├── useCart.ts             # Hook para carrito
    │   │   └── useProducts.ts         # Hook para productos
    │   │
    │   ├── pages/
    │   │   ├── Home.tsx               # Catálogo de productos
    │   │   ├── CartPage.tsx           # Carrito de compras
    │   │   └── OrderConfirmation.tsx  # Confirmación de orden
    │   │
    │   ├── services/
    │   │   └── api.ts                 # Cliente HTTP (Axios)
    │   │
    │   └── assets/
    │       └── react.svg              # Logo React
    │
    ├── public/
    │   └── images/
    │       ├── call_of_duty.jpg
    │       ├── final_fantasy_vii.jpg
    │       ├── god_of_war_ragnarok.jpg
    │       ├── halo_4.jpg
    │       ├── mario_kart_8_deluxe.jpg
    │       ├── mortal_kombat.jpg
    │       ├── resident_evil.jpg
    │       ├── street_fighter_4.jpg
    │       └── super_mario_odyssey.jpg
    │
    └── node_modules/                  # Dependencias instaladas
```

## 📡 API Endpoints

### GET /api/products
Obtiene la lista de todos los productos.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "God of War Ragnarök",
    "description": "Epic action-adventure",
    "price": 69.99,
    "image_url": "/images/god_of_war_ragnarok.jpg",
    "category": "PS5",
    "stock": 8
  }
]
```

### POST /api/orders
Crea una nueva orden con los items del carrito.

**Request:**
```json
{
  "items": [
    {"id": 1, "quantity": 2},
    {"id": 3, "quantity": 1}
  ]
}
```

**Response (200):**
```json
{
  "order_id": 1,
  "items": [
    {
      "id": 1,
      "name": "God of War Ragnarök",
      "price": 69.99,
      "quantity": 2,
      "subtotal": 139.98
    }
  ],
  "total": 139.98
}
```

**Errors:**
- `400` - Items vacío o producto no existe
- `500` - Error del servidor

**Documentación Interactiva:**
- Node.js: `http://localhost:3000/api-docs`
- FastAPI: `http://localhost:8000/docs`

## 📝 Desarrollo

Para agregar productos:
1. Editar `backend/nodejs/src/db.js` y `backend/python/db.py` (ambos)
2. Agregar imagen en `frontend/public/images/`
3. Los cambios se sincronizan automáticamente en ambos backends

## 🐛 Troubleshooting

### ⚡ Problema: "Cannot connect to backend" o página en blanco

**Causa más común:** El backend no está ejecutándose o está en el puerto equivocado.

**Solución:**
```bash
# 1. Verifica que el backend esté corriendo
# Terminal 1: Backend
cd backend/nodejs
npm install
npm run dev                    # Debe decir "Listening on port 3000"

# 2. Verifica que usas el script correcto en el frontend
# Terminal 2: Frontend
cd frontend
npm install
npm run dev:nodejs             # Debe corresponder al puerto del backend

# 3. Abre en navegador: http://localhost:5173
```

Si aún no funciona, revisa la consola del navegador (F12) para ver errores de red.

### ⚡ Problema: Scripts no funcionan en Windows

**Causa:** Sintaxis de variables de entorno de Unix no funciona en PowerShell.

**Solución (ya implementada):** Los scripts usan Vite environment modes:
```bash
npm run dev:nodejs    # ✓ Funciona en Windows
npm run dev:python    # ✓ Funciona en Windows
```

No uses `npm run dev` con variables de entorno en línea en Windows.

### ⚡ Problema: "Port X already in use"

```bash
# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Linux/Mac:
lsof -ti :5173 | xargs kill -9
lsof -ti :3000 | xargs kill -9
lsof -ti :8000 | xargs kill -9
```

### ⚡ Problema: "Module not found" en frontend

```bash
# Limpia e instala de nuevo
rm -rf frontend/node_modules package-lock.json
cd frontend
npm install
npm run dev:nodejs
```

### ⚡ Problema: "Database locked" o errores de SQLite

```bash
# Cierra TODOS los backends (solo uno debe estar activo)
# ❌ NO hacer: Node.js + FastAPI simultáneamente
# ✓ OK: Node.js O FastAPI (uno a la vez)

# Si persiste, elimina la BD:
rm backend/ecommerce.db
# Se recrea automáticamente al iniciar Node.js
```

### ⚡ Problema: "CORS error" aunque uses proxy

**Causa:** Estás usando el script incorrecto para el backend activo.

**Solución:**
```bash
# Si backend está en puerto 3000:
npm run dev:nodejs

# Si backend está en puerto 8000:
npm run dev:python
```

### ⚡ Problema: Python "No module named 'fastapi'"

```bash
cd backend/python
python -m venv venv
source venv/bin/activate              # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### ⚡ Problema: Node.js "Cannot find module 'express'"

```bash
cd backend/nodejs
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### ✓ Verificar configuración compartida

```bash
# Verifica que existan los archivos compartidos:
ls -la backend/
# Debe mostrar:
# - ecommerce.db            ✓
# - openapi.yaml            ✓
# - nodejs/                 ✓
# - python/                 ✓
```

## 🔗 URLs Importantes

| Componente | URL | Descripción |
|---|---|---|
| **Frontend** | http://localhost:5173 | Aplicación React |
| **Node.js API** | http://localhost:3000/api/ | Endpoints Express |
| **Node.js Docs** | http://localhost:3000/api-docs | Swagger UI |
| **FastAPI API** | http://localhost:8000/api/ | Endpoints FastAPI |
| **FastAPI Docs** | http://localhost:8000/docs | Interactive API docs |
| **FastAPI Schema** | http://localhost:8000/openapi.json | OpenAPI schema |

## 📚 Documentación Adicional

- [Cambios Implementados](./CAMBIOS_IMPLEMENTADOS.md) - Historial detallado de cambios
- [Estructura BD y OpenAPI](./ESTRUCTURA_BD_Y_OPENAPI.md) - Especificación técnica de BD
- [Rutas Centralizadas](./RUTAS_CENTRALIZADAS.md) - Documentación de rutas
- [Arquitectura Visual](./arquitectura.html) - Diagrama interactivo de arquitectura
- [Resumen de Cambios](./RESUMEN_CAMBIOS.md) - Overview ejecutivo

## ⚙️ Desarrollo Avanzado

### Cambiar entre backends sin perder estado

```bash
# El carrito se mantiene en localStorage
# La BD es la misma para ambos backends

# Terminal 1: Detén Node.js (Ctrl+C)
cd backend/nodejs

# Terminal 1: Inicia FastAPI
cd ../python
python main.py                  # Ahora en puerto 8000

# Terminal 2: Detén frontend (Ctrl+C)
cd frontend

# Terminal 2: Cambia a FastAPI
npm run dev:python
```

### Agregar nuevos productos (requiere cambios en AMBOS backends)

**1. Backend Node.js** - `backend/nodejs/src/db.js`
```javascript
const products = [
  ...,
  { 
    id: 10, 
    name: 'Nuevo Juego', 
    description: 'Descripción...', 
    price: 59.99, 
    image_url: '/images/new_game.jpg', 
    category: 'PS5', 
    stock: 5 
  }
];
```

**2. Backend FastAPI** - `backend/python/db.py`
```python
products = [
  ...,
  (10, 'Nuevo Juego', 'Descripción...', 59.99, '/images/new_game.jpg', 'PS5', 5)
];
```

**3. Frontend** - Agregar imagen
```bash
# Copiar/crear imagen en:
frontend/public/images/new_game.jpg
```

## 📄 Licencia

ISC
