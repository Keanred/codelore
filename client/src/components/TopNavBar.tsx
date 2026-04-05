import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { Icon } from './Icon';

const AVATAR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxZGhb2vbXFJscDCUeGxw7QoxLzQTkIvYeMSo0e26F7ZoKv4UwhWVx3r0ggLYDULuMLBVxLDLC9Q3o4Fa47uDC4c-n3De8Q1URoTxbGL77KxEhe6ZGXCjVHC89LnL0F9nqJgGVkSE0QFsWuXOsEC1qWIH5MMU5Ug0N_RPYQL4fYlCzE2QK_C_PDA3VIdQ1IcL8jFARo-kSJdHqZSfSx3qokTOJ5VtxvDDY5NFudskM41bX1Bgwf71M8TEBKhCJ2l_yM78zmycqOb0'; // eslint-disable-line max-len

export const TopNavBar = () => (
  <Box
    component="header"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 4,
      height: 64,
      borderBottom: '1px solid rgba(163,166,255,0.15)',
      bgcolor: 'rgba(6,14,32,0.8)',
      backdropFilter: 'blur(24px)',
      flexShrink: 0,
    }}
  >
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 12,
          color: '#475569',
          display: 'flex',
          fontSize: 18,
          zIndex: 1,
        }}
      >
        <Icon name="search" />
      </Box>
      <InputBase
        placeholder="Search resources..."
        inputProps={{
          style: {
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#dee5ff',
            paddingLeft: 40,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            width: 256,
          },
        }}
        sx={{
          bgcolor: '#141f38',
          borderRadius: '8px',
          '& .MuiInputBase-input::placeholder': { color: '#475569', opacity: 1 },
        }}
      />
    </Box>

    <Stack direction="row" alignItems="center" gap={0.5}>
      {['notifications', 'account_tree'].map((icon) => (
        <IconButton
          key={icon}
          sx={{
            color: '#94a3b8',
            transition: 'color 0.2s',
            '&:hover': { color: '#a3a6ff' },
          }}
        >
          <Box sx={{ fontSize: 20, display: 'flex' }}>
            <Icon name={icon} />
          </Box>
        </IconButton>
      ))}
      <Box sx={{ width: 1, height: 32, bgcolor: 'rgba(163,166,255,0.1)', mx: 1 }} />
      <Box
        component="img"
        src={AVATAR_SRC}
        alt="Developer Avatar"
        sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }}
      />
    </Stack>
  </Box>
);
