import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface SectionHeaderProps {
  icon: string;
  title: string;
  count: number;
  shortcut: string;
}

export const SectionHeader = ({ icon, title, count, shortcut }: SectionHeaderProps) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
    <Stack direction="row" alignItems="center" gap={1.5}>
      <Box sx={{ color: '#818CF8', fontSize: 20, display: 'flex' }}>
        <Icon name={icon} />
      </Box>
      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: '#dee5ff',
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          px: 1,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: 'rgba(163,166,255,0.15)',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#a3a6ff',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {count} Found
      </Box>
    </Stack>
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: '4px',
        bgcolor: '#141f38',
        fontSize: '0.65rem',
        color: '#64748B',
        fontFamily: "'JetBrains Mono', monospace",
        border: '1px solid rgba(64,72,93,0.3)',
      }}
    >
      {shortcut}
    </Box>
  </Stack>
);
