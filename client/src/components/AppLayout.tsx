import Box from '@mui/material/Box';
import React from 'react';
import { SideNavBar } from './SideNavBar';
import { TopNavBar } from './TopNavBar';

export { Icon } from './Icon';

// ─── AppLayout ────────────────────────────────────────────────────────────────

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#060e20', overflow: 'hidden' }}>
    <SideNavBar />
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
      <TopNavBar />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>{children}</Box>
    </Box>
  </Box>
);
