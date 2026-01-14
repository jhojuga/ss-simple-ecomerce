import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAdjustedProducts } from '../hooks/useAdjustedProducts';
import { ProductCard } from '../components/ProductCard';
import { HeroSection } from '../components/HeroSection';

export const Home: React.FC = () => {
  const { products: fetchedProducts, loading, error } = useProducts();
  const { items: cartItems, addItem } = useCart();
  const products = useAdjustedProducts({ fetchedProducts, cartItems });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  const handleAddToCart = (productId: number) => {
    const originalProduct = fetchedProducts.find((p) => p.id === productId);
    const cartItem = cartItems.find((item) => item.id === productId);
    const availableStock = (originalProduct?.stock || 0) - (cartItem?.quantity || 0);

    if (!originalProduct) {
      setSnackbar({
        open: true,
        message: 'Producto no encontrado',
      });
      return;
    }

    if (availableStock <= 0) {
      setSnackbar({
        open: true,
        message: 'Producto sin stock disponible',
      });
      return;
    }

    addItem(originalProduct);
    setSnackbar({
      open: true,
      message: `${originalProduct.name} agregado al carrito`,
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroSection />

      {/* Products Grid */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Catálogo de Productos
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Container>
  );
};
