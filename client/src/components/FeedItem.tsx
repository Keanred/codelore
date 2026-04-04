import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

interface FeedItemProps {
  hash: string;
  time: string;
  children: React.ReactNode;
  dotColor: string;
  dotShadow: string;
  dim?: boolean;
}

export const FeedItem = ({ hash, time, children, dotColor, dotShadow, dim }: FeedItemProps) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: '8px',
      '&:hover': { bgcolor: '#0f1930' },
      transition: 'background-color 0.2s',
      opacity: dim ? 0.6 : 1,
    }}
  >
    <Stack direction="row" gap={2} alignItems="flex-start">
      <Box
        sx={{
          mt: 0.75,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: dotColor,
          boxShadow: dotShadow,
          flexShrink: 0,
        }}
      />
      <Box flex={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
          <Typography
            sx={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#a3a6ff', fontWeight: 700 }}
          >
            #{hash}
          </Typography>
          <Typography sx={{ fontSize: '0.625rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
            {time}
          </Typography>
        </Stack>
        {children}
      </Box>
    </Stack>
  </Box>
);
