import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Icon } from './Icon';

interface FileResultCardProps {
  filename: string;
  ext: string;
  path: string;
  preview: React.ReactNode;
}

export const FileResultCard = ({ filename, ext, path, preview }: FileResultCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      gap={1.5}
      sx={{ px: 3, py: 2, bgcolor: '#0f1930', borderBottom: '1px solid rgba(64,72,93,0.1)' }}
    >
      <Box sx={{ fontSize: 18, color: '#818CF8', display: 'flex' }}>
        <Icon name="description" />
      </Box>
      <Typography
        sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#dee5ff' }}
      >
        {filename}
      </Typography>
      <Box
        sx={{
          px: 0.75,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: 'rgba(99,102,241,0.2)',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: '#818CF8',
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}
      >
        {ext}
      </Box>
      <Typography sx={{ ml: 'auto', fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
        {path}
      </Typography>
    </Stack>
    <Box
      sx={{
        p: 3,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.8rem',
        color: '#a3aac4',
        lineHeight: 1.8,
      }}
    >
      {preview}
    </Box>
  </Box>
);
