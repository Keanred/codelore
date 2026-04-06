import type { FileResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

function getFileIcon(filename: string): string {
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'description';
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) return 'javascript';
  if (filename.endsWith('.sh')) return 'terminal';
  if (filename.endsWith('.json') || filename.endsWith('.config.js') || filename.endsWith('.config.ts'))
    return 'data_object';
  if (filename.endsWith('.md')) return 'article';
  if (filename.endsWith('.css') || filename.endsWith('.scss')) return 'style';
  return 'description';
}

interface SearchFileRowProps {
  file: FileResponse;
  onClick?: () => void;
}

export const SearchFileRow = ({ file, onClick }: SearchFileRowProps) => {
  const parts = file.path.split('/');
  const filename = parts.pop() ?? file.path;
  const dir = parts.length > 0 ? parts.join('/') + '/' : '/';

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: '#1f2b49' },
        '&:hover .file-icon': { color: '#a3a6ff' },
        '&:hover .open-icon': { opacity: 1 },
      }}
    >
      <Icon
        className="file-icon"
        name={getFileIcon(filename)}
        style={{ color: '#a3aac4', fontSize: 20, transition: 'color 0.2s', flexShrink: 0 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontFamily: 'monospace',
            color: '#dee5ff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {filename}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontFamily: 'monospace',
            color: '#6d758c',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {dir}
        </Typography>
      </Box>
      <Icon
        className="open-icon"
        name="open_in_new"
        style={{ fontSize: 16, color: '#6d758c', opacity: 0, transition: 'opacity 0.2s', flexShrink: 0 }}
      />
    </Box>
  );
};
