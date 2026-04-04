import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go'];

interface TopNavBarProps {
  active: string;
}

export const TopNavBar = ({ active }: TopNavBarProps) => (
  <Box
    component="header"
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 4,
      height: 56,
      bgcolor: '#0f172a',
      borderBottom: '1px solid rgba(99,102,241,0.1)',
    }}
  >
    <Stack direction="row" alignItems="center" gap={4}>
      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          color: '#6366F1',
          fontSize: '1.2rem',
          letterSpacing: '-0.05em',
        }}
      >
        Codelore
      </Typography>
      <Stack direction="row" gap={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {menuItems.map((item) => {
          const isActive = item === active;
          return (
            <Typography
              key={item}
              component="span"
              sx={{
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: "'Inter', sans-serif",
                px: 1,
                py: 2,
                color: isActive ? '#818CF8' : '#94A3B8',
                borderBottom: isActive ? '2px solid #6366F1' : '2px solid transparent',
                '&:hover': isActive ? {} : { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' },
                transition: 'all 0.2s',
              }}
            >
              {item}
            </Typography>
          );
        })}
      </Stack>
    </Stack>

    <Stack direction="row" alignItems="center" gap={2}>
      <Box
        sx={{
          position: 'relative',
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          bgcolor: '#141f38',
          borderRadius: '6px',
          px: 1.5,
          py: 0.5,
        }}
      >
        <Box sx={{ color: '#64748B', fontSize: 18, mr: 1, display: 'flex' }}>
          <Icon name="search" />
        </Box>
        <InputBase
          placeholder="Search knowledge base..."
          inputProps={{
            style: {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem',
              color: '#dee5ff',
              width: 240,
            },
          }}
        />
      </Box>
      <Stack direction="row" gap={0.5}>
        {[
          { icon: 'terminal', badge: false },
          { icon: 'notifications', badge: true },
          { icon: 'help_outline', badge: false },
        ].map(({ icon, badge }) => (
          <IconButton
            key={icon}
            size="small"
            sx={{
              color: '#94A3B8',
              borderRadius: '6px',
              '&:hover': { color: '#818CF8', bgcolor: 'rgba(255,255,255,0.05)' },
              position: 'relative',
              fontSize: 20,
            }}
          >
            <Icon name={icon} />
            {badge && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  bgcolor: '#ff6e84',
                  borderRadius: '50%',
                }}
              />
            )}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  </Box>
);
