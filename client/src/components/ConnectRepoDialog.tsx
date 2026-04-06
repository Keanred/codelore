import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { connectRepo, getExternalRepos } from '../api';
import { queryClient } from '../App';
import { Icon } from './Icon';

interface ConnectRepoDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ConnectRepoDialog = ({ open, onClose }: ConnectRepoDialogProps) => {
  const [search, setSearch] = useState('');
  const [connecting, setConnecting] = useState<string | null>(null);

  const { data: externalRepos = [], isLoading } = useQuery({
    queryKey: ['external-repos'],
    queryFn: getExternalRepos,
    enabled: open,
  });

  const { mutate } = useMutation({
    mutationFn: connectRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
      setConnecting(null);
      onClose();
    },
    onError: () => {
      setConnecting(null);
    },
  });

  const filtered = externalRepos.filter((repo) => repo.full_name.toLowerCase().includes(search.toLowerCase()));

  const remaining = Math.max(0, externalRepos.length - filtered.length);

  const handleConnect = (repo: (typeof externalRepos)[number]) => {
    const owner = repo.full_name.split('/')[0];
    setConnecting(repo.full_name);
    mutate({ githubId: String(repo.id), name: repo.name, owner });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(25,37,64,0.85)',
          backdropFilter: 'blur(24px)',
          borderRadius: '16px',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          m: 2,
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          bgcolor: 'rgba(6,14,32,0.8)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          pb: 2.5,
          borderBottom: '1px solid rgba(64,72,93,0.1)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Connect GitHub Repository
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#a3aac4', mt: 0.5 }}>
            Select a repository to begin indexing.
          </Typography>
        </Box>
        <Box
          component="button"
          onClick={onClose}
          sx={{
            bgcolor: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            p: 0.5,
            borderRadius: '4px',
            transition: 'color 0.2s',
            '&:hover': { color: '#fff' },
          }}
        >
          <Icon name="close" />
        </Box>
      </Box>

      {/* Body */}
      <DialogContent sx={{ p: 3, pb: 0 }}>
        {/* Search */}
        <Box
          sx={{
            position: 'relative',
            mb: 3,
            bgcolor: '#192540',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
          }}
        >
          <Icon name="search" style={{ color: '#64748b', fontSize: 20, flexShrink: 0 }} />
          <InputBase
            placeholder="Search your GitHub repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              ml: 1,
              fontSize: '0.875rem',
              color: '#dee5ff',
              '& input::placeholder': { color: '#475569' },
              py: 1.5,
            }}
          />
        </Box>

        {/* Repo list */}
        <Box
          sx={{
            maxHeight: 350,
            overflowY: 'auto',
            pr: 0.5,
            mb: 0,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#40485d', borderRadius: '10px' },
            '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={24} sx={{ color: '#a3a6ff' }} />
            </Box>
          ) : filtered.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#475569', py: 4, fontSize: '0.875rem' }}>
              No repositories found.
            </Typography>
          ) : (
            filtered.map((repo) => (
              <Box
                key={repo.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderRadius: '8px',
                  transition: 'bgcolor 0.2s',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                  '&:hover .repo-icon': { color: '#a3a6ff' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Icon
                    className="repo-icon"
                    name={repo.private ? 'lock' : 'book'}
                    style={{ color: '#64748b', fontSize: 20, transition: 'color 0.2s' }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                      {repo.full_name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.625rem', color: '#475569', textTransform: 'uppercase', mt: 0.25 }}>
                      {repo.private ? 'Private' : 'Public'}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  component="button"
                  onClick={() => handleConnect(repo)}
                  disabled={connecting === repo.full_name}
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#a3a6ff',
                    border: '1px solid rgba(163,166,255,0.3)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '4px',
                    bgcolor: 'transparent',
                    cursor: connecting === repo.full_name ? 'not-allowed' : 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                    opacity: connecting === repo.full_name ? 0.5 : 1,
                    '&:hover:not(:disabled)': { bgcolor: '#a3a6ff', color: '#0f00a4' },
                  }}
                >
                  {connecting === repo.full_name ? 'Connecting…' : 'Connect'}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </DialogContent>

      {/* Footer */}
      <Box
        sx={{
          p: 3,
          bgcolor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(64,72,93,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon name="info" style={{ fontSize: 16, color: '#a3aac4' }} />
          <Typography sx={{ fontSize: '0.75rem', color: '#a3aac4' }}>
            {remaining > 0 ? `${remaining} more repositories available` : `${externalRepos.length} repositories loaded`}
          </Typography>
        </Box>
        <Box
          component="button"
          sx={{
            bgcolor: 'transparent',
            border: 'none',
            fontSize: '0.875rem',
            color: '#a3a6ff',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Configure Permissions
        </Box>
      </Box>
    </Dialog>
  );
};
