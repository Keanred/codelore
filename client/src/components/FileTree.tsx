import { FileResponse } from '@codelore/schemas';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
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
  onClick?: () => void;
  children: React.ReactNode;
}

const Row = ({ indent = 0, active = false, dimmed = false, onClick, children }: RowProps) => (
  <Box
    onClick={onClick}
    sx={{
      pl: 1.5 + indent * 2,
      pr: 1.5,
      py: 0.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
      opacity: dimmed ? 0.6 : 1,
      color: active ? '#c7d2fe' : '#a3aac4',
      fontWeight: active ? 600 : 400,
      bgcolor: active ? 'rgba(99,102,241,0.18)' : 'transparent',
      borderLeft: active ? '2px solid #818cf8' : '2px solid transparent',
      transition: 'background-color 0.15s',
      '&:hover': { bgcolor: active ? 'rgba(99,102,241,0.22)' : '#192540' },
    }}
  >
    {children}
  </Box>
);

// ─── File icon helper ───────────────────────────────────────────────────────────

const FILE_ICONS: Record<string, string> = {
  ts: 'code',
  tsx: 'code',
  js: 'code',
  jsx: 'code',
  json: 'settings',
  md: 'article',
  css: 'palette',
  scss: 'palette',
  html: 'html',
  svg: 'image',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  webp: 'image',
};

const fileIcon = (name: string): string => {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return FILE_ICONS[ext] ?? 'description';
};

// ─── FileTree ─────────────────────────────────────────────────────────────────

type TreeNode = { name: string; path: string; children: TreeNode[] };

const flatPathsToTree = (paths: string[]): TreeNode[] => {
  const root: TreeNode = { name: '', path: '', children: [] };

  for (const fullPath of paths) {
    const parts = fullPath.split('/');
    let currentNode = root;

    for (const part of parts) {
      let childNode = currentNode.children.find((child) => child.name === part);
      if (!childNode) {
        childNode = { name: part, path: currentNode.path ? `${currentNode.path}/${part}` : part, children: [] };
        currentNode.children.push(childNode);
      }
      currentNode = childNode;
    }
  }

  return root.children;
};

type FileTreeProps = {
  files: FileResponse[];
  selectedFileId: string | null;
  onSelect: (file: FileResponse) => void;
};
export const FileTree = ({ files, selectedFileId, onSelect }: FileTreeProps) => {
  const tree = flatPathsToTree(files.map((file) => file.path));
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderTree = (nodes: TreeNode[], indent = 0): React.ReactNode[] => {
    return nodes.flatMap((node) => {
      const isFolder = node.children.length > 0;
      const isExpanded = expanded.has(node.path);
      const file = !isFolder ? files.find((f) => f.path === node.path) : undefined;
      return [
        <Row
          key={node.path}
          indent={indent}
          active={node.path === selectedFileId}
          onClick={() => (isFolder ? toggleFolder(node.path) : file && onSelect(file))}
        >
          {isFolder ? <Arrow expanded={isExpanded} /> : <ArrowSpacer />}
          <Icon
            name={isFolder ? 'folder' : fileIcon(node.name)}
            filled={isFolder}
            style={{ fontSize: 16, flexShrink: 0, color: isFolder ? '#a3a6ff' : undefined }}
          />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.name}</span>
        </Row>,
        ...(isFolder && isExpanded ? renderTree(node.children, indent + 1) : []),
      ];
    });
  };

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
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
        {renderTree(tree)}
      </Box>
    </Box>
  );
};

// ─── Example Usage ───────────────────────────────────────────────────────────

export const ExampleFileTree = () => {
  return (
    <Box
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
