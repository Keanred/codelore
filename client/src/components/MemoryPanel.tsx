import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Icon } from './Icon';

// ─── Static data ──────────────────────────────────────────────────────────────

const COMMITS = [
  {
    id: '1',
    branch: 'feat/router-core',
    branchColor: '#69f6b8',
    dotColor: '#69f6b8',
    message: 'Optimize path resolution logic',
    author: 'Sarah J.',
    time: '2h ago',
    dimmed: false,
  },
  {
    id: '2',
    branch: 'fix/nav-blink',
    branchColor: '#8387ff',
    dotColor: '#6063ee',
    message: 'Fix flickering on sidebar toggle',
    author: 'Sarah J.',
    time: '5h ago',
    dimmed: false,
  },
  {
    id: '3',
    branch: 'chore/deps',
    branchColor: '#64748b',
    dotColor: '#6d758c',
    message: 'Upgrade router dependency to v3.1',
    author: 'System',
    time: 'Yesterday',
    dimmed: true,
  },
];

// ─── Notes dummy data ─────────────────────────────────────────────────────────

const GLOBAL_NOTES = [
  {
    id: '1',
    author: 'Alex Rivera',
    time: '2h ago',
    text: 'Ensure the z-index for the navbar remains at 50 to clear the sidebar overlays.',
  },
];

const LINE_NOTES = [
  {
    id: '1',
    author: 'Sarah Chen',
    time: '5h ago',
    line: 42,
    text: "This logic needs optimization for mobile viewports. Let's discuss in the standup.",
  },
  {
    id: '2',
    author: 'Marcus T.',
    time: '1d ago',
    line: 15,
    text: 'Verified: Correct usage of the shared BottomNavBar component from the JSON.',
  },
];

// ─── NoteCard sub-components ──────────────────────────────────────────────────

interface GlobalNoteCardProps {
  author: string;
  time: string;
  text: string;
}

