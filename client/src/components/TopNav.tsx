import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface TopNavProps {
  title: string;
}

export const TopNav = ({ title }: TopNavProps) => {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 256,
        height: 64,
        zIndex: 40,
        bgcolor: 'rgba(6,14,32,0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.125rem',
          fontWeight: 900,
          letterSpacing: '0.1em',
          color: '#fff',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="button"
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: '#94a3b8',
            bgcolor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s',
            '&:hover': { color: '#a5b4fc' },
          }}
        >
          <Icon name="notifications" />
        </Box>
        <Box
          component="button"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pl: 1,
            pr: 2,
            py: 0.75,
            bgcolor: '#091328',
            borderRadius: '99px',
            border: '1px solid rgba(64,72,93,0.2)',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            '&:hover': { borderColor: 'rgba(99,102,241,0.3)' },
          }}
        >
          <Icon name="account_circle" style={{ color: '#a3a6ff', fontSize: 20 }} />
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: '#dee5ff' }}>Account</Typography>
        </Box>
      </Box>
    </Box>
  );
};
