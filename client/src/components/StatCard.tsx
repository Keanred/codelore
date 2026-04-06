import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

interface StatCardProps {
  label: string;
  icon: string;
  value: string | number;
  footer?: React.ReactNode;
}

export const StatCard = ({ label, icon, value, footer }: StatCardProps) => {
  return (
    <Box
      sx={{
        bgcolor: '#091328',
        p: 3,
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        '&:hover .stat-card-icon': { opacity: 0.2 },
      }}
    >
      {/* Decorative background icon */}
      <Box
        className="stat-card-icon"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          opacity: 0.1,
          transition: 'opacity 0.2s',
          pointerEvents: 'none',
        }}
      >
        <Icon name={icon} filled style={{ fontSize: 64, color: '#dee5ff' }} />
      </Box>

      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 500,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '2.25rem',
          fontWeight: 700,
          color: '#fff',
          mt: 1,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      {footer && <Box sx={{ mt: 2 }}>{footer}</Box>}
    </Box>
  );
};
