import { RepoResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

export type RepoStatus = 'idle' | 'syncing' | 'error';

const STATUS_CONFIG = {
  idle: {
    label: 'Idle',
    dotColor: '#64748b',
    badgeBg: '#1e293b',
    badgeColor: '#cbd5e1',
    badgeBorder: 'transparent',
    hoverBorder: '#a3a6ff',
    hoverText: '#a3a6ff',
    iconColor: '#818cf8',
    cardIcon: 'source',
  },
  syncing: {
    label: 'Syncing',
    dotColor: '#69f6b8',
    badgeBg: 'rgba(105,246,184,0.1)',
    badgeColor: '#69f6b8',
    badgeBorder: 'rgba(105,246,184,0.2)',
    hoverBorder: '#69f6b8',
    hoverText: '#69f6b8',
    iconColor: '#69f6b8',
    cardIcon: 'sync',
  },
  error: {
    label: 'Error',
    dotColor: '#ff6e84',
    badgeBg: 'rgba(255,110,132,0.1)',
    badgeColor: '#ff6e84',
    badgeBorder: 'rgba(255,110,132,0.2)',
    hoverBorder: '#ff6e84',
    hoverText: '#ff6e84',
    iconColor: '#ff6e84',
    cardIcon: 'warning',
  },
} satisfies Record<RepoStatus, object>;

interface RepoCardProps {
  repo: RepoResponse;
  status?: RepoStatus;
  lastSynced?: string;
  onClick?: () => void;
}

export const RepoCard = ({ repo, status = 'idle', lastSynced, onClick }: RepoCardProps) => {
  const config = STATUS_CONFIG[status];

  const syncedLabel =
    lastSynced ??
    new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      -Math.round((Date.now() - new Date(repo.createdAt).getTime()) / (1000 * 60 * 60)),
      'hours',
    );

  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: '#0f1930',
        borderRadius: '12px',
        p: 2.5,
        transition: 'all 0.2s',
        borderLeft: '2px solid transparent',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          bgcolor: '#1f2b49',
          borderLeftColor: config.hoverBorder,
          '& .repo-name': { color: config.hoverText },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Left: icon + info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '8px',
              bgcolor: '#192540',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name={config.cardIcon} style={{ fontSize: 28, color: config.iconColor }} />
          </Box>
          <Box>
            <Typography
              className="repo-name"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: '#dee5ff',
                transition: 'color 0.2s',
                lineHeight: 1.3,
              }}
            >
              {repo.githubOwner}/{repo.name}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'monospace', mt: 0.5 }}>
              {repo.githubOwner} · {repo.githubId}
            </Typography>
          </Box>
        </Box>

        {/* Right: status badge + last synced */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, ml: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1,
              py: 0.5,
              borderRadius: '4px',
              bgcolor: config.badgeBg,
              color: config.badgeColor,
              border: `1px solid ${config.badgeBorder}`,
              fontSize: '0.625rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: config.dotColor,
                flexShrink: 0,
                ...(status === 'syncing' && { animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }),
              }}
            />
            {config.label}
          </Box>
          <Typography
            sx={{ fontSize: '0.625rem', color: '#475569', mt: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            Last synced: {syncedLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
