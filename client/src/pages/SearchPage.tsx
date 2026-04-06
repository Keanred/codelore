import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLayout } from '../components/AppLayout';
import { Icon } from '../components/Icon';
import { SearchBar } from '../components/SearchBar';
import { SearchCommitCard } from '../components/SearchCommitCard';
import { SearchFileRow } from '../components/SearchFileRow';
import { SearchNoteCard } from '../components/SearchNoteCard';

// ─── Static demo data ─────────────────────────────────────────────────────────

const DEMO_COMMITS = [
  {
    id: '1',
    repoId: 'r1',
    commitHash: '7a2e4f1c',
    message: 'feat(ui): implement bento grid layout for search',
    author: 'alex_chen',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    repoId: 'r2',
    commitHash: '3c91b8ad',
    message: 'fix(api): resolution for intermittent socket timeouts',
    author: 'm_smith',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const DEMO_NOTES = [
  {
    id: '1',
    fileId: 'f1',
    filePath: 'system_arch.md',
    content:
      'Considering the high-traffic volume during peak hours, we must implement a zero-downtime blue-green deployment for the v2 schema migration...',
    createdAt: new Date('2024-10-24'),
  },
  {
    id: '2',
    fileId: 'f2',
    filePath: 'roadmap_q4.md',
    content:
      'Switching to a weighted fuzzy matching approach for file paths will improve discovery. Currently seeing 150ms latency in test...',
    createdAt: new Date('2024-09-12'),
  },
];

const DEMO_FILES = [
  { id: '1', repoId: 'r1', path: 'src/lib/components/navigation/SearchController.tsx', createdAt: new Date() },
  { id: '2', repoId: 'r1', path: 'src/shared/interfaces/types.commits.d.ts', createdAt: new Date() },
  { id: '3', repoId: 'r2', path: 'scripts/ops/deploy.sh', createdAt: new Date() },
  { id: '4', repoId: 'r2', path: 'root/tailwind.config.js', createdAt: new Date() },
];

const FILTERS = [
  { label: 'Language', value: 'TypeScript' },
  { label: 'Timeframe', value: 'Last 7 Days' },
  { label: 'Author', value: 'Self' },
];

// ─── Search Page ──────────────────────────────────────────────────────────────

export const SearchPage = () => {
  return (
    <AppLayout pageTitle="Search">
      <Box sx={{ maxWidth: '64rem', mx: 'auto' }}>
        {/* ── Search Bar ── */}
        <Box sx={{ mb: 6 }}>
          <SearchBar value="" onChange={() => {}} onExecute={() => {}} />
        </Box>

        {/* ── Results Grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          {/* ── Left: Commits + Notes ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Commits section */}
            <Box component="section">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, px: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon name="history" style={{ color: '#a3a6ff', fontSize: 20 }} />
                  <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 700 }}>
                    Recent Commits
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#40485d' }}>
                  12 MATCHES
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {DEMO_COMMITS.map((commit) => (
                  <SearchCommitCard key={commit.id} commit={commit} repoName="codelore-core" />
                ))}
              </Box>
            </Box>

            {/* Notes section */}
            <Box component="section">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, px: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon name="sticky_note_2" style={{ color: '#ff9dd1', fontSize: 20 }} />
                  <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 700 }}>
                    Engineering Notes
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#40485d' }}>
                  4 MATCHES
                </Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                {DEMO_NOTES.map((note) => (
                  <SearchNoteCard key={note.id} note={note} />
                ))}
              </Box>
            </Box>
          </Box>

          {/* ── Right: Files panel + Filters widget ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Matching files panel */}
            <Box sx={{ bgcolor: '#0f1930', p: 3, borderRadius: '16px', border: '1px solid rgba(64,72,93,0.1)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon name="folder_open" style={{ color: '#69f6b8', fontSize: 20 }} />
                  <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                    Matching Files
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: '0.625rem',
                    fontFamily: 'monospace',
                    color: '#69f6b8',
                    px: 1,
                    py: 0.25,
                    bgcolor: 'rgba(105,246,184,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  LIVE
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {DEMO_FILES.map((file) => (
                  <SearchFileRow key={file.id} file={file} />
                ))}
              </Box>

              <Box
                component="button"
                sx={{
                  width: '100%',
                  mt: 4,
                  py: 1.5,
                  fontSize: '0.625rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  color: '#6d758c',
                  bgcolor: 'transparent',
                  border: 'none',
                  borderTop: '1px solid rgba(64,72,93,0.1)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#a3a6ff' },
                }}
              >
                View All 85 Files
              </Box>
            </Box>

            {/* Advanced filters widget */}
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                p: 3,
                borderRadius: '16px',
                bgcolor: '#0a142d',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: -16,
                  top: -16,
                  width: 96,
                  height: 96,
                  bgcolor: 'rgba(163,166,255,0.1)',
                  filter: 'blur(16px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  mb: 2,
                  color: '#dee5ff',
                }}
              >
                Advanced Filters
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {FILTERS.map(({ label, value }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#a3aac4' }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#818cf8' }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box
                component="button"
                sx={{
                  mt: 3,
                  width: '100%',
                  py: 1,
                  bgcolor: '#192540',
                  borderRadius: '4px',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: '#a3aac4',
                  border: '1px solid rgba(64,72,93,0.1)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'rgba(163,166,255,0.4)' },
                }}
              >
                CLEAR ALL FILTERS
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Background decorations */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -20, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 500,
            height: 500,
            bgcolor: 'rgba(163,166,255,0.05)',
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: 400,
            height: 400,
            bgcolor: 'rgba(105,246,184,0.05)',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
        />
      </Box>
    </AppLayout>
  );
};
