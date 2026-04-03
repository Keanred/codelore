import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AppLayout, Icon } from '../components/AppLayout';

// ─── Constants ────────────────────────────────────────────────────────────────

// eslint-disable-next-line max-len
const FELIX_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDmEFLqs2KsI-ysYHSfoqNFFMdXg1SRZydeM0x1Q0f4A4mvAMzhdZeyrmEiNf9CE6aCuITtMlyn0GxmFLwchqhDC3YfdoBBIyBr2OCpTD-9HW31bb5_I_sV6qTokdX2QG4uOeQRPeTZTSdCZHTfQUpZ5l4wCxm4JsYMsG7lVbq-NG1HLIc47GefzXVDJjEu9U0RXAINI21ySRclTEg39Jy_PDaCzv7Gr1UXZYApH_esodtDAi1dk_WY6yRobSDrZMDxRqceuhgC3Dc';
// eslint-disable-next-line max-len
const SARAH_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4wkMS7FGYnFhz4QBPdAcRdQpxCNOwZy0MzKKnJ6_evChuPtpAaItLgzfUJSrM1BIAdtoNF16ZMZ9mML7w3bl8u4790UcXNkr-GQ3ttONw-5ziJ4KLOiGi6_pWWf6NtNt7A99x-TA1-fhH65xhy2rO07EAUu6b87YjdyQj0VvW1iaCCJKCkQm2TJtpwM3uNLWCb7oxB2hedmCwZ1EW28LrQI_ru2CWQEQDgQ6egbZp2Z-C7rj9R2t20eZZTW9Ob-r7JFytUUE8piI';

// ─── Highlight helper ─────────────────────────────────────────────────────────

const Hi = ({ children }: { children: React.ReactNode }) => (
  <Box component="mark" sx={{ bgcolor: 'rgba(163,166,255,0.2)', color: '#a3a6ff', borderRadius: '2px', px: 0.25 }}>
    {children}
  </Box>
);

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: string;
  title: string;
  count: number;
  shortcut: string;
}

const SectionHeader = ({ icon, title, count, shortcut }: SectionHeaderProps) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
    <Stack direction="row" alignItems="center" gap={1.5}>
      <Box sx={{ color: '#818CF8', fontSize: 20, display: 'flex' }}>
        <Icon name={icon} />
      </Box>
      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: '#dee5ff',
          fontSize: '1rem',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          px: 1,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: 'rgba(163,166,255,0.15)',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#a3a6ff',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {count} Found
      </Box>
    </Stack>
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: '4px',
        bgcolor: '#141f38',
        fontSize: '0.65rem',
        color: '#64748B',
        fontFamily: "'JetBrains Mono', monospace",
        border: '1px solid rgba(64,72,93,0.3)',
      }}
    >
      {shortcut}
    </Box>
  </Stack>
);

// ─── File Result Card ─────────────────────────────────────────────────────────

interface FileResultCardProps {
  filename: string;
  ext: string;
  path: string;
  preview: React.ReactNode;
}

