import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { SideNavBar } from '../components/SideNavBar';
import { ThreadModal } from '../components/ThreadModal';

// ─── Nav data ─────────────────────────────────────────────────────────────────

const topTabs = ['Explorer', 'Architecture', 'Debugger'];

// ─── Code line type ───────────────────────────────────────────────────────────

type NoteIcon = 'thread' | 'note';
type LineData = { highlighted?: boolean; noteIcon?: NoteIcon; jsx: React.ReactNode };

// ─── Syntax-highlighted code lines ───────────────────────────────────────────

const LINE: LineData[] = [
  {
    jsx: (
      <>
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          import
        </Box>
        {' { '}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          AuthContext
        </Box>
        {' } '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          from
        </Box>{' '}
        <Box component="span" sx={{ color: '#ff9dd1' }}>
          &quot;@core/auth&quot;
        </Box>
        {';'}
      </>
    ),
  },
  {
    jsx: (
      <>
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          import
        </Box>
        {' { '}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          useService
        </Box>
        {' } '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          from
        </Box>{' '}
        <Box component="span" sx={{ color: '#ff9dd1' }}>
          &quot;@hooks/useService&quot;
        </Box>
        {';'}
      </>
    ),
  },
  { jsx: <span>&nbsp;</span> },
  {
    jsx: (
      <Box component="span" sx={{ color: '#475569', fontStyle: 'italic' }}>
        {'// Initialize the neural authentication layer'}
      </Box>
    ),
  },
  {
    jsx: (
      <>
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          export const
        </Box>{' '}
        <Box component="span" sx={{ color: '#a3a6ff' }}>
          AuthModule
        </Box>
        {' = () => {'}
      </>
    ),
  },
  {
    jsx: (
      <>
        {'  '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          const
        </Box>
        {' { '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          session
        </Box>
        {', '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          encrypt
        </Box>
        {' } = '}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          useService
        </Box>
        {'('}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          AuthContext
        </Box>
        {');'}
      </>
    ),
  },
  { jsx: <span>&nbsp;</span> },
  {
    jsx: (
      <>
        {'  '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          const
        </Box>{' '}
        <Box component="span" sx={{ color: '#a3a6ff' }}>
          validateNode
        </Box>
        {' = '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          async
        </Box>
        {' ('}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          id
        </Box>
        {': '}
        <Box component="span" sx={{ color: '#ff9dd1' }}>
          string
        </Box>
        {') => {'}
      </>
    ),
  },
  {
    highlighted: true,
    noteIcon: 'thread',
    jsx: (
      <>
        {'    '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          const
        </Box>{' '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          result
        </Box>
        {' = '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          await
        </Box>{' '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          session
        </Box>
        {'.'}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          verify
        </Box>
        {'('}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          id
        </Box>
        {');'}
      </>
    ),
  },
  {
    jsx: (
      <>
        {'    '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          if
        </Box>
        {' (!'}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          result
        </Box>
        {') '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          throw new
        </Box>{' '}
        <Box component="span" sx={{ color: '#69f6b8' }}>
          Error
        </Box>
        {'('}
        <Box component="span" sx={{ color: '#ff9dd1' }}>
          &quot;Neural handshake failed&quot;
        </Box>
        {');'}
      </>
    ),
  },
  {
    jsx: (
      <>
        {'    '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          return
        </Box>{' '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          encrypt
        </Box>
        {'('}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          result
        </Box>
        {'.'}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          payload
        </Box>
        {');'}
      </>
    ),
  },
  {
    noteIcon: 'note',
    jsx: <span>{'  };'}</span>,
  },
  { jsx: <span>&nbsp;</span> },
  {
    jsx: (
      <>
        {'  '}
        <Box component="span" sx={{ color: '#818cf8', fontStyle: 'italic' }}>
          return
        </Box>
        {' { '}
        <Box component="span" sx={{ color: '#dee5ff' }}>
          validateNode
        </Box>
        {' };'}
      </>
    ),
  },
  { jsx: <span>{'};'}</span> },
];

// ─── Code Explorer Page ───────────────────────────────────────────────────────

export const CodeExplorerPage = () => {
  const [threadOpen, setThreadOpen] = useState(false);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        bgcolor: '#060e20',
        color: '#dee5ff',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SideNavBar />
      <ThreadModal open={threadOpen} onClose={() => setThreadOpen(false)} />

      {/* ── Main area ── */}
      <Box sx={{ ml: '256px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Nav */}
        <Box
          component="header"
          sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            px: 3,
            bgcolor: 'rgba(6,14,32,0.8)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(99,102,241,0.15)',
            zIndex: 40,
            flexShrink: 0,
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Stack direction="row" alignItems="center" gap={4} sx={{ flex: 1 }}>
            {/* Search */}
            <Box sx={{ position: 'relative', flex: 1, maxWidth: 448 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#475569',
                  fontSize: 18,
                  display: 'flex',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                <Icon name="search" />
              </Box>
              <Box
                component="input"
                placeholder="Search architecture or files..."
                sx={{
                  width: '100%',
                  bgcolor: '#141f38',
                  border: 'none',
                  borderRadius: '6px',
                  py: '8px',
                  pl: '40px',
                  pr: '16px',
                  fontSize: '0.875rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#dee5ff',
                  outline: 'none',
                  display: 'block',
                  '&::placeholder': { color: '#475569' },
                  '&:focus': { boxShadow: '0 0 0 1px rgba(99,102,241,0.5)' },
                }}
              />
            </Box>

            {/* Tabs */}
            <Stack direction="row" alignItems="center" gap={3}>
              {topTabs.map((tab) => {
                const active = tab === 'Explorer';
                return (
                  <Box
                    key={tab}
                    component="a"
                    href="#"
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: active ? '#818cf8' : '#94a3b8',
                      borderBottom: active ? '2px solid #818cf8' : '2px solid transparent',
                      pb: '6px',
                      textDecoration: 'none',
                      display: { xs: 'none', lg: 'block' },
                      transition: 'color 0.2s',
                      '&:hover': active ? {} : { color: '#c7d2fe' },
                    }}
                  >
                    {tab}
                  </Box>
                );
              })}
            </Stack>
          </Stack>

          {/* Right actions */}
          <Stack direction="row" alignItems="center" gap={1}>
            {['notifications', 'account_tree', 'cloud_done'].map((icon) => (
              <Box
                key={icon}
                component="button"
                sx={{
                  p: 1,
                  bgcolor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: icon === 'cloud_done' ? '#818cf8' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  fontSize: 20,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Icon name={icon} />
              </Box>
            ))}
            <Box
              component="button"
              sx={{
                px: 2,
                py: 1,
                bgcolor: '#a3a6ff',
                color: '#0f00a4',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(163,166,255,0.2)',
                transition: 'transform 0.1s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              Sync All
            </Box>
          </Stack>
        </Box>

        {/* Editor + right panel */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* ── File editor ── */}
          <Box
            component="section"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              bgcolor: '#030816',
              position: 'relative',
            }}
          >
            {/* File tabs bar */}
            <Box
              sx={{
                height: 40,
                bgcolor: '#0f1930',
                display: 'flex',
                alignItems: 'flex-end',
                px: 2,
                gap: 1,
                borderBottom: '1px solid rgba(64,72,93,0.15)',
                flexShrink: 0,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1.5,
                  height: '100%',
                  bgcolor: '#030816',
                  borderTop: '2px solid #6063ee',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#dee5ff',
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ fontSize: 16, color: '#818cf8', display: 'flex' }}>
                  <Icon name="description" />
                </Box>
                AuthModule.ts
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1.5,
                  height: '100%',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#475569',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#141f38' },
                }}
              >
                <Box sx={{ fontSize: 16, display: 'flex' }}>
                  <Icon name="description" />
                </Box>
                README.md
              </Stack>
            </Box>

            {/* Code content */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.875rem',
                lineHeight: 1.5,
                p: 2,
                display: 'flex',
              }}
            >
              {/* Line numbers */}
              <Box
                sx={{
                  width: 48,
                  flexShrink: 0,
                  textAlign: 'right',
                  color: '#2d3748',
                  userSelect: 'none',
                  borderRight: '1px solid rgba(64,72,93,0.1)',
                  mr: 2,
                  pr: 1.5,
                }}
              >
                {LINE.map((line, i) => (
                  <Box
                    key={i}
                    sx={{
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      position: 'relative',
                      fontSize: '0.875rem',
                    }}
                  >
                    {line.noteIcon === 'thread' && (
                      <Box
                        component="button"
                        onClick={() => setThreadOpen(true)}
                        sx={{
                          position: 'absolute',
                          right: -10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#818cf8',
                          bgcolor: '#030816',
                          borderRadius: '50%',
                          display: 'flex',
                          p: 0,
                          fontSize: '0.625rem',
                          zIndex: 2,
                        }}
                      >
                        <Icon name="psychology" />
                      </Box>
                    )}
                    {line.noteIcon === 'note' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: -10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(129,140,248,0.6)',
                          bgcolor: '#030816',
                          borderRadius: '50%',
                          display: 'flex',
                          fontSize: '0.625rem',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      >
                        <Icon name="sticky_note_2" />
                      </Box>
                    )}
                    {i + 1}
                  </Box>
                ))}
              </Box>

              {/* Code */}
              <Box sx={{ flex: 1, color: '#94a3b8' }}>
                {LINE.map((line, i) => (
                  <Box
                    key={i}
                    sx={{
                      height: 24,
                      whiteSpace: 'pre',
                      display: 'flex',
                      alignItems: 'center',
                      ...(line.highlighted
                        ? {
                            bgcolor: 'rgba(99,102,241,0.1)',
                            borderLeft: '2px solid #818cf8',
                            pl: 1,
                            ml: -1,
                          }
                        : {}),
                    }}
                  >
                    {line.jsx}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ── Right panel: Notes ── */}
          <Box
            component="aside"
            sx={{
              width: 320,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#060e20',
              borderLeft: '1px solid rgba(64,72,93,0.15)',
            }}
          >
            {/* Tab header — Notes active */}
            <Box sx={{ display: 'flex', borderBottom: '1px solid rgba(64,72,93,0.15)', flexShrink: 0 }}>
              <Box
                component="button"
                sx={{
                  flex: 1,
                  py: 2,
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#475569',
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#94a3b8' },
                }}
              >
                Commits
              </Box>
              <Box
                component="button"
                sx={{
                  flex: 1,
                  py: 2,
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#818cf8',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '2px solid #818cf8',
                  bgcolor: 'rgba(99,102,241,0.05)',
                  cursor: 'pointer',
                }}
              >
                Notes
              </Box>
            </Box>

            {/* Notes list */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#475569',
                  }}
                >
                  Notes on this File
                </Typography>
                <Typography sx={{ fontSize: '0.625rem', color: '#69f6b8' }}>3 active</Typography>
              </Stack>

              <Stack gap={3}>
                {/* Line 9 group */}
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      mb: 1.5,
                      display: 'inline-flex',
                      px: 1,
                      py: 0.5,
                      bgcolor: 'rgba(99,102,241,0.1)',
                      borderRadius: '2px',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '0.5625rem', fontFamily: "'JetBrains Mono', monospace", color: '#c7d2fe' }}
                    >
                      line: 9
                    </Typography>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#818cf8' }} />
                    <Typography
                      sx={{ fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', color: '#818cf8' }}
                    >
                      2 Notes
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: '#141f38',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <Stack gap={2}>
                      {/* Sarah Chen */}
                      <Box sx={{ pb: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                          <Stack direction="row" alignItems="center" gap={1}>
                            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#475569' }} />
                            <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: '#fff' }}>
                              Sarah Chen
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>12m ago</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: '0.6875rem', color: '#cbd5e1' }}>
                          Needs retry logic for intermittent drops.
                        </Typography>
                      </Box>
                      {/* Alex Rivera */}
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                          <Stack direction="row" alignItems="center" gap={1}>
                            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#6063ee' }} />
                            <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: '#fff' }}>
                              Alex Rivera
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>5m ago</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: '0.6875rem', color: '#cbd5e1' }}>
                          Let&apos;s implement exponential backoff.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                {/* Line 12 group */}
                <Box>
                  <Box
                    sx={{ mb: 1.5, display: 'inline-flex', px: 1, py: 0.5, bgcolor: '#141f38', borderRadius: '2px' }}
                  >
                    <Typography
                      sx={{ fontSize: '0.5625rem', fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}
                    >
                      line: 12
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: '#141f38',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#6063ee' }} />
                        <Typography sx={{ fontSize: '0.625rem', fontWeight: 700, color: '#fff' }}>
                          Alex Rivera
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>Yesterday</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.6875rem', color: '#cbd5e1' }}>
                      Verify if &apos;encrypt&apos; handles null payloads gracefully.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* New note textarea */}
            <Box
              sx={{
                p: 2,
                bgcolor: '#0f1930',
                borderTop: '1px solid rgba(64,72,93,0.15)',
                flexShrink: 0,
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="textarea"
                  placeholder="Add architectural note..."
                  rows={4}
                  sx={{
                    width: '100%',
                    bgcolor: '#000',
                    border: '1px solid rgba(64,72,93,0.2)',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#dee5ff',
                    p: '12px',
                    pr: '44px',
                    resize: 'none',
                    outline: 'none',
                    display: 'block',
                    boxSizing: 'border-box',
                    '&::placeholder': { color: '#475569' },
                    '&:focus': { boxShadow: '0 0 0 1px rgba(99,102,241,0.5)' },
                  }}
                />
                <Box
                  component="button"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 32,
                    height: 32,
                    borderRadius: '4px',
                    bgcolor: '#a3a6ff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f00a4',
                    fontSize: 18,
                  }}
                >
                  <Icon name="arrow_upward" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Border overlay */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', border: '1px solid rgba(64,72,93,0.05)' }} />
    </Box>
  );
};
