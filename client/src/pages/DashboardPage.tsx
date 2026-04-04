import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppLayout, Icon } from '../components/AppLayout';
import { FeedItem } from '../components/FeedItem';
import { RepoCard } from '../components/RepoCard';
import { StatCard } from '../components/StatCard';

// ─── Constants ───────────────────────────────────────────────────────────────

// eslint-disable-next-line max-len
const GRAPH_IMG_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWdz_r7yDQfABqnZYY3HyJ3SI3zW0mZxlv5BDCkwaq5EAmAGZNhl-9lgrXmmhVVU1-MF7O3eINGfDqQtG5-SD-bhuOkghqsGuncWRqqoXVY69dGt4rEjIuJfajRgNe_PySxBCXmk7vzvN-37FmbbJ6yzKWk9M5PQX2T6UUZRlUsXCftM9v5RrQiV2K7xGuuxthsQ5p7b_OmkasVj6pdmffnTGLeksaDXkK1ApBwzZcE2a_M1r7sgesyP5JuNkpm39E2jg_KcaC5s';

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export const DashboardPage = () => (
  <AppLayout sidebarActive="Explorer" topNavActive="File">
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Hero */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'flex-end' }}
        gap={3}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#dee5ff', letterSpacing: '-0.025em', mb: 1 }}>
            Codelore
          </Typography>
          <Typography sx={{ color: '#a3aac4', maxWidth: 500 }}>
            Deep indexing of your codebase and logic. Manage cross-repository context and semantic lore clusters.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Icon name="cloud_sync" />}
          sx={{
            bgcolor: '#4F46E5',
            '&:hover': { bgcolor: '#4338CA' },
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            py: 1.5,
            whiteSpace: 'nowrap',
          }}
        >
          Connect New Repo
        </Button>
      </Stack>

      {/* Stats Bento */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
        <StatCard
          label="Total Repos"
          value="128"
          icon="database"
          footer={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ fontSize: 12, color: '#69f6b8' }}>
                <Icon name="trending_up" />
              </Box>
              <Typography sx={{ fontSize: '0.625rem', color: '#69f6b8' }}>+4 this week</Typography>
            </Stack>
          }
        />
        <StatCard
          label="Files Indexed"
          value="42.8k"
          icon="description"
          footer={<Typography sx={{ fontSize: '0.625rem', color: '#64748B' }}>~1.2GB Lore Data</Typography>}
        />
        <StatCard
          label="Lore Gems"
          value="1,024"
          icon="auto_awesome"
          footer={<Typography sx={{ fontSize: '0.625rem', color: '#ff9dd1' }}>AI-Generated Contexts</Typography>}
        />
        <StatCard
          label="Sync Health"
          value="99.4%"
          icon="verified_user"
          footer={
            <LinearProgress
              variant="determinate"
              value={99.4}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: '#141f38',
                mt: 1,
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#69f6b8',
                  boxShadow: '0 0 10px #69f6b8',
                },
              }}
            />
          }
        />
      </Box>

      {/* Main grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4, alignItems: 'start' }}>
        {/* Left: Codelore Map */}
        <Stack gap={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" gap={1}>
              <Box sx={{ width: 4, height: 24, bgcolor: '#4F46E5', borderRadius: '99px' }} />
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#dee5ff' }}
              >
                Codelore Map
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.5}
              sx={{
                color: '#94A3B8',
                fontSize: '0.75rem',
                fontFamily: "'JetBrains Mono', monospace",
                cursor: 'pointer',
              }}
            >
              <Box sx={{ fontSize: 16 }}>
                <Icon name="filter_list" />
              </Box>
              <span>Filter by Status</span>
            </Stack>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <RepoCard
              icon="memory"
              name="neural-engine-v4"
              subtitle="Last Indexed: 2m ago"
              status="synced"
              nodes="14.2k nodes"
              langs={['JS', 'PY']}
            />
            <RepoCard
              icon="hub"
              name="codelore-shard-api"
              subtitle="Status: Processing AST..."
              status="syncing"
              nodes="8.1k nodes"
              progress={65}
            />
            <RepoCard
              icon="terminal"
              name="core-cli-tools"
              subtitle="Last Indexed: 4h ago"
              status="idle"
              nodes="2.4k nodes"
              langs={['GO']}
            />

            {/* Add repo placeholder */}
            <Box
              sx={{
                bgcolor: '#091328',
                border: '2px dashed rgba(64,72,93,0.2)',
                p: 2.5,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                cursor: 'pointer',
                color: '#64748B',
                '&:hover': {
                  borderColor: 'rgba(163,166,255,0.4)',
                  color: '#a3a6ff',
                  bgcolor: 'rgba(163,166,255,0.05)',
                },
                transition: 'all 0.2s',
                minHeight: 180,
              }}
            >
              <Box sx={{ fontSize: 36 }}>
                <Icon name="add_circle" />
              </Box>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: '0.9rem' }}>
                Link New Repository
              </Typography>
            </Box>
          </Box>

          {/* Graph visual */}
          <Box
            sx={{
              position: 'relative',
              height: 256,
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(64,72,93,0.1)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #060e20, transparent)',
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src={GRAPH_IMG_SRC}
              alt="Codelore graph visualization"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#dee5ff', mb: 0.5 }}
              >
                Codelore Graph Visualization
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#a3aac4' }}>
                Live mapping of your project lore and dependencies.
              </Typography>
            </Box>
            <Button
              sx={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                zIndex: 2,
                bgcolor: '#1f2b49',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                '&:hover': { bgcolor: '#2d3b5d' },
                px: 2,
                py: 1,
                textTransform: 'uppercase',
              }}
            >
              Explore Lore
            </Button>
          </Box>
        </Stack>

        {/* Right: Activity Feed */}
        <Box
          sx={{
            bgcolor: '#091328',
            borderRadius: '16px',
            border: '1px solid rgba(64,72,93,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(64,72,93,0.1)', bgcolor: '#0f1930' }}>
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#dee5ff',
              }}
            >
              Recent Lore
            </Typography>
            <Typography
              sx={{ fontSize: '0.7rem', color: '#a3aac4', fontFamily: "'JetBrains Mono', monospace", mt: 0.5 }}
            >
              Live Commit Stream
            </Typography>
          </Box>

          <Stack sx={{ flex: 1, overflowY: 'auto', p: 2, gap: 1 }}>
            <FeedItem hash="f4a29c1" time="12:45 PM" dotColor="#69f6b8" dotShadow="0 0 8px #69f6b8">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#dee5ff' }}>
                Synced{' '}
                <Box component="span" sx={{ color: '#818CF8' }}>
                  auth-service
                </Box>{' '}
                lore
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  bgcolor: '#000',
                  borderRadius: '4px',
                  borderLeft: '2px solid rgba(105,246,184,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.688rem',
                  color: '#a3aac4',
                  fontStyle: 'italic',
                }}
              >
                + Updated 12 semantic nodes
              </Box>
            </FeedItem>

            <FeedItem hash="22b9a11" time="10:20 AM" dotColor="#a3a6ff" dotShadow="0 0 8px #a3a6ff">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#dee5ff' }}>
                New repository lore detected:{' '}
                <Box component="span" sx={{ color: '#818CF8' }}>
                  ui-kit-pro
                </Box>
              </Typography>
              <Stack direction="row" alignItems="center" gap={1} mt={1.5}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#1f2b49',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: '#dee5ff',
                  }}
                >
                  <Icon name="link" />
                </Box>
                <Typography sx={{ fontSize: '0.625rem', color: '#94A3B8' }}>
                  Waiting for indexing permission...
                </Typography>
              </Stack>
            </FeedItem>

            <FeedItem hash="ec334f" time="08:15 AM" dotColor="#ff9dd1" dotShadow="0 0 8px #ff9dd1">
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#dee5ff' }}>
                AI Lore Gem generated for{' '}
                <Box component="span" sx={{ color: '#818CF8' }}>
                  neural-engine-v4
                </Box>
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  bgcolor: '#000',
                  borderRadius: '4px',
                  borderLeft: '2px solid rgba(255,157,209,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.688rem',
                  color: '#a3aac4',
                  fontStyle: 'italic',
                }}
              >
                "Module cycle detected in /v4/internal/utils.js"
              </Box>
            </FeedItem>

            <FeedItem hash="dd921e" time="Yesterday" dotColor="#64748B" dotShadow="none" dim>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#dee5ff' }}>
                System-wide Codelore backup completed
              </Typography>
            </FeedItem>
          </Stack>

          <Box
            sx={{
              p: 2,
              bgcolor: '#141f38',
              borderTop: '1px solid rgba(64,72,93,0.1)',
              textAlign: 'center',
            }}
          >
            <Typography
              component="button"
              sx={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.625rem',
                fontWeight: 700,
                color: '#4F46E5',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                '&:hover': { color: '#4338CA' },
                fontFamily: "'Inter', sans-serif",
              }}
            >
              View All Logs
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </AppLayout>
);
