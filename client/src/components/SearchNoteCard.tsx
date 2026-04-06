import type { NoteResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface SearchNoteCardProps {
  note: NoteResponse & { filePath: string };
}

export const SearchNoteCard = ({ note }: SearchNoteCardProps) => {
  const filename = note.filePath.split('/').pop() ?? note.filePath;
  const dateLabel = new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Box
      sx={{
        bgcolor: '#141f38',
        border: '1px solid rgba(64,72,93,0.1)',
        p: 2.5,
        borderRadius: '12px',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.3)' },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: '#dee5ff',
          mb: 1.5,
          fontSize: '0.9375rem',
        }}
      >
        {filename}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.875rem',
          color: '#a3aac4',
          lineHeight: 1.6,
          mb: 2,
          fontStyle: 'italic',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        "{note.content}"
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(64,72,93,0.1)',
          pt: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: 'rgba(255,157,209,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="sticky_note_2" filled style={{ fontSize: 12, color: '#ff9dd1' }} />
          </Box>
          <Typography
            sx={{
              fontSize: '0.625rem',
              fontFamily: 'monospace',
              color: '#a3aac4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {note.filePath}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.625rem', fontFamily: 'monospace', color: '#40485d', flexShrink: 0, ml: 1 }}>
          {dateLabel}
        </Typography>
      </Box>
    </Box>
  );
};
