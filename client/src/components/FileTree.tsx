import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

// ─── Tree row helpers ─────────────────────────────────────────────────────────

const Arrow = ({ expanded }: { expanded?: boolean }) => (
  <Icon name={expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} style={{ fontSize: 16, flexShrink: 0 }} />
);

const ArrowSpacer = () => <Box sx={{ width: 16, height: 16, flexShrink: 0 }} />;

interface RowProps {
  indent?: number;
  active?: boolean;
  dimmed?: boolean;
  children: React.ReactNode;
}

const Row = ({ indent = 0, active = false, dimmed = false, children }: RowProps) => (
  <Box
    sx={{
      pl: 1.5 + indent * 2,
      pr: 1.5,
      py: 0.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
      opacity: dimmed ? 0.6 : 1,
      color: active ? '#818cf8' : '#a3aac4',
      bgcolor: active ? 'rgba(163,166,255,0.05)' : 'transparent',
      borderLeft: active ? '2px solid #a3a6ff' : '2px solid transparent',
      transition: 'background-color 0.15s',
      '&:hover': { bgcolor: active ? 'rgba(163,166,255,0.05)' : '#192540' },
    }}
  >
    {children}
  </Box>
);

// ─── FileTree ─────────────────────────────────────────────────────────────────

export const FileTree = () => {
  return (
    <Box
      component="section"
      sx={{
        width: 256,
        flexShrink: 0,
        bgcolor: '#091328',
        borderRight: '1px solid rgba(64,72,93,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(64,72,93,0.1)',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a3aac4',
          }}
        >
          Explorer
        </Typography>
        <Icon name="more_horiz" style={{ fontSize: 16, color: '#64748b' }} />
      </Box>

      {/* Tree */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 1,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}
      >
        {/* src/ — expanded folder */}
        <Row>
          <Arrow expanded />
          <Icon name="folder" filled style={{ fontSize: 16, color: '#a3a6ff', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>src</span>
        </Row>

        {/* src/components/ */}
        <Row indent={1}>
          <ArrowSpacer />
          <Icon name="folder" filled style={{ fontSize: 16, color: '#69f6b8', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>components</span>
        </Row>

        {/* src/MainRouter.tsx — active */}
        <Row indent={1} active>
          <ArrowSpacer />
          <Icon name="code" style={{ fontSize: 16, color: '#a3a6ff', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>MainRouter.tsx</span>
        </Row>

        {/* src/types.d.ts — dimmed */}
        <Row indent={1} dimmed>
          <ArrowSpacer />
          <Icon name="description" style={{ fontSize: 16, flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>types.d.ts</span>
        </Row>

        {/* public/ — collapsed */}
        <Row>
          <Arrow />
          <Icon name="folder" filled style={{ fontSize: 16, color: '#a3a6ff', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>public</span>
        </Row>

        {/* tests/ — collapsed */}
        <Row>
          <Arrow />
          <Icon name="folder" filled style={{ fontSize: 16, color: '#a3a6ff', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>tests</span>
        </Row>

        {/* package.json */}
        <Row>
          <ArrowSpacer />
          <Icon name="settings" style={{ fontSize: 16, color: '#ff9dd1', flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>package.json</span>
        </Row>
      </Box>
    </Box>
  );
};
