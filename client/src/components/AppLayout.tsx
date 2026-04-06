import Box from '@mui/material/Box';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export const AppLayout = ({ children, pageTitle }: AppLayoutProps) => {
  return (
    <>
      <SideNav />
      <TopNav title={pageTitle} />
      <Box
        component="main"
        sx={{
          ml: '256px',
          pt: '6rem',
          p: 4,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </>
  );
};
