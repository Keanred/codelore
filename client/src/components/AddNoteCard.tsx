import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface AddNoteCardProps {
  line: number;
  onSave: () => void;
  onCancel: () => void;
}

export const AddNoteCard = ({ line, onSave, onCancel }: AddNoteCardProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: `calc(1.5rem + ${line - 1} * 1.5rem - 0.5rem)`,
        width: 288,
        bgcolor: '#141f38',
        border: '1px solid rgba(163,166,255,0.4)',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        p: 2,
        zIndex: 30,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Icon name="edit_note" style={{ fontSize: 16, color: '#a3a6ff' }} />
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a3aac4',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          New Note · Line {line}
        </Typography>
      </Box>

      {/* Selection indicator bar */}
      <Box
        sx={{
          position: 'absolute',
          right: -1,
          top: 12,
          width: 4,
          height: 28,
          bgcolor: '#a3a6ff',
          borderRadius: '2px 0 0 2px',
          boxShadow: '0 0 8px rgba(163,166,255,0.6)',
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Textarea */}
        <Box
          sx={{
            bgcolor: '#000000',
            border: '1px solid rgba(64,72,93,0.3)',
            borderRadius: '8px',
            '&:focus-within': {
              borderColor: 'rgba(163,166,255,0.5)',
              boxShadow: '0 0 0 1px rgba(163,166,255,0.2)',
            },
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <InputBase
            multiline
            rows={3}
            placeholder="Add context to this line..."
            sx={{
              width: '100%',
              fontSize: '0.75rem',
              color: '#fff',
              p: 1.5,
              alignItems: 'flex-start',
              '& textarea::placeholder': { color: '#475569', opacity: 1 },
            }}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="button"
            onClick={onSave}
            sx={{
              flex: 1,
              py: 1,
              bgcolor: '#a3a6ff',
              color: '#0f00a4',
              fontWeight: 700,
              fontSize: '0.6875rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(163,166,255,0.2)',
              transition: 'background-color 0.2s, box-shadow 0.2s',
              '&:hover': { bgcolor: '#8387ff', boxShadow: '0 4px 20px rgba(163,166,255,0.35)' },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            Save Note
          </Box>
          <Box
            component="button"
            onClick={onCancel}
            sx={{
              px: 1.5,
              py: 1,
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: '#64748b',
              bgcolor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#fff' },
            }}
          >
            Cancel
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
