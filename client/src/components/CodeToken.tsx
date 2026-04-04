import Box from '@mui/material/Box';

export const CodeToken = ({ text, color }: { text: string; color?: string }) => (
  <Box component="span" sx={{ color: color ?? '#a3aac4' }}>
    {text}
  </Box>
);