const GlobalNoteCard = ({ author, time, text }: GlobalNoteCardProps) => (
  <Box
    sx={{
      p: 1.5,
      bgcolor: '#141f38',
      borderRadius: '8px',
      border: '1px solid rgba(64,72,93,0.2)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: '#192540',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="account_circle" style={{ fontSize: 16, color: '#a3aac4' }} />
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#dee5ff' }}>{author}</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.625rem', color: '#6d758c' }}>{time}</Typography>
    </Box>
    <Typography sx={{ fontSize: '0.75rem', color: '#a3aac4', lineHeight: 1.6 }}>{text}</Typography>
  </Box>
);

interface LineNoteCardProps {
  author: string;
  time: string;
  line: number;
  text: string;
}

const LineNoteCard = ({ author, time, line, text }: LineNoteCardProps) => (
  <Box
    sx={{
      p: 1.5,
      bgcolor: '#141f38',
      borderRadius: '8px',
      borderLeft: '2px solid #a3a6ff',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: '#192540',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="account_circle" style={{ fontSize: 16, color: '#a3aac4' }} />
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#dee5ff' }}>{author}</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.625rem', color: '#6d758c' }}>{time}</Typography>
    </Box>
    <Box sx={{ mb: 1 }}>
      <Box
        component="span"
        sx={{
          fontSize: '0.625rem',
          fontFamily: "'JetBrains Mono', monospace",
          bgcolor: 'rgba(163,166,255,0.15)',
          color: '#a3a6ff',
          px: 0.75,
          py: 0.25,
          borderRadius: '4px',
        }}
      >
        Line {line}
      </Box>
    </Box>
    <Typography sx={{ fontSize: '0.75rem', color: '#a3aac4', lineHeight: 1.6 }}>{text}</Typography>
  </Box>
);

// ─── NotesTabContent ──────────────────────────────────────────────────────────

const NotesTabContent = () => (
  <>
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Global Notes */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography
            sx={{
              fontSize: '0.625rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#6d758c',
            }}
          >
            Global Notes
          </Typography>
          <Box
            component="button"
            sx={{
              background: 'none',
              border: 'none',
              p: 0,
              cursor: 'pointer',
              color: '#6d758c',
              display: 'flex',
              '&:hover': { color: '#a3a6ff' },
              transition: 'color 0.2s',
            }}
          >
            <Icon name="add" style={{ fontSize: 14 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {GLOBAL_NOTES.map((note) => (
            <GlobalNoteCard key={note.id} author={note.author} time={note.time} text={note.text} />
          ))}
        </Box>
      </Box>

      {/* Line Notes */}
      <Box>
        <Typography
          sx={{
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#6d758c',
            mb: 1.5,
          }}
        >
          Line Notes
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {LINE_NOTES.map((note) => (
            <LineNoteCard key={note.id} author={note.author} time={note.time} line={note.line} text={note.text} />
          ))}
        </Box>
      </Box>
    </Box>

    {/* Footer: Add Note Input */}
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid rgba(64,72,93,0.1)',
        bgcolor: 'rgba(9,19,40,0.5)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          bgcolor: '#192540',
          borderRadius: '8px',
          '&:focus-within': { boxShadow: '0 0 0 1px rgba(163,166,255,0.4)' },
        }}
      >
        <InputBase
          multiline
          rows={3}
          placeholder="Add a contextual note..."
          sx={{
            width: '100%',
            fontSize: '0.75rem',
            color: '#fff',
            p: 1.5,
            alignItems: 'flex-start',
            '& textarea::placeholder': { color: '#475569', opacity: 1 },
          }}
        />
      </Box>
      <Box
        component="button"
        sx={{
          width: '100%',
          py: 1.25,
          bgcolor: '#4F46E5',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.75rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          boxShadow: '0 0 15px rgba(79,70,229,0.3)',
          transition: 'background-color 0.2s, box-shadow 0.2s',
          '&:hover': { bgcolor: '#6366f1', boxShadow: '0 0 20px rgba(79,70,229,0.4)' },
          '&:active': { transform: 'scale(0.98)' },
        }}
      >
        <Icon name="add_comment" style={{ fontSize: 16 }} />
        ADD GLOBAL NOTE
      </Box>
    </Box>
  </>
);

// ─── MemoryPanel ──────────────────────────────────────────────────────────────

export const MemoryPanel = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'notes'>('history');

  return (
    <Box
      component="section"
      sx={{
        width: 320,
        flexShrink: 0,
        bgcolor: '#0f1930',
        borderLeft: '1px solid rgba(64,72,93,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid rgba(64,72,93,0.1)', flexShrink: 0 }}>
        {(['history', 'notes'] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <Box
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                flex: 1,
                py: 1.5,
                textAlign: 'center',
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: active ? '#a3a6ff' : '#64748b',
                bgcolor: active ? 'rgba(163,166,255,0.05)' : 'transparent',
                borderBottom: `2px solid ${active ? '#a3a6ff' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'color 0.2s',
                '&:hover': { color: active ? '#a3a6ff' : '#cbd5e1' },
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Box>
          );
        })}
      </Box>

      {/* Tab content */}
      {activeTab === 'notes' ? (
        <NotesTabContent />
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Commit timeline */}
          <Box sx={{ p: 2, flex: 1 }}>
            <Box
              sx={{
                pl: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: '10px',
                  top: '8px',
                  bottom: 0,
                  width: '1px',
                  bgcolor: 'rgba(64,72,93,0.3)',
                },
              }}
            >
              {COMMITS.map((commit) => (
                <Box key={commit.id} sx={{ position: 'relative', opacity: commit.dimmed ? 0.6 : 1 }}>
                  {/* Dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '-19px',
                      top: '6px',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: commit.dotColor,
                      border: '3px solid #0f1930',
                      zIndex: 1,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.625rem',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.025em',
                      color: commit.branchColor,
                      mb: 0.5,
                    }}
                  >
                    {commit.branch}
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff', lineHeight: 1.4 }}>
                    {commit.message}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#192540',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="account_circle" style={{ fontSize: 16, color: '#a3aac4' }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.625rem', color: '#64748b' }}>
                      {commit.author} · {commit.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Contextual notes footer */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(64,72,93,0.1)',
              bgcolor: 'rgba(9,19,40,0.5)',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#a3aac4',
                mb: 2,
              }}
            >
              Contextual Notes
            </Typography>

            {/* Existing note */}
            <Box
              sx={{
                p: 1.5,
                mb: 3,
                borderRadius: '8px',
                bgcolor: '#141f38',
                border: '1px solid rgba(64,72,93,0.2)',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                "Ensure we keep the permission attribute mandatory for the settings route."
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: '#a3a6ff' }}>@m_ross</Typography>
                <Typography sx={{ fontSize: '0.625rem', color: '#64748b' }}>10m ago</Typography>
              </Box>
            </Box>

            {/* Note form */}
            <Box
              sx={{
                bgcolor: '#192540',
                borderRadius: '8px',
                mb: 1.5,
                '&:focus-within': { boxShadow: '0 0 0 1px rgba(163,166,255,0.4)' },
              }}
            >
              <InputBase
                multiline
                rows={3}
                placeholder="Add a technical note..."
                sx={{
                  width: '100%',
                  fontSize: '0.875rem',
                  color: '#fff',
                  p: 1.5,
                  alignItems: 'flex-start',
                  '& textarea::placeholder': { color: '#475569', opacity: 1 },
                }}
              />
            </Box>

            <Box
              component="button"
              sx={{
                width: '100%',
                py: 1,
                background: 'linear-gradient(90deg, #a3a6ff 0%, #6063ee 100%)',
                color: '#0f00a4',
                fontWeight: 600,
                fontSize: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(163,166,255,0.1)',
                transition: 'box-shadow 0.2s, transform 0.1s',
                '&:hover': { boxShadow: '0 4px 20px rgba(163,166,255,0.2)' },
                '&:active': { transform: 'scale(0.98)' },
              }}
            >
              Add Note
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
