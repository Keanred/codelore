import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useRouterState } from '@tanstack/react-router';
import { Icon } from './Icon';

interface NavItem {
  label: string;
  icon: string;
  to: string | null;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', to: '/' },
  { label: 'Repositories', icon: 'source', to: '/repository-explorer' },
  { label: 'Search', icon: 'search', to: '/search' },
  { label: 'Settings', icon: 'settings', to: null },
];

interface SideNavProps {
  userName?: string;
  userPlan?: string;
}

export const SideNav = ({ userName = 'Account', userPlan = 'Free Plan' }: SideNavProps) => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isActive = (to: string | null) => {
    if (!to) return false;
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <Box
      component="aside"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 256,
        bgcolor: '#060e20',
        display: 'flex',
        flexDirection: 'column',
        py: 3,
        px: 2,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 5, px: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '4px',
            bgcolor: '#a3a6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="terminal" filled style={{ color: '#000', fontSize: 18 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: '#818cf8',
              lineHeight: 1.2,
            }}
          >
            Codelore
          </Typography>
          <Typography
            sx={{
              fontSize: '0.625rem',
              color: '#475569',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            V0.4.2
          </Typography>
        </Box>
      </Box>

      {/* Nav Items */}
      <Box component="nav" sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to);
          const itemContent = (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: '8px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textDecoration: 'none',
                ...(active
                  ? {
                      color: '#818cf8',
                      bgcolor: '#0a142d',
                      borderRight: '2px solid #6366f1',
                      boxShadow: '0 0 15px rgba(79,70,229,0.2)',
                    }
                  : {
                      color: '#64748b',
                      '&:hover': { color: '#cbd5e1', bgcolor: '#0d1b3a' },
                    }),
              }}
            >
              <Icon name={item.icon} filled={active} style={{ fontSize: 20 }} />
              <span>{item.label}</span>
            </Box>
          );

          if (item.to) {
            return (
              <Link
                key={item.label}
                to={item.to}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {itemContent}
              </Link>
            );
          }
          return <Box key={item.label}>{itemContent}</Box>;
        })}
      </Box>

      {/* User Profile */}
      <Box sx={{ pt: 3, borderTop: '1px solid rgba(64,72,93,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#192540',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="account_circle" style={{ color: '#a3a6ff', fontSize: 24 }} />
          </Box>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#dee5ff', lineHeight: 1.3 }} noWrap>
              {userName}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.3 }} noWrap>
              {userPlan}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
