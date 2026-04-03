import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

// ─── Icon helper ──────────────────────────────────────────────────────────────

export const Icon = ({ name }: { name: string }) => (
  <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>
    {name}
  </span>
);

// ─── Constants ────────────────────────────────────────────────────────────────

// eslint-disable-next-line max-len
const AVATAR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_7xMyjf7YF-CKAnbLVC0il2Mya5W0BNnGR9ophRRHiLh6CQKinUh2WoMQt6-RvestoAiooMyO22yXXl1YBD_v8vcV34hRQAfrrvyG0DqhFj4RNzjGpAIJcCikVKo9fz80Gvk7RqRS0r_dqICvlZlVYf1jgXu5gW6GoXJEHBYzyOhpfqDdO4P8sC2T4vg7zDkyw0cQ9swlzuQoeworTe_9YxNSbYUCMaAjzDiBwdRfs7IrQCjEO3DfO1bEJiTC7QCJ-xIPtw4CqKc';

const sideNavItems = [
  { icon: 'folder_open', label: 'Explorer' },
  { icon: 'search', label: 'Search' },
  { icon: 'account_tree', label: 'Source Control' },
  { icon: 'play_arrow', label: 'Run & Debug' },
  { icon: 'extension', label: 'Extensions' },
];

const bottomNavItems = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'account_circle', label: 'Accounts' },
];

const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go'];

// ─── SideNavBar ───────────────────────────────────────────────────────────────

interface SideNavBarProps {
  active: string;
}

const SideNavBar = ({ active }: SideNavBarProps) => (
  <Box
    component="aside"
    sx={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: 256,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(99,102,241,0.15)',
      bgcolor: 'rgba(2,6,23,0.6)',
      backdropFilter: 'blur(20px)',
      boxShadow: '40px 0 40px -20px rgba(0,0,0,0.5)',
      zIndex: 40,
    }}
  >
    <Box sx={{ p: 3 }}>
      {/* Brand */}
      <Stack direction="row" alignItems="center" gap={1.5} mb={4}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '4px',
            bgcolor: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#060e20',
          }}
        >
          <Icon name="terminal" />
        </Box>
        <Typography
          sx={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: '#818CF8',
            fontSize: '1.1rem',
          }}
        >
          Codelore
        </Typography>
      </Stack>

      {/* New Project */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<Icon name="add" />}
        sx={{
          mb: 4,
          bgcolor: '#4F46E5',
          '&:hover': { bgcolor: '#4338CA' },
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          borderRadius: '8px',
          textTransform: 'none',
          py: 1.25,
        }}
      >
        New Project
      </Button>

      {/* Nav items */}
      <Stack gap={0.5}>
        {sideNavItems.map(({ icon, label }) => {
          const isActive = label === active;
          return (
            <Box
              key={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.25,
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#818CF8' : '#94A3B8',
                bgcolor: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                boxShadow: isActive ? '0 0 15px rgba(79,70,229,0.2)' : 'none',
                '&:hover': isActive ? {} : { color: '#E2E8F0', bgcolor: 'rgba(30,41,59,0.5)' },
                transition: 'all 0.2s',
              }}
            >
              <Box sx={{ fontSize: 20 }}>
                <Icon name={icon} />
              </Box>
              <span>{label}</span>
            </Box>
          );
        })}
      </Stack>
    </Box>

    {/* Bottom section */}
    <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid rgba(99,102,241,0.1)' }}>
      <Stack gap={0.5} mb={3}>
        {bottomNavItems.map(({ icon, label }) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1,
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#94A3B8',
              fontSize: '0.85rem',
              fontFamily: "'Space Grotesk', sans-serif",
              '&:hover': { color: '#E2E8F0', bgcolor: 'rgba(30,41,59,0.5)' },
              transition: 'all 0.2s',
            }}
          >
            <Box sx={{ fontSize: 18 }}>
              <Icon name={icon} />
            </Box>
            <span>{label}</span>
          </Box>
        ))}
      </Stack>

      {/* User info */}
      <Stack direction="row" alignItems="center" gap={1.5} px={2}>
        <Box
          component="img"
          src={AVATAR_SRC}
          alt="Admin User avatar"
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px solid rgba(99,102,241,0.3)',
            objectFit: 'cover',
          }}
        />
        <Stack>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#dee5ff' }}>Admin User</Typography>
          <Typography sx={{ fontSize: '0.6rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            v1.0.4
          </Typography>
        </Stack>
      </Stack>
    </Box>
  </Box>
);

// ─── TopNavBar ────────────────────────────────────────────────────────────────

interface TopNavBarProps {
  active: string;
}

const TopNavBar = ({ active }: TopNavBarProps) => (
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

// ─── AppLayout ────────────────────────────────────────────────────────────────

interface AppLayoutProps {
  sidebarActive?: string;
  topNavActive?: string;
  children: React.ReactNode;
}

export const AppLayout = ({ sidebarActive = 'Explorer', topNavActive = 'File', children }: AppLayoutProps) => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#060e20', overflow: 'hidden' }}>
    <SideNavBar active={sidebarActive} />
    <Box
      component="main"
      sx={{
        flex: 1,
        ml: '256px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: '#060e20',
      }}
    >
      <TopNavBar active={topNavActive} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>{children}</Box>
    </Box>
  </Box>
);
