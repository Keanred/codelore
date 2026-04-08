import { FileResponse, RepoResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CodeViewer } from '../components/CodeViewer';
import { ConnectRepoDialog } from '../components/ConnectRepoDialog';
import { FileTree } from '../components/FileTree';
import { Icon } from '../components/Icon';
import { MemoryPanel } from '../components/MemoryPanel';
import { RepoSelectorView } from '../components/RepoSelectorView';
import { SideNav } from '../components/SideNav';
import { useFilesQuery } from '../filesQuery';
import { useReposQuery } from '../reposQuery';

export const CodeExplorerPage = () => {
  const { data: repos = [] } = useReposQuery();
  const [selectedRepo, setSelectedRepo] = useState<RepoResponse | null>(null);
  const [isConnectOpen, setConnectOpen] = useState(false);
  const { data: files = [] } = useFilesQuery(selectedRepo?.id || '');
  const [selectedFile, setSelectedFile] = useState<FileResponse | null>(null);
  const [addNoteLine, setAddNoteLine] = useState<number | null>(null);

  const handleSelectRepo = (repo: RepoResponse) => setSelectedRepo(repo);
  const handleBackToSelector = () => setSelectedRepo(null);

  return (
    <>
      <SideNav />
      <ConnectRepoDialog open={isConnectOpen} onClose={() => setConnectOpen(false)} />

      {/* Custom header — breadcrumb + repo actions */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 256,
          height: 64,
          zIndex: 50,
          bgcolor: 'rgba(6,14,32,0.6)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(99,102,241,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
        }}
      >
        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            onClick={selectedRepo ? handleBackToSelector : undefined}
            sx={{
              fontSize: '0.875rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: selectedRepo ? '#94a3b8' : '#fff',
              cursor: selectedRepo ? 'pointer' : 'default',
              transition: 'color 0.2s',
              '&:hover': selectedRepo ? { color: '#a3a6ff' } : {},
            }}
          >
            Projects
          </Typography>

          {selectedRepo ? (
            <>
              <Icon name="chevron_right" style={{ fontSize: 14, color: '#94a3b8' }} />
              <Typography
                onClick={handleBackToSelector}
                sx={{
                  fontSize: '0.875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#a3a6ff' },
                }}
              >
                Select Repository
              </Typography>
              <Icon name="chevron_right" style={{ fontSize: 14, color: '#94a3b8' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                {selectedRepo.name}
              </Typography>
              <Box
                sx={{
                  ml: 1,
                  bgcolor: 'rgba(105,246,184,0.1)',
                  color: '#69f6b8',
                  fontSize: '0.625rem',
                  px: 1,
                  py: 0.25,
                  borderRadius: '4px',
                  border: '1px solid rgba(105,246,184,0.2)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                main
              </Box>
            </>
          ) : (
            <>
              <Icon name="chevron_right" style={{ fontSize: 14, color: '#94a3b8' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  opacity: 0.5,
                }}
              >
                Select Repository
              </Typography>
            </>
          )}
        </Box>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {selectedRepo && (
            <>
              <Box
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '8px',
                  bgcolor: '#141f38',
                  border: '1px solid rgba(64,72,93,0.3)',
                  fontSize: '0.875rem',
                  color: '#a3aac4',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                  '&:hover': { borderColor: 'rgba(163,166,255,0.5)', color: '#dee5ff' },
                }}
              >
                <Icon name="sync" filled style={{ fontSize: 16, color: '#69f6b8' }} />
                <span>Synced</span>
              </Box>
              <Box sx={{ width: 1, height: 24, bgcolor: 'rgba(64,72,93,0.3)', mx: 0.5 }} />
            </>
          )}

          {(['notifications', 'account_circle'] as const).map((icon) => (
            <Box
              key={icon}
              component="button"
              sx={{
                p: 1,
                color: '#94a3b8',
                bgcolor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: '#818cf8' },
              }}
            >
              <Icon name={icon} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ ml: '256px', pt: '64px', height: '100vh', display: 'flex', overflow: 'hidden' }}>
        {selectedRepo ? (
          /* 3-column code explorer */
          <>
            <FileTree files={files} selectedFileId={selectedFile?.path ?? null} onSelect={setSelectedFile} />
            <CodeViewer
              addNoteLine={addNoteLine}
              onAddNoteClose={() => setAddNoteLine(null)}
              onAddNote={setAddNoteLine}
            />
            <MemoryPanel />
          </>
        ) : (
          /* Repository selector */
          <RepoSelectorView
            repos={repos}
            selectedRepoId={null}
            onSelect={handleSelectRepo}
            onConnectRepo={() => setConnectOpen(true)}
          />
        )}
      </Box>
    </>
  );
};
