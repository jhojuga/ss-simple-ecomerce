import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Alert, Card, CardContent } from '@mui/material';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ textAlign: 'center' }}>
        <CardContent sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, color: '#4caf50', fontWeight: 'bold' }}>
            ✅
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            ¡Compra Confirmada!
          </Typography>

          <Alert severity="info" sx={{ my: 3 }}>
            <Typography variant="body1">
              Tu compra ha sido procesada exitosamente en nuestra plataforma.
            </Typography>
          </Alert>

          <Box sx={{ my: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Número de Orden
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
              #{id}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ my: 3, color: 'text.secondary' }}>
            Te hemos enviado un email de confirmación. Por favor, revisa tu bandeja de entrada
            (incluyendo spam) para la confirmación oficial de tu pedido.
          </Typography>

          <Typography variant="body2" sx={{ my: 3, color: 'text.secondary' }}>
            <strong>Próximos pasos:</strong>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Recibirás actualizaciones de envío por email</li>
              <li>Guarda el número de orden para futuras referencias</li>
              <li>Contacta a soporte si tienes alguna pregunta</li>
            </ul>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              Volver al Catálogo
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
