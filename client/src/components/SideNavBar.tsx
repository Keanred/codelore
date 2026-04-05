import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link, useRouterState } from '@tanstack/react-router';
import { CodeloreLogo } from './CodeloreLogo';
import { Icon } from './Icon';

const AVATAR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDxwAptIizXKcwsN5iYmZuHcSKGOCSbRIFstJWX0ZhLfYc8LWORzNmbkDV-YBwFQBDA_pcWZC5nM6dOm8YsgInBbn4wll0tdg8kYdvmCXD8lU7P2miDTSZuzhMgGWTSusrA-X3gZ4b57WuEyQ3DSQXj0O8aqwx1rLcd1fwIhhhTr2GCCoiM8gLgGw5279u1aumkOpWM15wqSaUUQf7HIi9RllHiHAUOoOyfyLQlQE2K1rAdWILudhQ2CHrHDgoCNFDqbc7KeGO2jYI'; // eslint-disable-line max-len

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', to: '/' },
  { icon: 'folder_open', label: 'Repositories', to: null },
  { icon: 'search', label: 'Search', to: '/search' },
  { icon: 'code', label: 'Code Explorer', to: '/repository-explorer' },
  { icon: 'cloud_done', label: 'Cloud Sync', to: null },
  { icon: 'settings', label: 'Settings', to: null },
];

const footerLinks = [
  { icon: 'menu_book', label: 'Docs' },
  { icon: 'help_outline', label: 'Help' },
];

interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  to: string | null;
}

function NavItem({ icon, label, to, isActive }: NavItemProps) {
  const sx = [
    {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 2,
      py: 1.5,
      fontSize: '0.875rem',
      textDecoration: 'none',
      transition: 'color 0.2s, background 0.2s',
    },
    isActive
      ? { fontWeight: 700, color: '#a3a6ff', bgcolor: 'rgba(163,166,255,0.1)', borderRight: '2px solid #a3a6ff' }
      : { fontWeight: 400, color: '#94a3b8', bgcolor: 'transparent', borderRight: '2px solid transparent' },
    to !== null
      ? { cursor: 'pointer', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }
      : { cursor: 'default' },
  ];
  const content = (
    <>
      <Box sx={{ fontSize: 20, display: 'flex' }}>
        <Icon name={icon} />
      </Box>
      <span>{label}</span>
    </>
  );
  if (to !== null) {
    return (
      <Box component={Link} to={to} sx={sx}>
        {content}
      </Box>
    );
  }
  return <Box sx={sx}>{content}</Box>;
}

export const SideNavBar = () => {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
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
        borderRight: '1px solid rgba(163,166,255,0.15)',
        bgcolor: '#060e20',
        zIndex: 50,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Brand */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <CodeloreLogo />
          <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.05em',
            color: '#fff',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
            Codelore
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: '0.625rem',
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            mt: 0.5,
          }}
        >
          v1.2.4
        </Typography>
      </Box>

      {/* Nav + optional workspace tree */}
      <Box component="nav" sx={{ flex: 1, overflowY: 'auto', px: 2, mt: 1, pb: 2 }}>
        <Stack sx={{ gap: 0.5 }}>
          {navItems.map(({ icon, label, to }) => {
            const isActive = to !== null && (to === '/' ? pathname === '/' : pathname.startsWith(to));
            return <NavItem key={label} icon={icon} label={label} to={to} isActive={isActive} />;
          })}
        </Stack>

        {pathname === '/repository-explorer' && (
          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontSize: '0.625rem',
                fontWeight: 700,
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                mb: 2,
              }}
            >
              Codelore Workspace
            </Typography>
            <Stack gap={0.5} sx={{ fontSize: '0.875rem' }}>
              {/* src/ */}
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Box sx={{ fontSize: 14, color: '#475569', display: 'flex' }}>
                  <Icon name="keyboard_arrow_down" />
                </Box>
                <Box sx={{ fontSize: 18, color: '#818cf8', display: 'flex' }}>
                  <Icon name="folder" />
                </Box>
                <Typography sx={{ fontSize: '0.875rem' }}>src</Typography>
              </Stack>

              <Box sx={{ pl: 2 }}>
                {/* components/ */}
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  <Box sx={{ fontSize: 14, color: '#475569', display: 'flex' }}>
                    <Icon name="keyboard_arrow_down" />
                  </Box>
                  <Box sx={{ fontSize: 18, color: '#818cf8', display: 'flex' }}>
                    <Icon name="folder" />
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem' }}>components</Typography>
                </Stack>

                <Box sx={{ pl: 2 }}>
                  {/* AuthModule.ts - active */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: '0 4px 4px 0',
                      borderLeft: '2px solid #a3a6ff',
                      bgcolor: 'rgba(99,102,241,0.1)',
                      color: '#a3a6ff',
                      cursor: 'pointer',
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box sx={{ fontSize: 18, display: 'flex' }}>
                        <Icon name="description" />
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem' }}>AuthModule.ts</Typography>
                    </Stack>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#69f6b8', flexShrink: 0 }} />
                  </Stack>
                  {/* TokenProvider.tsx */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                    }}
                  >
                    <Box sx={{ fontSize: 18, display: 'flex' }}>
                      <Icon name="description" />
                    </Box>
                    <Typography sx={{ fontSize: '0.875rem' }}>TokenProvider.tsx</Typography>
                  </Stack>
                </Box>

                {/* App.tsx */}
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: '4px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  <Box sx={{ fontSize: 18, display: 'flex' }}>
                    <Icon name="javascript" />
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem' }}>App.tsx</Typography>
                </Stack>
              </Box>

              {/* styles/ */}
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Box sx={{ fontSize: 18, color: '#818cf8', display: 'flex' }}>
                  <Icon name="folder" />
                </Box>
                <Typography sx={{ fontSize: '0.875rem' }}>styles</Typography>
              </Stack>

              {/* package.json */}
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Box sx={{ fontSize: 18, color: '#fb923c', display: 'flex' }}>
                  <Icon name="terminal" />
                </Box>
                <Typography sx={{ fontSize: '0.875rem' }}>package.json</Typography>
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>

      {/* Deploy Now button */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Box
          component="button"
          sx={{
            width: '100%',
            py: 1.5,
            background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
            color: '#000',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.875rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(163,166,255,0.2)',
            transition: 'transform 0.1s',
            '&:hover': { transform: 'scale(0.98)' },
          }}
        >
          Deploy Now
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ px: 2, py: 3, borderTop: '1px solid rgba(163,166,255,0.1)' }}>
        <Stack gap={2} sx={{ mb: 2 }}>
          {footerLinks.map(({ icon, label }) => (
            <Box
              key={label}
              component="a"
              href="#"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.75rem',
                transition: 'color 0.2s',
                '&:hover': { color: '#fff' },
              }}
            >
              <Box sx={{ fontSize: 18, display: 'flex' }}>
                <Icon name={icon} />
              </Box>
              <span>{label}</span>
            </Box>
          ))}
        </Stack>

        {/* User info */}
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ px: 2, mt: 2 }}>
          <Box
            component="img"
            src={AVATAR_SRC}
            alt="User profile"
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '1px solid rgba(163,166,255,0.3)',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <Box sx={{ overflow: 'hidden' }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Alex Thorne
            </Typography>
            <Typography
              sx={{
                fontSize: '0.625rem',
                color: '#475569',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Pro Architect
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
