import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import type { Product } from '../services/api';
import { theme } from '../theme';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const getCategoryBgColor = (category: string): string => {
    return theme.colors.category[category as keyof typeof theme.colors.category] || '#666';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Image Container */}
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={product.image_url}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#f0f0f0',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
          }}
        >
          <Chip
            label={product.category}
            sx={{
              backgroundColor: getCategoryBgColor(product.category),
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.colors.primary.main }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: product.stock > 0 ? '#4caf50' : '#f44336',
              fontWeight: 'bold',
            }}
          >
            {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          disabled={product.stock <= 0}
          onClick={() => onAddToCart(product.id)}
          sx={{
            background: product.stock > 0
              ? theme.colors.primary.gradient
              : undefined,
            color: 'white',
          }}
        >
          {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </Button>
      </CardActions>
    </Card>
  );
};