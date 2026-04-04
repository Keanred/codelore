import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

interface CommitCardProps {
  hash: string;
  message: React.ReactNode;
  author: string;
  handle: string;
  avatar: string;
  time: string;
}

export const CommitCard = ({ hash, message, author, handle, avatar, time }: CommitCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      p: 3,
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack direction="row" alignItems="flex-start" gap={2}>
      <Box
        sx={{
          px: 1,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: '#1f2b49',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          color: '#a3a6ff',
          fontWeight: 700,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {hash}
      </Box>
      <Box flex={1}>
        <Typography sx={{ fontSize: '0.9rem', color: '#dee5ff', fontWeight: 500, mb: 1.5 }}>{message}</Typography>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box
            component="img"
            src={avatar}
            alt={`${author} avatar`}
            sx={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#dee5ff' }}>{author}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
            {handle}
          </Typography>
          <Typography
            sx={{ ml: 'auto', fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {time}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
);
