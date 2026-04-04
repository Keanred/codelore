import Typography from '@mui/material/Typography';
import React from 'react';

export const CodeLine = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.813rem', color: '#a3aac4', lineHeight: 1.75 }}
  >
    {children}
  </Typography>
);
