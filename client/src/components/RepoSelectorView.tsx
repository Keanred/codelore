import { RepoResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Icon } from './Icon';

// ─── Status badge ─────────────────────────────────────────────────────────────

type Status = 'synced' | 'syncing' | 'idle';

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; pulse: boolean }> = {
  synced: { label: 'Synced', color: '#69f6b8', bg: 'rgba(0,108,73,0.2)', pulse: true },
  syncing: { label: 'Syncing', color: '#ff9dd1', bg: 'rgba(250,136,200,0.1)', pulse: false },
  idle: { label: 'Idle', color: '#6d758c', bg: '#141f38', pulse: false },
};

const StatusBadge = ({ status }: { status: Status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 0.25,
        borderRadius: '999px',
        bgcolor: cfg.bg,
        color: cfg.color,
        fontSize: '0.625rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: cfg.color,
          ...(cfg.pulse && {
            '@keyframes pulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
            animation: 'pulse 2s ease-in-out infinite',
          }),
          ...(status === 'syncing' && {
            '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
            animation: 'spin 1s linear infinite',
          }),
        }}
      />
      {cfg.label}
    </Box>
  );
};

// ─── Table header ─────────────────────────────────────────────────────────────

const COLUMNS = [
  { label: 'Select', flex: 1, align: 'center' as const },
  { label: 'Name & Path', flex: 4, align: 'left' as const },
  { label: 'Status', flex: 2, align: 'left' as const },
  { label: 'Owner', flex: 2, align: 'left' as const },
  { label: 'Connected', flex: 2, align: 'left' as const },
  { label: 'Actions', flex: 1, align: 'right' as const },
];

// ─── Table row ────────────────────────────────────────────────────────────────

interface RepoRowProps {
  repo: RepoResponse;
  selected: boolean;
  onSelect: () => void;
}

const RepoRow = ({ repo, selected, onSelect }: RepoRowProps) => (
  <Box
    onClick={onSelect}
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 4fr 2fr 2fr 2fr 1fr',
      gap: 2,
      px: 3,
      py: 2,
      alignItems: 'center',
      borderBottom: '1px solid rgba(64,72,93,0.05)',
      cursor: 'pointer',
      transition: 'background-color 0.15s',
      bgcolor: selected ? 'rgba(163,166,255,0.04)' : 'transparent',
      '&:hover': { bgcolor: '#1f2b49' },
      '&:hover .select-dot': { opacity: 1 },
      '&:hover .select-ring': { borderColor: '#a3a6ff' },
    }}
  >
    {/* Select */}
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        className="select-ring"
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: selected ? '2px solid #a3a6ff' : '2px solid rgba(163,166,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.15s',
        }}
      >
        <Box
          className="select-dot"
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: '#a3a6ff',
            opacity: selected ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
        />
      </Box>
    </Box>

    {/* Name & Path */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '4px',
          bgcolor: '#141f38',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name="folder_open" style={{ fontSize: 18, color: '#8387ff' }} />
      </Box>
      <Box sx={{ overflow: 'hidden' }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: selected ? '#a3a6ff' : '#dee5ff',
            transition: 'color 0.15s',
            '.MuiBox-root:hover &': { color: '#a3a6ff' },
          }}
        >
          {repo.name}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#6d758c',
            letterSpacing: '-0.02em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {repo.githubOwner}/{repo.name}
        </Typography>
      </Box>
    </Box>

    {/* Status */}
    <Box>
      <StatusBadge status="synced" />
    </Box>

    {/* Owner */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Icon name="person" style={{ fontSize: 14, color: '#6d758c' }} />
      <Typography sx={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#a3aac4' }}>
        {repo.githubOwner}
      </Typography>
    </Box>

    {/* Connected date */}
    <Typography sx={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#6d758c' }}>
      {repo.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
    </Typography>

    {/* Actions */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        component="button"
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.75,
          borderRadius: '4px',
          bgcolor: 'transparent',
          border: 'none',
          color: '#6d758c',
          cursor: 'pointer',
          transition: 'background-color 0.15s, color 0.15s',
          '&:hover': { bgcolor: '#141f38', color: '#a3aac4' },
        }}
      >
        <Icon name="more_vert" style={{ fontSize: 18 }} />
      </Box>
    </Box>
  </Box>
);

// ─── Filter tab ───────────────────────────────────────────────────────────────

type FilterTab = 'all' | 'synced' | 'syncing';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'synced', label: 'Synced' },
  { id: 'syncing', label: 'Syncing' },
];

// ─── RepoSelectorView ─────────────────────────────────────────────────────────

interface RepoSelectorViewProps {
  repos: RepoResponse[];
  selectedRepoId: string | null;
  onSelect: (repo: RepoResponse) => void;
  onConnectRepo: () => void;
}

