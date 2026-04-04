import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface NoteCardProps {
  title: string;
  path: string;
  excerpt: string;
}

export const NoteCard = ({ title, path, excerpt }: NoteCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      p: 3,
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
      <Box sx={{ fontSize: 20, color: '#ff9dd1', display: 'flex' }}>
        <Icon name="sticky_note_2" />
      </Box>
      <Typography
        sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#dee5ff', fontSize: '1rem' }}
      >
        {title}
      </Typography>
    </Stack>
    <Typography sx={{ fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", mb: 1.5 }}>
      {path}
    </Typography>
    <Typography component="p" sx={{ fontSize: '0.85rem', color: '#a3aac4', fontStyle: 'italic', lineHeight: 1.7 }}>
      {excerpt}
    </Typography>
  </Box>
);
