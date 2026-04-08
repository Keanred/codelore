import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

export interface LineNote {
  line: number;
  author: string;
  time: string;
  text: string;
}

interface LineNoteTooltipProps {
  note: LineNote;
}

export const LineNoteTooltip = ({ note }: LineNoteTooltipProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: `calc(1.5rem + ${note.line - 1} * 1.5rem - 0.25rem)`,
        width: 256,
        bgcolor: '#141f38',
        border: '1px solid rgba(163,166,255,0.3)',
        borderRadius: '8px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
        p: 1.5,
        zIndex: 40,
        pointerEvents: 'none',
        animation: 'fadeInRight 0.15s ease-out',
        '@keyframes fadeInRight': {
          from: { opacity: 0, transform: 'translateX(6px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Icon name="description" filled style={{ fontSize: 14, color: '#a3a6ff' }} />
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a3aac4',
            fontFamily: "'Space Grotesk', sans-serif",
            flex: 1,
          }}
        >
          Contextual Note
        </Typography>
        <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>{note.time}</Typography>
      </Box>

      {/* Note text */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          color: '#e2e8f0',
          lineHeight: 1.5,
          fontStyle: 'italic',
          mb: 1,
        }}
      >
        "{note.text}"
      </Typography>

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: '#a3a6ff' }}>{note.author}</Typography>
        <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#475569' }} />
        <Typography sx={{ fontSize: '0.625rem', color: '#475569' }}>Gutter #{note.line}</Typography>
      </Box>
    </Box>
  );
};
