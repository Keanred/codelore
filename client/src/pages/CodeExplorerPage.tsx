import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CodeViewer } from '../components/CodeViewer';
import { FileTree } from '../components/FileTree';
import { Icon } from '../components/Icon';
import { MemoryPanel } from '../components/MemoryPanel';
import { SideNav } from '../components/SideNav';

export const CodeExplorerPage = () => {
  return (
    <>
      <SideNav />

      {/* Custom header — breadcrumb + repo actions */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 256,
          height: 64,
          zIndex: 50,
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
        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: '#94a3b8',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#a3a6ff' },
            }}
          >
            Projects
          </Typography>
          <Icon name="chevron_right" style={{ fontSize: 14, color: '#94a3b8' }} />
          <Typography sx={{ fontSize: '0.875rem', color: '#fff', fontWeight: 500 }}>core-engine-v2</Typography>
          <Box
            sx={{
              ml: 1,
              bgcolor: 'rgba(105,246,184,0.1)',
              color: '#69f6b8',
              fontSize: '0.625rem',
              px: 1,
              py: 0.25,
              borderRadius: '4px',
              border: '1px solid rgba(105,246,184,0.2)',
            }}
          >
            main
          </Box>
        </Box>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="button"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: '8px',
              bgcolor: '#141f38',
              border: '1px solid rgba(64,72,93,0.3)',
              fontSize: '0.875rem',
              color: '#a3aac4',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
              '&:hover': { borderColor: 'rgba(163,166,255,0.5)', color: '#dee5ff' },
            }}
          >
            <Icon name="sync" filled style={{ fontSize: 16, color: '#69f6b8' }} />
            <span>Synced</span>
          </Box>

          <Box sx={{ width: 1, height: 24, bgcolor: 'rgba(64,72,93,0.3)', mx: 0.5 }} />

          {(['notifications', 'account_circle'] as const).map((icon) => (
            <Box
              key={icon}
              component="button"
              sx={{
                p: 1,
                color: '#94a3b8',
                bgcolor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: '#818cf8' },
              }}
            >
              <Icon name={icon} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* 3-column layout — fills remaining viewport */}
      <Box
        component="main"
        sx={{
          ml: '256px',
          pt: '64px',
          height: '100vh',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <FileTree />
        <CodeViewer />
        <MemoryPanel />
      </Box>
    </>
  );
};
