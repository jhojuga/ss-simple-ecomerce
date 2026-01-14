import React from 'react';
import { Box, Typography, Chip, Container } from '@mui/material';
import { theme } from '../theme';

export const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        mb: 6,
        textAlign: 'center',
        background: theme.colors.primary.gradient,
        color: 'white',
        py: 6,
        borderRadius: theme.borderRadius.lg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage:
            'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"%3E%3Cpath d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="white"/%3E%3C/svg%3E)',
          backgroundRepeat: 'repeat-x',
        }}
      />
      <Container>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            🎮 VideoGame Shop
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.95 }}>
            Descubre los mejores títulos para PS5, Xbox y Nintendo Switch
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(theme.colors.category).map(([platform, color]) => (
              <Chip
                key={platform}
                label={`🎮 ${platform}`}
                sx={{
                  background: color,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '20px 10px',
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};