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
          p: 4,
          pt: '6rem',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </>
  );
};
