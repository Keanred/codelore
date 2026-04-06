import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { Icon } from './Icon';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  isLoading?: boolean;
}

export const SearchBar = ({ value, onChange, onExecute, isLoading = false }: SearchBarProps) => {
  return (
    <Box component="section" sx={{ position: 'relative' }}>
      {/* Ambient glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(163,166,255,0.1)',
          filter: 'blur(48px)',
          opacity: 0.2,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0.5,
          bgcolor: '#141f38',
          borderRadius: '12px',
          border: '1px solid rgba(64,72,93,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          transition: 'border-color 0.2s',
          '&:focus-within': { borderColor: 'rgba(163,166,255,0.4)' },
        }}
      >
        <Box sx={{ pl: 2.5, color: '#a3aac4', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Icon name="search" />
        </Box>

        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onExecute()}
          placeholder="Search across commits, notes, and file paths..."
          sx={{
            flex: 1,
            px: 2,
            py: 1,
            fontFamily: 'monospace',
            fontSize: '1.125rem',
            color: '#dee5ff',
            '& input::placeholder': { color: '#6d758c' },
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1.5, flexShrink: 0 }}>
          <Box
            component="kbd"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.5,
              bgcolor: '#192540',
              borderRadius: '4px',
              fontSize: '0.625rem',
              fontFamily: 'monospace',
              color: '#6d758c',
              border: '1px solid rgba(64,72,93,0.2)',
              userSelect: 'none',
            }}
          >
            CMD + K
          </Box>

          <Box
            component="button"
            onClick={onExecute}
            disabled={isLoading}
            sx={{
              px: 3,
              py: 1.25,
              background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.875rem',
              borderRadius: '8px',
              border: 'none',
              cursor: isLoading ? 'wait' : 'pointer',
              boxShadow: '0 4px 20px rgba(163,166,255,0.3)',
              transition: 'transform 0.15s',
              whiteSpace: 'nowrap',
              '&:hover:not(:disabled)': { transform: 'scale(1.02)' },
              '&:active:not(:disabled)': { transform: 'scale(0.98)' },
            }}
          >
            {isLoading ? 'SEARCHING…' : 'EXECUTE'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
