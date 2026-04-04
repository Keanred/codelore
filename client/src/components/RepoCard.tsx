import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

const statusConfig = {
  synced: { label: 'Synced', color: '#69f6b8', bg: 'rgba(0,108,73,0.2)', animation: 'pulse 2s infinite' },
  syncing: { label: 'Syncing', color: '#a3a6ff', bg: 'rgba(163,166,255,0.2)', animation: 'bounce 1s infinite' },
  idle: { label: 'Idle', color: '#94A3B8', bg: 'rgba(30,41,59,0.5)', animation: 'none' },
};

const langBgMap: Record<string, string> = { JS: '#1e1b4b', PY: '#1e293b' };
const getLangBg = (lang: string) => langBgMap[lang] ?? '#450a0a';

interface RepoCardHeaderProps {
  icon: string;
  status: 'synced' | 'syncing' | 'idle';
}

const RepoCardHeader = ({ icon, status }: RepoCardHeaderProps) => {
  const s = statusConfig[status];
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
      <Box
        sx={{
          p: 1,
          bgcolor: 'rgba(99,102,241,0.1)',
          borderRadius: '8px',
          fontSize: 22,
          color: '#818CF8',
          display: 'flex',
        }}
      >
        <Icon name={icon} />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.5}
        sx={{ px: 1, py: 0.25, borderRadius: '99px', bgcolor: s.bg }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: s.color, animation: s.animation }} />
        <Typography
          sx={{
            fontSize: '0.6rem',
            fontWeight: 700,
            color: s.color,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {s.label}
        </Typography>
      </Stack>
    </Stack>
  );
};

export interface RepoCardProps {
  icon: string;
  name: string;
  subtitle: string;
  status: 'synced' | 'syncing' | 'idle';
  nodes: string;
  progress?: number;
  langs?: string[];
}

export const RepoCard = ({ icon, name, subtitle, status, nodes, progress, langs }: RepoCardProps) => (
  <Box
    sx={{
      bgcolor: '#0f1930',
      p: 2.5,
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      cursor: 'pointer',
      '&:hover': { bgcolor: '#141f38' },
      transition: 'background-color 0.2s',
    }}
  >
    <RepoCardHeader icon={icon} status={status} />

    <Typography
      sx={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#dee5ff',
        '&:hover': { color: '#a3a6ff' },
        mb: 0.5,
      }}
    >
      {name}
    </Typography>
    <Typography sx={{ fontSize: '0.8rem', color: '#a3aac4', fontFamily: "'JetBrains Mono', monospace", mb: 2 }}>
      {subtitle}
    </Typography>

    {status === 'syncing' && progress !== undefined && (
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 2,
          height: 4,
          borderRadius: 2,
          bgcolor: '#192540',
          '& .MuiLinearProgress-bar': { bgcolor: '#a3a6ff' },
        }}
      />
    )}

    <Divider sx={{ borderColor: 'rgba(64,72,93,0.1)', mb: 1.5 }} />
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography sx={{ fontSize: '0.65rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
        {nodes}
      </Typography>
      {langs && (
        <Stack direction="row" sx={{ '& > *:not(:first-of-type)': { ml: -0.75 } }}>
          {langs.map((lang) => (
            <Box
              key={lang}
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px solid #060e20',
                bgcolor: getLangBg(lang),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.5rem',
                color: '#dee5ff',
              }}
            >
              {lang}
            </Box>
          ))}
        </Stack>
      )}
      {status === 'syncing' && progress !== undefined && (
        <Typography
          sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#a3a6ff', fontFamily: "'JetBrains Mono', monospace" }}
        >
          {progress}%
        </Typography>
      )}
    </Stack>
  </Box>
);
