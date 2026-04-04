import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Icon } from './Icon';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  footer: React.ReactNode;
}

export const StatCard = ({ label, value, icon, footer }: StatCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      p: 3,
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
      <Typography
        sx={{
          color: '#64748B',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </Typography>
      <Box sx={{ color: '#9396ff', fontSize: 22 }}>
        <Icon name={icon} />
      </Box>
    </Stack>
    <Typography
      sx={{ fontSize: '1.875rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#dee5ff' }}
    >
      {value}
    </Typography>
    <Box sx={{ mt: 1 }}>{footer}</Box>
  </Box>
);
