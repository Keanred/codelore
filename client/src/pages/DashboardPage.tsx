import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppLayout } from '../components/AppLayout';
import { Icon } from '../components/Icon';

// ─── Avatar URLs ──────────────────────────────────────────────────────────────

const AVATAR_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIL9S3kX0P__pVBxMgWz32-Oy1PP4-jT51yE7scdLGK8dmdaasz7LNFz1y6CvxC2RLAsw5eZhWEYW94EqHyvTQgekbxpjr3WJ1djXNny0UPN2-LSrsRFn44CP0F3I2CaiJD5njEv2wlRE1FPd2F3hKcnzotbUpcUGYAbTcQ6nU7FYN8jfRZtCRq4Rq1Ngy1C0DOU549__LIsrzgd7CkoCAtT-ZnlPK03RFbKnd4F6B7a7CHsgM0idOdNXR_IHge6LPgedKZdjHDXA'; // eslint-disable-line max-len
const AVATAR_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZcZHbDDPjSU6APND1cW6CV4K25MXiGrbLavYL818JkwdQVPZcvMQ0eeGu-zZiOv4e4R6-pHf9f_nYQr5eszXHS4l4Ay2QwhjASvZXWEUK7VSYN-KdUNaqT6lGyeAnWdODQgFkvMW500vMOSKHEVv0Spau_D2xUsMtCbBlX_kmmIZ1fbfC8CUFYNfFnZUFvgc528Gapzgb8ftQaZwyMRG_kduZALwER1tyCExqLiI_kpunui6JwRD1EUHFPGSmBjRNTZhGrisxu00'; // eslint-disable-line max-len
const AVATAR_3 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVaYYDCwpDNgBkvr3QD8OIk1X89jiM0QjMHsnL0IqQQ03vMWNnsGdbcvGLb-V8hAzV0y-NJW9rUxVFh4hLB7ssnB1owbCdxZxW_a5V1ALIPihACe422ubvzBne28u9pfokR84Pi1xv00ka7uyvhTlUaVV9-sOFYkA6uz4CAoko29YGk2LoCDWhVyj0udpkabsxV7CnYYEYzd24iPPWmyCl5QlIKJAlX7OyVDaOmHRlhYwa-WqytwwtEyuBYQLjipTiqGug2YJVDec'; // eslint-disable-line max-len

// ─── Shared styles ────────────────────────────────────────────────────────────

const CARD_BASE = {
  bgcolor: '#091328',
  p: 3,
  borderRadius: '8px',
  border: '1px solid rgba(163,166,255,0.15)',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between',
};

const STAT_LABEL = {
  fontSize: '0.625rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: '#475569',
  fontWeight: 700,
};