const FileResultCard = ({ filename, ext, path, preview }: FileResultCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      gap={1.5}
      sx={{ px: 3, py: 2, bgcolor: '#0f1930', borderBottom: '1px solid rgba(64,72,93,0.1)' }}
    >
      <Box sx={{ fontSize: 18, color: '#818CF8', display: 'flex' }}>
        <Icon name="description" />
      </Box>
      <Typography
        sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#dee5ff' }}
      >
        {filename}
      </Typography>
      <Box
        sx={{
          px: 0.75,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: 'rgba(99,102,241,0.2)',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: '#818CF8',
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}
      >
        {ext}
      </Box>
      <Typography sx={{ ml: 'auto', fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
        {path}
      </Typography>
    </Stack>
    <Box
      sx={{
        p: 3,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.8rem',
        color: '#a3aac4',
        lineHeight: 1.8,
      }}
    >
      {preview}
    </Box>
  </Box>
);

// ─── Commit Card ──────────────────────────────────────────────────────────────

interface CommitCardProps {
  hash: string;
  message: React.ReactNode;
  author: string;
  handle: string;
  avatar: string;
  time: string;
}

const CommitCard = ({ hash, message, author, handle, avatar, time }: CommitCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      p: 3,
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack direction="row" alignItems="flex-start" gap={2}>
      <Box
        sx={{
          px: 1,
          py: 0.25,
          borderRadius: '4px',
          bgcolor: '#1f2b49',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          color: '#a3a6ff',
          fontWeight: 700,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {hash}
      </Box>
      <Box flex={1}>
        <Typography sx={{ fontSize: '0.9rem', color: '#dee5ff', fontWeight: 500, mb: 1.5 }}>{message}</Typography>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box
            component="img"
            src={avatar}
            alt={`${author} avatar`}
            sx={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#dee5ff' }}>{author}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>
            {handle}
          </Typography>
          <Typography
            sx={{ ml: 'auto', fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {time}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

// ─── Note Card ────────────────────────────────────────────────────────────────

interface NoteCardProps {
  title: string;
  path: string;
  excerpt: string;
}

const NoteCard = ({ title, path, excerpt }: NoteCardProps) => (
  <Box
    sx={{
      bgcolor: '#091328',
      borderRadius: '12px',
      border: '1px solid rgba(64,72,93,0.1)',
      p: 3,
      cursor: 'pointer',
      '&:hover': { borderColor: 'rgba(163,166,255,0.3)' },
      transition: 'border-color 0.2s',
    }}
  >
    <Stack direction="row" alignItems="center" gap={1.5} mb={1.5}>
      <Box sx={{ fontSize: 20, color: '#ff9dd1', display: 'flex' }}>
        <Icon name="sticky_note_2" />
      </Box>
      <Typography
        sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#dee5ff', fontSize: '1rem' }}
      >
        {title}
      </Typography>
    </Stack>
    <Typography sx={{ fontSize: '0.7rem', color: '#64748B', fontFamily: "'JetBrains Mono', monospace", mb: 1.5 }}>
      {path}
    </Typography>
    <Typography component="p" sx={{ fontSize: '0.85rem', color: '#a3aac4', fontStyle: 'italic', lineHeight: 1.7 }}>
      {excerpt}
    </Typography>
  </Box>
);

// ─── Search Page ──────────────────────────────────────────────────────────────

export const SearchPage = () => (
  <AppLayout sidebarActive="Search" topNavActive="View">
    <Box sx={{ p: 4, maxWidth: 896, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Search input */}
      <Box
        sx={{
          bgcolor: '#091328',
          borderRadius: '16px',
          border: '1px solid rgba(99,102,241,0.3)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 0 40px rgba(99,102,241,0.15)',
        }}
      >
        <Box sx={{ color: '#818CF8', fontSize: 24, display: 'flex', flexShrink: 0 }}>
          <Icon name="search" />
        </Box>
        <InputBase
          value="codelore_engine_v2"
          readOnly
          fullWidth
          inputProps={{
            style: {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.1rem',
              color: '#dee5ff',
            },
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          gap={0.75}
          sx={{ flexShrink: 0, color: '#64748B', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}
        >
          <Box
            component="kbd"
            sx={{
              px: 1,
              py: 0.25,
              bgcolor: '#141f38',
              borderRadius: '4px',
              border: '1px solid rgba(64,72,93,0.4)',
              fontSize: '0.75rem',
              color: '#94A3B8',
              fontFamily: 'inherit',
            }}
          >
            ESC
          </Box>
          <span>to close</span>
        </Stack>
      </Box>

      {/* Files section */}
      <Box>
        <SectionHeader icon="folder_open" title="Files" count={12} shortcut="⌘1" />
        <Stack gap={2}>
          <FileResultCard
            filename="codelore_engine_v2.py"
            ext=".py"
            path="src/core/models/"
            preview={
              <>
                <div>
                  <Box component="span" sx={{ color: '#69f6b8' }}>
                    class
                  </Box>{' '}
                  <Hi>codelore_engine_v2</Hi>
                  <Box component="span" sx={{ color: '#64748B' }}>
                    :
                  </Box>
                </div>
                <div>
                  {'  '}
                  <Box component="span" sx={{ color: '#64748B' }}>
                    {`"""Core lore extraction engine v2."""`}
                  </Box>
                </div>
                <div>
                  {'  '}
                  <Box component="span" sx={{ color: '#69f6b8' }}>
                    def
                  </Box>{' '}
                  <Box component="span" sx={{ color: '#a3a6ff' }}>
                    __init__
                  </Box>
                  (self, config):
                </div>
              </>
            }
          />
          <FileResultCard
            filename="codelore_engine_v2.test.ts"
            ext=".ts"
            path="tests/unit/"
            preview={
              <>
                <div>
                  <Box component="span" sx={{ color: '#a3a6ff' }}>
                    describe
                  </Box>
                  {"('"}
                  <Hi>codelore_engine_v2</Hi>
                  {"', () => {"}
                </div>
                <div>
                  {'  '}
                  <Box component="span" sx={{ color: '#a3a6ff' }}>
                    it
                  </Box>
                  {"('should initialize correctly', () => {"}
                </div>
              </>
            }
          />
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(64,72,93,0.15)' }} />

      {/* Commits section */}
      <Box>
        <SectionHeader icon="commit" title="Commits" count={4} shortcut="⌘2" />
        <Stack gap={2}>
          <CommitCard
            hash="af39c1d"
            message={
              <>
                Refactor{' '}
                <Box component="span" sx={{ color: '#a3a6ff' }}>
                  codelore_engine_v2
                </Box>{' '}
                core loops
              </>
            }
            author="Felix"
            handle="@architect"
            avatar={FELIX_AVATAR}
            time="2 days ago"
          />
          <CommitCard
            hash="cc0192e"
            message={
              <>
                Initial prototype for{' '}
                <Box component="span" sx={{ color: '#a3a6ff' }}>
                  codelore_engine_v2
                </Box>
              </>
            }
            author="Sarah"
            handle="@lead-dev"
            avatar={SARAH_AVATAR}
            time="5 days ago"
          />
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(64,72,93,0.15)' }} />

      {/* Notes section */}
      <Box>
        <SectionHeader icon="sticky_note_2" title="Notes" count={2} shortcut="⌘3" />
        <NoteCard
          title="V2 Architecture Specs"
          path="docs/architecture/engine.md"
          // eslint-disable-next-line max-len
          excerpt="The codelore_engine_v2 introduces a fully async pipeline for semantic node extraction. It separates the tokenisation layer from the AST traversal engine, allowing parallel processing of large repositories with improved memory efficiency."
        />
      </Box>

      {/* Bottom shortcuts bar */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: '#060e20',
          borderTop: '1px solid rgba(64,72,93,0.15)',
          py: 1.5,
          mt: 2,
        }}
      >
        <Stack direction="row" justifyContent="center" gap={4}>
          {[
            { key: '↑↓', label: 'Navigate' },
            { key: '↵', label: 'Select' },
            { key: '⌘ F', label: 'Filter' },
          ].map(({ key, label }) => (
            <Stack key={label} direction="row" alignItems="center" gap={1}>
              <Box
                component="kbd"
                sx={{
                  px: 1,
                  py: 0.25,
                  bgcolor: '#141f38',
                  borderRadius: '4px',
                  border: '1px solid rgba(64,72,93,0.4)',
                  fontSize: '0.75rem',
                  color: '#a3a6ff',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {key}
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>{label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  </AppLayout>
);
