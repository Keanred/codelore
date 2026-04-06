import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { ConnectRepoDialog } from '../components/ConnectRepoDialog';
import { Icon } from '../components/Icon';
import { RepoCard } from '../components/RepoCard';
import { StatCard } from '../components/StatCard';
import { useReposQuery } from '../reposQuery';
import { useStatsQuery } from '../statsQuery';

// ─── Dashboard Page ────────────────────────────────────────────────────────────

export const DashboardPage = () => {
  const { data: repoData, isPending, isError, error } = useReposQuery();
  const { data: statsData } = useStatsQuery();
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);

  const statCards = [
    {
      label: 'Total Repositories',
      icon: 'folder_zip',
      value: statsData ? statsData.repoCount.toString() : '...',
      footerIcon: 'trending_up',
      footerColor: '#69f6b8',
      footerText: '+2 this month',
    },
    {
      label: 'Files Indexed',
      icon: 'description',
      value: statsData ? statsData.fileCount.toString() : '...',
      footerIcon: 'check_circle',
      footerColor: '#69f6b8',
      footerText: '98.2% Accuracy',
    },
    {
      label: 'Generated Notes',
      icon: 'sticky_note_2',
      value: statsData ? statsData.noteCount.toString() : '...',
      footerIcon: 'auto_awesome',
      footerColor: '#a3a6ff',
      footerText: 'AI Enhanced',
    },
  ];
  if (isPending) {
    return (
      <AppLayout pageTitle="Dashboard">
        <Typography sx={{ color: '#a3aac4' }}>Loading repositories...</Typography>
      </AppLayout>
    );
  }
  if (isError) {
    return (
      <AppLayout pageTitle="Dashboard">
        <Typography sx={{ color: '#ff6e84' }}>Error loading repositories: {error.message}</Typography>
      </AppLayout>
    );
  }
  return (
    <AppLayout pageTitle="Dashboard">
      {/* ── Page Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          mb: 5,
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <ConnectRepoDialog open={isConnectModalOpen} onClose={() => setConnectModalOpen(false)} />
        <Box>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.875rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            System Overview
          </Typography>
          <Typography sx={{ color: '#a3aac4', mt: 0.5, fontSize: '0.875rem' }}>
            Real-time indexing status and repository health.
          </Typography>
        </Box>

        <Box
          component="button"
          onClick={() => setConnectModalOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.25,
            background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
            color: '#0f00a4',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(163,166,255,0.3)',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: '0 0 30px rgba(163,166,255,0.5)' },
          }}
        >
          <Icon name="add_circle" style={{ fontSize: 20 }} />
          <span>Connect New Repo</span>
        </Box>
      </Box>

      {/* ── Stat Cards Bento Grid ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 6,
        }}
      >
        {statCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            icon={card.icon}
            value={card.value}
            footer={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name={card.footerIcon} style={{ fontSize: 16, color: card.footerColor }} />
                <Typography sx={{ fontSize: '0.75rem', color: card.footerColor }}>{card.footerText}</Typography>
              </Box>
            }
          />
        ))}
      </Box>

      {/* ── Active Repositories ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}
        >
          Active Repositories
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['Sort: Recent', 'Filter: All'].map((label) => (
            <Box
              key={label}
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: '#192540',
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                color: '#dee5ff',
                borderRadius: '2px',
                border: '1px solid rgba(64,72,93,0.2)',
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 2 }}>
        {repoData.map((repo) => (
          <RepoCard key={repo.id} repo={repo} status="idle" />
        ))}
      </Box>
    </AppLayout>
  );
};