const STAT_VALUE = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '1.875rem',
  fontWeight: 700,
  color: '#fff',
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export const DashboardPage = () => (
  <AppLayout>
    <Box sx={{ p: 4 }}>
      {/* ── Page Header ── */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ md: 'flex-end' }}
        gap={3}
        sx={{ mb: 5 }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.875rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            Neural Dashboard
          </Typography>
          <Typography sx={{ color: '#a3aac4', mt: 1, fontSize: '0.875rem', maxWidth: 448 }}>
            Orchestrate your repositories and monitor architectural health in real-time.
          </Typography>
        </Box>
        <Box
          component="button"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
            color: '#000',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.875rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'transform 0.1s',
            '&:hover': { transform: 'scale(0.98)' },
          }}
        >
          <Box sx={{ fontSize: 20, display: 'flex' }}>
            <Icon name="add" />
          </Box>
          Connect New Repo
        </Box>
      </Stack>

      {/* ── Stat Cards Bento Grid ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 6,
        }}
      >
        {/* Total Repos */}
        <Box sx={CARD_BASE}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography sx={STAT_LABEL}>Total Repos</Typography>
            <Box sx={{ fontSize: 20, color: 'rgba(163,166,255,0.4)', display: 'flex' }}>
              <Icon name="inventory_2" />
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography sx={STAT_VALUE}>42</Typography>
            <Stack direction="row" alignItems="center" gap={0.5} sx={{ mt: 0.5 }}>
              <Box sx={{ fontSize: 14, color: '#69f6b8', display: 'flex' }}>
                <Icon name="trending_up" />
              </Box>
              <Typography sx={{ fontSize: '0.625rem', color: '#69f6b8' }}>+4 this month</Typography>
            </Stack>
          </Box>
        </Box>

        {/* Files Indexed */}
        <Box sx={CARD_BASE}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography sx={STAT_LABEL}>Files Indexed</Typography>
            <Box sx={{ fontSize: 20, color: 'rgba(163,166,255,0.4)', display: 'flex' }}>
              <Icon name="database" />
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography sx={STAT_VALUE}>128.4k</Typography>
            <Typography sx={{ fontSize: '0.625rem', color: '#475569', textTransform: 'uppercase', mt: 0.5 }}>
              Across all clusters
            </Typography>
          </Box>
        </Box>

        {/* Sync Health */}
        <Box sx={CARD_BASE}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography sx={STAT_LABEL}>Sync Health</Typography>
            <Box sx={{ fontSize: 20, color: 'rgba(163,166,255,0.4)', display: 'flex' }}>
              <Icon name="bolt" />
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography sx={STAT_VALUE}>99.2%</Typography>
            <Box sx={{ width: '100%', bgcolor: '#141f38', height: 4, borderRadius: '99px', mt: 1.5 }}>
              <Box sx={{ bgcolor: '#69f6b8', height: '100%', borderRadius: '99px', width: '92%' }} />
            </Box>
          </Box>
        </Box>

        {/* Active Builds */}
        <Box sx={{ ...CARD_BASE, borderLeft: '4px solid #a3a6ff' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography sx={STAT_LABEL}>Active Builds</Typography>
            <Box sx={{ fontSize: 20, color: 'rgba(163,166,255,0.4)', display: 'flex' }}>
              <Icon name="published_with_changes" />
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography sx={STAT_VALUE}>08</Typography>
            <Typography sx={{ fontSize: '0.625rem', color: '#ff9dd1', mt: 0.5 }}>3 pending review</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Main Grid: Repositories + Activity ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 4,
          alignItems: 'start',
        }}
      >
        {/* Left: Repositories */}
        <Stack gap={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              Repositories
            </Typography>
            <Stack direction="row" gap={1}>
              <Box
                component="button"
                sx={{
                  p: '6px',
                  bgcolor: '#141f38',
                  color: '#94a3b8',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  '&:hover': { color: '#fff' },
                }}
              >
                <Box sx={{ fontSize: 18, display: 'flex' }}>
                  <Icon name="grid_view" />
                </Box>
              </Box>
              <Box
                component="button"
                sx={{
                  p: '6px',
                  color: '#a3a6ff',
                  borderRadius: '4px',
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                <Box sx={{ fontSize: 18, display: 'flex' }}>
                  <Icon name="list" />
                </Box>
              </Box>
            </Stack>
          </Stack>

          <Stack gap={2}>
            {/* Repo: Syncing */}
            <Box
              sx={{
                bgcolor: '#091328',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: '#0f1930' },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '4px',
                      bgcolor: 'rgba(163,166,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a3a6ff',
                      fontSize: 20,
                    }}
                  >
                    <Icon name="terminal" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                      apollo-engine-v3
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      main • updated 2m ago
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap={3}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box sx={{ position: 'relative', width: 8, height: 8 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          bgcolor: '#69f6b8',
                          opacity: 0.75,
                          '@keyframes ping': {
                            '0%': { transform: 'scale(1)', opacity: 0.75 },
                            '100%': { transform: 'scale(2.5)', opacity: 0 },
                          },
                          animation: 'ping 1.5s ease-out infinite',
                        }}
                      />
                      <Box
                        sx={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', bgcolor: '#69f6b8' }}
                      />
                    </Box>
                    <Typography
                      sx={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: '#69f6b8' }}
                    >
                      syncing
                    </Typography>
                  </Stack>
                  <Stack direction="row" sx={{ '& > *:not(:first-of-type)': { ml: '-8px' } }}>
                    <Box
                      component="img"
                      src={AVATAR_1}
                      alt=""
                      sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #091328', flexShrink: 0 }}
                    />
                    <Box
                      component="img"
                      src={AVATAR_2}
                      alt=""
                      sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #091328', flexShrink: 0 }}
                    />
                  </Stack>
                  <Box
                    component="button"
                    sx={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#475569',
                      display: 'flex',
                      '&:hover': { color: '#fff' },
                    }}
                  >
                    <Box sx={{ fontSize: 20, display: 'flex' }}>
                      <Icon name="more_vert" />
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Repo: Idle */}
            <Box
              sx={{
                bgcolor: '#091328',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: '#0f1930' },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '4px',
                      bgcolor: 'rgba(163,166,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a3a6ff',
                      fontSize: 20,
                    }}
                  >
                    <Icon name="javascript" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                      web-portal-frontend
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      staging • updated 4h ago
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap={3}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#475569' }} />
                    <Typography
                      sx={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}
                    >
                      idle
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Box
                      component="img"
                      src={AVATAR_3}
                      alt=""
                      sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #091328', flexShrink: 0 }}
                    />
                  </Stack>
                  <Box
                    component="button"
                    sx={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#475569',
                      display: 'flex',
                      '&:hover': { color: '#fff' },
                    }}
                  >
                    <Box sx={{ fontSize: 20, display: 'flex' }}>
                      <Icon name="more_vert" />
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {/* Repo: Error */}
            <Box
              sx={{
                bgcolor: '#091328',
                borderRadius: '8px',
                overflow: 'hidden',
                borderLeft: '2px solid rgba(255,110,132,0.3)',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: '#0f1930' },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '4px',
                      bgcolor: 'rgba(255,110,132,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ff6e84',
                      fontSize: 20,
                    }}
                  >
                    <Icon name="warning" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                      legacy-auth-service
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      hotfix/v1.1 • failed 12m ago
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap={3}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff6e84' }} />
                    <Typography
                      sx={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', color: '#ff6e84' }}
                    >
                      error
                    </Typography>
                  </Stack>
                  <Box
                    component="button"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: 'rgba(255,110,132,0.1)',
                      color: '#ff6e84',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Re-sync
                  </Box>
                  <Box
                    component="button"
                    sx={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#475569',
                      display: 'flex',
                      '&:hover': { color: '#fff' },
                    }}
                  >
                    <Box sx={{ fontSize: 20, display: 'flex' }}>
                      <Icon name="more_vert" />
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        {/* Right: Activity Feed + Memory Banner */}
        <Stack gap={3}>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Recent Activity
          </Typography>

          {/* Activity feed */}
          <Box
            sx={{
              bgcolor: '#141f38',
              borderRadius: '8px',
              p: 3,
              border: '1px solid rgba(163,166,255,0.15)',
            }}
          >
            <Stack gap={4}>
              {/* Item: PR merge */}
              <Box sx={{ position: 'relative', pl: 4 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    bgcolor: '#a3a6ff',
                    boxShadow: '0 0 0 4px rgba(163,166,255,0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '4px',
                    top: '12px',
                    bottom: '-32px',
                    width: '1px',
                    bgcolor: 'rgba(163,166,255,0.2)',
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: '#dee5ff', lineHeight: 1.625 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: '#fff' }}>
                    Sarah Jenkins
                  </Box>
                  {' merged '}
                  <Box component="span" sx={{ color: '#a3a6ff', fontFamily: "'JetBrains Mono', monospace" }}>
                    #PR-224
                  </Box>
                  {' into '}
                  <Box component="span" sx={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    apollo-engine-v3
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    mt: '4px',
                    display: 'block',
                  }}
                >
                  14 minutes ago
                </Typography>
              </Box>

              {/* Item: Indexed */}
              <Box sx={{ position: 'relative', pl: 4 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    bgcolor: '#69f6b8',
                    boxShadow: '0 0 0 4px rgba(105,246,184,0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '4px',
                    top: '12px',
                    bottom: '-32px',
                    width: '1px',
                    bgcolor: 'rgba(163,166,255,0.2)',
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: '#dee5ff', lineHeight: 1.625 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: '#fff' }}>
                    System
                  </Box>
                  {' successfully indexed '}
                  <Box component="span" sx={{ fontWeight: 700, color: '#fff' }}>
                    1,402
                  </Box>
                  {' new nodes in '}
                  <Box component="span" sx={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    web-portal-frontend
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    mt: '4px',
                    display: 'block',
                  }}
                >
                  1 hour ago
                </Typography>
              </Box>

              {/* Item: Build failure */}
              <Box sx={{ position: 'relative', pl: 4 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    bgcolor: '#ff6e84',
                    boxShadow: '0 0 0 4px rgba(255,110,132,0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '4px',
                    top: '12px',
                    bottom: '-32px',
                    width: '1px',
                    bgcolor: 'rgba(163,166,255,0.2)',
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: '#dee5ff', lineHeight: 1.625 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: '#fff' }}>
                    Build Failure
                  </Box>
                  {' in '}
                  <Box component="span" sx={{ color: '#ff6e84', fontFamily: "'JetBrains Mono', monospace" }}>
                    legacy-auth-service
                  </Box>
                  {'. Container exit code 1.'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    mt: '4px',
                    display: 'block',
                  }}
                >
                  3 hours ago
                </Typography>
              </Box>

              {/* Item: Contributors (no connector) */}
              <Box sx={{ position: 'relative', pl: 4 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    bgcolor: '#475569',
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: '#dee5ff', lineHeight: 1.625 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: '#fff' }}>
                    Marcus Wu
                  </Box>
                  {' added '}
                  <Box component="span" sx={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    3 contributors
                  </Box>
                  {' to the Forge Workspace'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    color: '#475569',
                    textTransform: 'uppercase',
                    mt: '4px',
                    display: 'block',
                  }}
                >
                  Yesterday
                </Typography>
              </Box>
            </Stack>

            <Box
              component="button"
              sx={{
                width: '100%',
                mt: 4,
                py: 1,
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#a3a6ff',
                border: '1px solid rgba(163,166,255,0.2)',
                borderRadius: '4px',
                bgcolor: 'transparent',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'background 0.2s',
                '&:hover': { bgcolor: 'rgba(163,166,255,0.05)' },
              }}
            >
              View Audit Log
            </Box>
          </Box>

          {/* Memory Usage Banner */}
          <Box
            sx={{
              bgcolor: 'rgba(163,166,255,0.05)',
              p: 3,
              borderRadius: '8px',
              border: '1px solid rgba(163,166,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: -16,
                bottom: -16,
                opacity: 0.1,
                fontSize: 96,
                display: 'flex',
              }}
            >
              <Icon name="memory" />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#a3a6ff',
                mb: 1,
              }}
            >
              Memory Usage Peak
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Your indexing clusters are reaching 84% capacity. Consider scaling before the next scheduled sync.
            </Typography>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#fff' }}>
                8.4GB / 10.0GB
              </Typography>
              <Box
                sx={{ flex: 1, height: 4, bgcolor: 'rgba(163,166,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}
              >
                <Box sx={{ height: '100%', bgcolor: '#a3a6ff', width: '84%' }} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>

    {/* ── FAB ── */}
    <Box
      component="button"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        background: 'linear-gradient(135deg, #a3a6ff 0%, #6063ee 100%)',
        borderRadius: '50%',
        boxShadow: '0 25px 50px -12px rgba(163,166,255,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        border: 'none',
        cursor: 'pointer',
        zIndex: 50,
        fontSize: 24,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.1)' },
        '&:active': { transform: 'scale(0.95)' },
      }}
    >
      <Icon name="rocket_launch" />
    </Box>
  </AppLayout>
);
