import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useCart } from '../hooks/useCart';
import { submitOrder } from '../services/api';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  const handleProcessOrder = async () => {
    if (items.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderItems = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const response = await submitOrder(orderItems);

      // Order successful
      setOrderId(response.order_id);
      setDialogOpen(true);
      clearCart();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al procesar la compra');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (orderId) {
      navigate(`/orden/${orderId}`);
    }
  };

  if (items.length === 0 && !dialogOpen) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">
          El carrito está vacío. <Button onClick={() => navigate('/')}>Volver al catálogo</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Resumen del Carrito
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Precio
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Cantidad
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Subtotal
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </Button>
                    <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={item.quantity >= item.stock}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
              pb: 2,
              borderBottom: '2px solid #eee',
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#667eea' }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || items.length === 0}
            onClick={handleProcessOrder}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              mb: 2,
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Procesar Compra'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Continuar Comprando
          </Button>
        </Box>
      </Box>

      {/* Order Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          ✅ Compra Realizada Exitosamente
        </DialogTitle>
        <DialogContent sx={{ minWidth: '300px' }}>
          <Box sx={{ py: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Tu compra ha sido procesada correctamente.
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              <strong>Número de Orden:</strong> #{orderId}
            </Alert>
            <Typography variant="body2" color="text.secondary">
              Recibirás un email de confirmación en breve. Puedes revisar el estado de tu pedido
              en cualquier momento.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Ver Detalles
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
