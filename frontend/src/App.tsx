import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Badge, Button, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from './pages/Home';
import { CartPage } from './pages/CartPage';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { useCart } from './hooks/useCart';

function AppContent() {
  const { items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
              <HomeIcon />
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🎮 VideoGame Shop</span>
            </Box>
          </Link>

          <Link to="/carrito" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
              <span>Carrito</span>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/orden/:id" element={<OrderConfirmation />} />
        </Routes>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          borderTop: '1px solid #eee',
        }}
      >
        <Container>
          <p style={{ color: '#666', margin: 0 }}>
            © 2024 VideoGame Shop. Todos los derechos reservados.
          </p>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
