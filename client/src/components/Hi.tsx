import Box from '@mui/material/Box';
import React from 'react';

export const Hi = ({ children }: { children: React.ReactNode }) => (
  <Box component="mark" sx={{ bgcolor: 'rgba(163,166,255,0.2)', color: '#a3a6ff', borderRadius: '2px', px: 0.25 }}>
    {children}
  </Box>
);
