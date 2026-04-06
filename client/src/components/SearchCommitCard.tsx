import type { CommitResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

function formatRelativeDate(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

interface SearchCommitCardProps {
  commit: CommitResponse;
  repoName?: string;
}

export const SearchCommitCard = ({ commit, repoName }: SearchCommitCardProps) => {
  const meta = [
    { icon: 'person', label: commit.author },
    { icon: 'calendar_today', label: formatRelativeDate(commit.date) },
    ...(repoName ? [{ icon: 'terminal', label: repoName }] : []),
  ];

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: '#091328',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
        '&:hover': { bgcolor: '#1f2b49' },
        '&:hover .commit-msg': { textDecoration: 'underline' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Typography
          className="commit-msg"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#a3a6ff',
            cursor: 'pointer',
            flex: 1,
            mr: 2,
            lineHeight: 1.5,
          }}
        >
          {commit.message}
        </Typography>
        <Box
          sx={{
            fontSize: '0.625rem',
            fontFamily: 'monospace',
            px: 1,
            py: 0.25,
            bgcolor: '#192540',
            borderRadius: '4px',
            color: '#a3aac4',
            flexShrink: 0,
          }}
        >
          {commit.commitHash.slice(0, 7)}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {meta.map(({ icon, label }) => (
          <Box
            key={icon}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#a3aac4',
            }}
          >
            <Icon name={icon} style={{ fontSize: 14 }} />
            <span>{label}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