export const RepoSelectorView = ({ repos, selectedRepoId, onSelect, onConnectRepo }: RepoSelectorViewProps) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filtered = repos.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Toolbar */}
      <Box
        sx={{
          px: 4,
          py: 3,
          bgcolor: '#091328',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderBottom: '1px solid rgba(64,72,93,0.1)',
        }}
      >
        {/* Title row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#dee5ff',
              }}
            >
              Active Repositories
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#a3aac4', mt: 0.5 }}>
              Select a repository to explore its files and history
            </Typography>
          </Box>

          <Box
            component="button"
            onClick={onConnectRepo}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1,
              background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
              color: '#0f00a4',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(163,166,255,0.1)',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: '0 4px 20px rgba(163,166,255,0.25)' },
            }}
          >
            <Icon name="add" style={{ fontSize: 18 }} />
            Connect Repo
          </Box>
        </Box>

        {/* Search + filter row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Search */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              bgcolor: '#141f38',
              borderRadius: '8px',
              border: '1px solid transparent',
              transition: 'border-color 0.2s',
              '&:focus-within': { borderColor: 'rgba(163,166,255,0.3)' },
            }}
          >
            <Icon name="search" style={{ fontSize: 18, color: '#6d758c' }} />
            <InputBase
              placeholder="Search by name or owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                color: '#dee5ff',
                fontFamily: "'Inter', sans-serif",
                '& input::placeholder': { color: 'rgba(109,117,140,0.6)' },
              }}
            />
          </Box>

          {/* Filter tabs */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', bgcolor: '#141f38', borderRadius: '8px', p: 0.5, gap: 0.5 }}
          >
            {FILTER_TABS.map(({ id, label }) => (
              <Box
                key={id}
                component="button"
                onClick={() => setActiveFilter(id)}
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, color 0.15s',
                  ...(activeFilter === id
                    ? { bgcolor: '#1f2b49', color: '#a3a6ff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
                    : { bgcolor: 'transparent', color: '#6d758c', '&:hover': { color: '#dee5ff' } }),
                }}
              >
                {label}
              </Box>
            ))}
          </Box>

          {/* Filter icon */}
          <Box
            component="button"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              bgcolor: '#141f38',
              borderRadius: '8px',
              border: 'none',
              color: '#6d758c',
              cursor: 'pointer',
              transition: 'color 0.15s',
              '&:hover': { color: '#a3a6ff' },
            }}
          >
            <Icon name="filter_list" style={{ fontSize: 20 }} />
          </Box>
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          px: 4,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#091328',
            borderRadius: '12px',
            border: '1px solid rgba(64,72,93,0.1)',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
            height: '100%',
          }}
        >
          {/* Table header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 4fr 2fr 2fr 2fr 1fr',
              gap: 2,
              px: 3,
              py: 1.5,
              bgcolor: '#0f1930',
              borderBottom: '1px solid rgba(64,72,93,0.15)',
            }}
          >
            {COLUMNS.map((col) => (
              <Typography
                key={col.label}
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 900,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#6d758c',
                  textAlign: col.align,
                }}
              >
                {col.label}
              </Typography>
            ))}
          </Box>

          {/* Table body */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-track': { bgcolor: '#060e20' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#192540', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb:hover': { bgcolor: '#40485d' },
            }}
          >
            {filtered.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  flexDirection: 'column',
                  gap: 1.5,
                  py: 8,
                }}
              >
                <Icon name="folder_off" style={{ fontSize: 40, color: '#40485d' }} />
                <Typography sx={{ fontSize: '0.875rem', color: '#6d758c' }}>No repositories found</Typography>
              </Box>
            ) : (
              filtered.map((repo) => (
                <RepoRow
                  key={repo.id}
                  repo={repo}
                  selected={repo.id === selectedRepoId}
                  onSelect={() => onSelect(repo)}
                />
              ))
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 1.5,
              bgcolor: '#141f38',
              borderTop: '1px solid rgba(64,72,93,0.1)',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.625rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#6d758c',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Total Repositories:{' '}
              <Box component="span" sx={{ color: '#dee5ff' }}>
                {repos.length}
              </Box>
              {selectedRepoId && (
                <>
                  {' | Selected:'}{' '}
                  <Box component="span" sx={{ color: '#a3a6ff', fontWeight: 700 }}>
                    1
                  </Box>
                </>
              )}
            </Typography>

            {selectedRepoId && (
              <Box
                component="button"
                onClick={() => {
                  const repo = repos.find((r) => r.id === selectedRepoId);
                  if (repo) onSelect(repo);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.75,
                  background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
                  color: '#0f00a4',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                <Icon name="arrow_forward" style={{ fontSize: 14 }} />
                Open Explorer
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
