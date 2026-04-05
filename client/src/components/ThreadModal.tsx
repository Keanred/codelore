import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Icon } from './Icon';

const SARAH_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVHMuIX85xwoO7M1qzBF-Jj-UBGC0gE2Y5lhWVLZpNuM-dzdevuWZUrUrWIpgouGJJH8wZlS49iKW48MIYuypwHDh7l5X00yP3uTNUDBqX4MFaqmech0hsQrnnjt__dVdh8AnvezEpa6I_OgmJA9ifaK9aSV1g3-SKCeiRpAQFRvPbFAW7ttm1FikRv2pd3AtgAiB5ClhBMDvDSZ-47PIdDM7vlKTVfNG8WVqpeKLnOTjtXtZrHh1D-zLl5RXviHlfJ0pKud6FmSc'; // eslint-disable-line max-len

const ALEX_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbX6gJBIrxZBlX5jGtE9GDheeCsiVL86EP2Hnk11GLfvqyiMRKGPxFA8ES3YOvBxj_Or7fpyvW3Qlh8CBYaJtIFHjnWQruyWkvBdw9k-aA8EIvNODAXJiXLyXc2P-iqD7TaB2BEpLqgZBQvcy78WAPzpdM370Yt03rKr5nIN_sEMwSDJusfLtG6KWZ-YH5L_wLT9diRX1ooGGB3j366wSZJLaeML8KGIJYPb-_EvXqMhYCSUNMAr6cXIyIKEsmthdMn0B4qsurGDI'; // eslint-disable-line max-len

export interface ThreadModalProps {
  open: boolean;
  onClose: () => void;
}

export function ThreadModal({ open, onClose }: ThreadModalProps) {
  if (!open) return null;
  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: 480,
          maxWidth: '90vw',
          bgcolor: '#141f38',
          borderRadius: '12px',
          border: '1px solid rgba(99,102,241,0.2)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: 'rgba(99,102,241,0.05)',
            px: 3,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#818cf8',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Thread: Node Verification
          </Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography sx={{ fontSize: '0.5625rem', color: '#475569', fontStyle: 'italic' }}>
              2 participants
            </Typography>
            <Box
              component="button"
              onClick={onClose}
              sx={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#475569',
                display: 'flex',
                fontSize: 18,
                p: 0,
                '&:hover': { color: '#dee5ff' },
              }}
            >
              <Icon name="close" />
            </Box>
          </Stack>
        </Box>

        {/* Messages */}
        <Stack gap={3} sx={{ p: 3 }}>
          {/* Sarah Chen */}
          <Stack direction="row" gap={1.5}>
            <Box
              component="img"
              src={SARAH_AVATAR}
              alt="Sarah Chen"
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Sarah Chen</Typography>
                <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>12m ago</Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Handshake validation needs retry logic for intermittent node drops. We&apos;re seeing ~2% failure in
                production clusters.
              </Typography>
            </Box>
          </Stack>

          {/* Alex Rivera reply */}
          <Box sx={{ pl: 3, borderLeft: '1px solid rgba(99,102,241,0.2)' }}>
            <Stack direction="row" gap={1.5}>
              <Box
                component="img"
                src={ALEX_AVATAR}
                alt="Alex Rivera"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Alex Rivera</Typography>
                  <Typography sx={{ fontSize: '0.5625rem', color: '#475569' }}>5m ago</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Agreed. Let&apos;s implement an exponential backoff strategy here. @Sarah can you draft the interface
                  changes?
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* Reply input */}
        <Box
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: 'rgba(0,0,0,0.2)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Box
            component="input"
            placeholder="Reply to thread..."
            sx={{
              width: '100%',
              bgcolor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.75rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#dee5ff',
              display: 'block',
              '&::placeholder': { color: '#475569' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
