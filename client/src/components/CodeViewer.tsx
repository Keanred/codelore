import Box from '@mui/material/Box';
import { Icon } from './Icon';

// ─── Token types & colors ─────────────────────────────────────────────────────

type Token = [color: string, text: string];

const K = '#6063ee'; // keyword
const S = '#69f6b8'; // string
const C = '#a3a6ff'; // component / tag
const F = '#ff9dd1'; // function name
const CM = '#a3aac4'; // comment
const T = '#cbd5e1'; // plain text

// Each line is an array of [color, text] tuples
const LINES: Token[][] = [
  [
    [K, 'import'],
    [T, ' { Router, Route } '],
    [K, 'from'],
    [T, ' '],
    [S, "'@codelore/router'"],
    [T, ';'],
  ],
  [
    [K, 'import'],
    [T, ' { Dashboard } '],
    [K, 'from'],
    [T, ' '],
    [S, "'./pages/Dashboard'"],
    [T, ';'],
  ],
  [[T, '']],
  [[CM, '// Initializing the main application hub']],
  [
    [K, 'export const'],
    [T, ' '],
    [F, 'AppRouter'],
    [T, ' = () => {'],
  ],
  [
    [T, '    '],
    [K, 'return'],
    [T, ' ('],
  ],
  [
    [T, '        <'],
    [C, 'Router'],
    [T, '>'],
  ],
  [
    [T, '            <'],
    [C, 'Route'],
    [T, ' path='],
    [S, '"/"'],
    [T, ' element={<'],
    [C, 'Dashboard'],
    [T, ' />} />'],
  ],
  [
    [T, '            <'],
    [C, 'Route'],
    [T, ' path='],
    [S, '"/repos"'],
    [T, ' element={<'],
    [C, 'RepoList'],
    [T, ' />} />'],
  ],
  [
    [T, '            <'],
    [C, 'Route'],
  ],
  [
    [T, '                path='],
    [S, '"/settings"'],
  ],
  [
    [T, '                element={<'],
    [C, 'Settings'],
    [T, ' />}'],
  ],
  [
    [T, '                permission='],
    [S, '"admin"'],
  ],
  [[T, '            />']],
  [
    [T, '        </'],
    [C, 'Router'],
    [T, '>'],
  ],
  [[T, '    );']],
  [[T, '};']],
  [[T, '']],
  [[CM, '/* TODO: Implement recursive path matching for nested directories */']],
];

// ─── CodeViewer ───────────────────────────────────────────────────────────────

export const CodeViewer = () => {
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#000000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Tab bar */}
      <Box
        sx={{
          height: 40,
          bgcolor: '#091328',
          display: 'flex',
          alignItems: 'flex-end',
          px: 2,
          borderBottom: '1px solid rgba(64,72,93,0.1)',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            bgcolor: '#000000',
            borderTop: '2px solid #a3a6ff',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: '#dee5ff',
          }}
        >
          <Icon name="code" style={{ fontSize: 14, color: '#a3a6ff' }} />
          <span>MainRouter.tsx</span>
          <Icon name="close" style={{ fontSize: 12, color: '#64748b', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* Code area */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'auto', p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Line numbers */}
          <Box
            sx={{
              color: '#475569',
              textAlign: 'right',
              userSelect: 'none',
              pr: 2,
              borderRight: '1px solid rgba(64,72,93,0.1)',
              minWidth: '1.75rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
              flexShrink: 0,
            }}
          >
            {LINES.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </Box>

          {/* Tokens */}
          <Box
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
              color: '#cbd5e1',
              m: 0,
              flex: 1,
            }}
          >
            {LINES.map((line, lineIdx) => (
              <div key={lineIdx} style={{ whiteSpace: 'pre' }}>
                {line.length === 0 || (line.length === 1 && line[0][1] === '')
                  ? '\u00A0'
                  : line.map(([color, text], i) => (
                      <span key={i} style={{ color }}>
                        {text}
                      </span>
                    ))}
              </div>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Ambient gradient */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 256,
          height: 256,
          bgcolor: 'rgba(163,166,255,0.05)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};
