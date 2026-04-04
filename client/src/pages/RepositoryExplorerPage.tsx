import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CodeLine } from '../components/CodeLine';
import { CodeToken } from '../components/CodeToken';
import { Icon } from '../components/Icon';

// eslint-disable-next-line max-len
const TOP_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDF-HeS4B6N_zfaL7DqllAgeB3VR-G3Zkk7yRWijG5iszEpTJZwIYlQ-M7QKEMFId7bMwrPR0xrgKlu8UBzau9SnhtCqXAYF6jsWkg7DCUiOimvxFaUHzAy4TfhOnZKP-9-hyi0_rTCQORaLisHnQ5E7460Ce1p9aZJzMArF4vy3E5THg7mT-zvNrDcUwoaSPIs0RTc-5RZajRT3FSTrtzAYqf46p8tKrvgVBm1ARHqU-EiLZ3L-op67HtN6ENiwjKNEWsdwxkgjr4';
// eslint-disable-next-line max-len
const ALEX_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-q7lDf3VohWOC_4gbHWZmVTwJ6wNXjHJkUwWPhLUp2Dg6g6P07MTLk7xoZNrQBtRf-ASSId0LsE42ocb1lW5jtNMQ8qu_H1ctEV7U0_km8CWzjq4lTz6xFOGlG5BCZNVyZYFn9PF_WkvaRBCft8q2NXPByoAmvSljDq9qj7Pk32szPmFfQhJZ4AimvZCkzL0ioNYl9ci8WFKRMSLX7W_3DntvMxF_Z8Ps2MoXH6KfhpGTXfwATc9oiOi6wJ3WNftE1pxgx8Agk8o';
// eslint-disable-next-line max-len
const SARAH_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBqrrJzWbBNEpPbZZN_i5nBTojFnI-dhwlIWb2bYeNv0B2nG_o_zddHQkVsbN4eSc9a2ot4RzVsBdWqt6SGAu5tjV2WepIAqpmYcd8ANPaUmqDlWRN-tMSNnQPkTduZB5W8auoef1lbFI17BWRGpy17zZW0SBjgovnrAS984q7SGl2TJ4-JScIsDQvzOY3X-lzGUCdRd2aBI3yAxM78tgbVEJsMBoEaePYMYDcwHEcPhbSWpmg72mAQC8XmoWFCauiozIGz6tgEIdM';

const topMenu = ['File', 'Edit', 'Selection', 'View', 'Go'];

const explorerNav = [
  { icon: 'folder_open', label: 'Explorer', active: true },
  { icon: 'search', label: 'Search' },
  { icon: 'account_tree', label: 'Source Control' },
  { icon: 'play_arrow', label: 'Run & Debug' },
  { icon: 'extension', label: 'Extensions' },
];

const bottomNav = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'account_circle', label: 'Accounts' },
];

export const RepositoryExplorerPage = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: '#060e20', color: '#dee5ff', overflow: 'hidden' }}>
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 56,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#0f172a',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
      }}
    >
      <Stack direction="row" alignItems="center" gap={5}>
        <Typography
          sx={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 900,
            color: '#4f46e5',
            letterSpacing: '-0.05em',
          }}
        >
          Codelore
        </Typography>
        <Stack direction="row" gap={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {topMenu.map((item) => {
            const active = item === 'File';
            return (
              <Typography
                key={item}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 56,
                  px: active ? 0 : 1,
                  fontSize: '0.85rem',
                  color: active ? '#818cf8' : '#94a3b8',
                  borderBottom: active ? '2px solid #6366f1' : '2px solid transparent',
                  cursor: 'pointer',
                  '&:hover': active ? {} : { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '6px' },
                  transition: 'all 0.2s',
                }}
              >
                {item}
              </Typography>
            );
          })}
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1.5}>
        {['terminal', 'notifications', 'help_outline'].map((name) => (
          <Box
            key={name}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '6px',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { color: '#818cf8', bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            <Icon name={name} />
          </Box>
        ))}
        <Avatar
          src={TOP_AVATAR}
          alt="User Avatar"
          sx={{ width: 32, height: 32, border: '1px solid rgba(99,102,241,0.2)' }}
        />
      </Stack>
    </Box>

    <Box sx={{ display: 'flex', height: 'calc(100vh - 56px)', position: 'relative' }}>
      <Box
        component="aside"
        sx={{
          width: 256,
          flexShrink: 0,
          position: 'fixed',
          top: 56,
          bottom: 0,
          left: 0,
          bgcolor: 'rgba(2,6,23,0.6)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(99,102,241,0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '40px 0 40px -20px rgba(0,0,0,0.5)',
          zIndex: 40,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 2 }}>
          <Typography
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(140deg, #818cf8 0%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Codelore Explorer
          </Typography>
          <Box sx={{ color: '#94a3b8', fontSize: 16 }}>
            <Icon name="more_horiz" />
          </Box>
        </Stack>

        <Box sx={{ px: 1, pb: 1, overflowY: 'auto', flex: 1 }}>
          <Stack gap={0.5}>
            {explorerNav.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                  color: item.active ? '#818cf8' : '#94a3b8',
                  bgcolor: item.active ? 'rgba(99,102,241,0.1)' : 'transparent',
                  boxShadow: item.active ? '0 0 15px rgba(79,70,229,0.2)' : 'none',
                  fontWeight: item.active ? 700 : 500,
                  cursor: 'pointer',
                  '&:hover': item.active ? {} : { bgcolor: 'rgba(30,41,59,0.5)', color: '#e2e8f0' },
                }}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 4, px: 1.5 }}>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.625rem',
                color: '#64748b',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                mb: 1.5,
              }}
            >
              Codelore Workspace
            </Typography>

            <Stack gap={0.5} sx={{ fontSize: '0.85rem' }}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{ px: 1, py: 0.6, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <Box sx={{ fontSize: 16 }}>
                  <Icon name="keyboard_arrow_down" />
                </Box>
                <Box sx={{ color: '#818cf8', fontSize: 18 }}>
                  <Icon name="folder" />
                </Box>
                <Typography sx={{ fontSize: '0.85rem' }}>src</Typography>
              </Stack>

              <Box sx={{ pl: 2 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ px: 1, py: 0.6, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
                >
                  <Box sx={{ fontSize: 16 }}>
                    <Icon name="keyboard_arrow_down" />
                  </Box>
                  <Box sx={{ color: '#818cf8', fontSize: 18 }}>
                    <Icon name="folder" />
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem' }}>components</Typography>
                </Stack>

                <Box sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      px: 1,
                      py: 0.6,
                      bgcolor: 'rgba(163,166,255,0.1)',
                      color: '#a3a6ff',
                      borderLeft: '2px solid #a3a6ff',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                    }}
                  >
                    <Icon name="description" />
                    <Typography sx={{ fontSize: '0.82rem' }}>TopAppBar.tsx</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{
                      px: 1,
                      py: 0.6,
                      color: '#a3aac4',
                      borderRadius: '6px',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                    }}
                  >
                    <Icon name="description" />
                    <Typography sx={{ fontSize: '0.82rem' }}>SideNavBar.tsx</Typography>
                  </Stack>
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    px: 1,
                    py: 0.6,
                    color: '#a3aac4',
                    borderRadius: '6px',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                  }}
                >
                  <Icon name="javascript" />
                  <Typography sx={{ fontSize: '0.82rem' }}>App.tsx</Typography>
                </Stack>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1,
                  py: 0.6,
                  color: '#a3aac4',
                  borderRadius: '6px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Box sx={{ color: '#818cf8', fontSize: 18 }}>
                  <Icon name="folder" />
                </Box>
                <Typography sx={{ fontSize: '0.82rem' }}>styles</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  px: 1,
                  py: 0.6,
                  color: '#a3aac4',
                  borderRadius: '6px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <Icon name="settings" />
                <Typography sx={{ fontSize: '0.82rem' }}>tailwind.config.js</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(99,102,241,0.1)' }}>
          <Stack gap={0.5} mb={1.5}>
            {bottomNav.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                alignItems="center"
                gap={1.5}
                sx={{
                  px: 1.5,
                  py: 1,
                  color: '#94a3b8',
                  borderRadius: '8px',
                  '&:hover': { bgcolor: 'rgba(30,41,59,0.5)', color: '#e2e8f0' },
                }}
              >
                <Icon name={item.icon} />
                <Typography sx={{ fontSize: '0.8rem' }}>{item.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box component="main" sx={{ ml: '256px', flex: 1, display: 'flex', minWidth: 0 }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(64,72,93,0.2)',
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              height: 48,
              px: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#091328',
              borderBottom: '1px solid rgba(64,72,93,0.2)',
            }}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#94a3b8' }}
            >
              <Stack direction="row" alignItems="center" gap={0.5}>
                <span>codelore-repo</span>
                <Box sx={{ fontSize: 10 }}>
                  <Icon name="chevron_right" />
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <span>src</span>
                <Box sx={{ fontSize: 10 }}>
                  <Icon name="chevron_right" />
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <span>components</span>
                <Box sx={{ fontSize: 10 }}>
                  <Icon name="chevron_right" />
                </Box>
              </Stack>
              <Typography sx={{ color: '#dee5ff', fontSize: '0.74rem', fontWeight: 700 }}>TopAppBar.tsx</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  bgcolor: '#141f38',
                  borderRadius: '8px',
                  px: 1,
                  py: 0.35,
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 190,
                }}
              >
                <Box sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }}>
                  <Icon name="search" />
                </Box>
                <InputBase
                  readOnly
                  placeholder="Search in file..."
                  sx={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: '#a3aac4',
                    width: '100%',
                  }}
                />
              </Box>
              <Button
                variant="contained"
                startIcon={<Icon name="add" />}
                sx={{
                  bgcolor: '#a3a6ff',
                  color: '#0a0081',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  px: 1.5,
                  py: 0.8,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#9396ff', boxShadow: 'none' },
                }}
              >
                New File
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              flex: 1,
              position: 'relative',
              overflow: 'auto',
              p: 3,
              bgcolor: '#000',
              backgroundImage: 'linear-gradient(180deg, rgba(6,14,32,1) 0%, rgba(0,0,0,1) 100%)',
            }}
          >
            <Stack direction="row" alignItems="flex-start" sx={{ minWidth: 620 }}>
              <Box
                sx={{
                  width: 36,
                  flexShrink: 0,
                  pr: 2,
                  textAlign: 'right',
                  color: '#6d758c',
                  opacity: 0.4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  lineHeight: 1.9,
                  userSelect: 'none',
                }}
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </Box>

              <Box sx={{ flex: 1 }}>
                <CodeLine>
                  <CodeToken text="import" color="#eb7bba" /> React <CodeToken text="from" color="#eb7bba" />{' '}
                  <CodeToken text="'react'" color="#58e7ab" />;
                </CodeLine>
                <CodeLine>
                  <CodeToken text="import" color="#eb7bba" /> {'{ TopNavBarProps }'}{' '}
                  <CodeToken text="from" color="#eb7bba" /> <CodeToken text="'./types'" color="#58e7ab" />;
                </CodeLine>
                <CodeLine>&nbsp;</CodeLine>
                <CodeLine>
                  <CodeToken text="export const" color="#a3a6ff" /> <CodeToken text="TopAppBar" color="#ff9dd1" />:
                  {' React.FC<TopNavBarProps> = ({ product_name }) => {'}
                </CodeLine>
                <CodeLine>
                  {'  '}
                  <CodeToken text="return" color="#a3a6ff" /> {'('}
                </CodeLine>
                <CodeLine>
                  {'    <'}
                  <CodeToken text="header" color="#ff9dd1" /> <CodeToken text="className" color="#9396ff" />=
                  <CodeToken text={'"h-14 w-full flex items-center px-4"'} color="#58e7ab" />
                  {'>'}
                </CodeLine>
                <CodeLine>
                  {'      <'}
                  <CodeToken text="div" color="#ff9dd1" /> <CodeToken text="className" color="#9396ff" />=
                  <CodeToken text={'"font-headline font-black"'} color="#58e7ab" />
                  {'>'}
                </CodeLine>
                <CodeLine>{'        {product_name}'}</CodeLine>
                <CodeLine>
                  {'      </'}
                  <CodeToken text="div" color="#ff9dd1" />
                  {'>'}
                </CodeLine>
                <CodeLine>
                  {'      <'}
                  <CodeToken text="nav" color="#ff9dd1" /> <CodeToken text="className" color="#9396ff" />=
                  <CodeToken text={'"flex-1 ml-8"'} color="#58e7ab" />
                  {'>'}
                </CodeLine>
                <CodeLine>
                  {'        '}
                  <CodeToken text={'{/* Navigation logic implementation */}'} color="#dee5ff" />
                </CodeLine>
                <CodeLine>
                  {'      </'}
                  <CodeToken text="nav" color="#ff9dd1" />
                  {'>'}
                </CodeLine>
                <CodeLine>
                  {'    </'}
                  <CodeToken text="header" color="#ff9dd1" />
                  {'>'}
                </CodeLine>
                <CodeLine>{'  );'}</CodeLine>
                <CodeLine>{'};'}</CodeLine>
                <CodeLine>&nbsp;</CodeLine>
                <CodeLine>
                  <CodeToken text="export default" color="#a3a6ff" /> TopAppBar;
                </CodeLine>
              </Box>
            </Stack>

            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: -40,
                width: 256,
                height: 256,
                borderRadius: '50%',
                bgcolor: 'rgba(163,166,255,0.05)',
                filter: 'blur(120px)',
                pointerEvents: 'none',
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: 320,
            flexShrink: 0,
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            bgcolor: '#091328',
            boxShadow: '-20px 0 40px -10px rgba(0,0,0,0.3)',
          }}
        >
          <Box
            sx={{
              height: 48,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              bgcolor: '#0f1930',
              borderBottom: '1px solid rgba(64,72,93,0.2)',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
              sx={{ borderBottom: '1px solid #a3a6ff', color: '#a3a6ff' }}
            >
              <Icon name="history" />
              <Typography
                sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}
              >
                Memory
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" gap={1} sx={{ color: '#a3aac4' }}>
              <Icon name="edit_note" />
              <Typography
                sx={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}
              >
                Details
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            <Typography
              sx={{
                fontSize: '0.6rem',
                color: '#6d758c',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                mb: 2,
              }}
            >
              Codelore History
            </Typography>

            <Stack gap={2.5}>
              <Box sx={{ borderLeft: '1px solid rgba(64,72,93,0.4)', pl: 2.5, position: 'relative', pb: 2 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: -5,
                    top: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#006c49',
                    boxShadow: '0 0 0 4px #060e20',
                  }}
                />
                <Stack gap={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>feat: rebranding</Typography>
                    <Typography
                      sx={{ fontSize: '0.62rem', color: '#6d758c', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      #a2f9
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '0.72rem', color: '#a3aac4' }}>
                    Update identity and labels to Codelore across the platform.
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Avatar src={ALEX_AVATAR} alt="Author" sx={{ width: 16, height: 16 }} />
                    <Typography sx={{ fontSize: '0.62rem', color: '#69f6b8', fontWeight: 700 }}>alex_dev</Typography>
                    <Typography sx={{ fontSize: '0.62rem', color: '#6d758c' }}>• 2m ago</Typography>
                  </Stack>
                </Stack>
              </Box>

              <Box sx={{ borderLeft: '1px solid rgba(64,72,93,0.4)', pl: 2.5, position: 'relative', pb: 2 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: -5,
                    top: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#40485d',
                    boxShadow: '0 0 0 4px #060e20',
                  }}
                />
                <Stack gap={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>refactor: hook logic</Typography>
                    <Typography
                      sx={{ fontSize: '0.62rem', color: '#6d758c', fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      #82c1
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Avatar src={SARAH_AVATAR} alt="Author" sx={{ width: 16, height: 16 }} />
                    <Typography sx={{ fontSize: '0.62rem', color: '#69f6b8', fontWeight: 700 }}>sarah_arch</Typography>
                    <Typography sx={{ fontSize: '0.62rem', color: '#6d758c' }}>• yesterday</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Divider sx={{ borderColor: 'rgba(64,72,93,0.3)', my: 2.5 }} />

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
              <Typography
                sx={{
                  fontSize: '0.6rem',
                  color: '#6d758c',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                Contextual Notes
              </Typography>
              <Box sx={{ color: '#6d758c', fontSize: 18, cursor: 'pointer', '&:hover': { color: '#a3a6ff' } }}>
                <Icon name="add_box" />
              </Box>
            </Stack>

            <Stack gap={1.5}>
              <Box
                sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#141f38', borderLeft: '2px solid rgba(255,157,209,0.4)' }}
              >
                <Typography sx={{ fontSize: '0.72rem', color: '#a3aac4', lineHeight: 1.6 }}>
                  Ensure the{' '}
                  <Box
                    component="code"
                    sx={{ bgcolor: 'rgba(0,0,0,0.3)', px: 0.5, borderRadius: '4px', color: '#ff9dd1' }}
                  >
                    backdrop-blur
                  </Box>{' '}
                  matches the Codelore design system global tokens.
                </Typography>
                <Stack direction="row" justifyContent="space-between" mt={1.5}>
                  <Typography sx={{ fontSize: '0.62rem', color: '#6d758c' }}>Oct 24, 14:20</Typography>
                  <Typography
                    sx={{ fontSize: '0.62rem', color: '#ff9dd1', fontWeight: 800, textTransform: 'uppercase' }}
                  >
                    Review Item
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#141f38' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#a3aac4', lineHeight: 1.6 }}>
                  Performance note: React.memo might be needed if Codelore children re-render frequently.
                </Typography>
                <Stack direction="row" justifyContent="space-between" mt={1.5}>
                  <Typography sx={{ fontSize: '0.62rem', color: '#6d758c' }}>Oct 23, 09:45</Typography>
                  <Typography
                    sx={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}
                  >
                    Todo
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Box sx={{ mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Stack
                sx={{
                  p: 1.5,
                  alignItems: 'center',
                  borderRadius: '8px',
                  bgcolor: '#192540',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#69f6b8' }}>98%</Typography>
                <Typography sx={{ fontSize: '0.55rem', color: '#6d758c', fontWeight: 900, textTransform: 'uppercase' }}>
                  Coverage
                </Typography>
              </Stack>
              <Stack
                sx={{
                  p: 1.5,
                  alignItems: 'center',
                  borderRadius: '8px',
                  bgcolor: '#192540',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#ff9dd1' }}>4ms</Typography>
                <Typography sx={{ fontSize: '0.55rem', color: '#6d758c', fontWeight: 900, textTransform: 'uppercase' }}>
                  Render
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: '#0f1930', borderTop: '1px solid rgba(64,72,93,0.2)' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Icon name="analytics" />}
              sx={{
                bgcolor: '#a3a6ff',
                color: '#fff',
                border: '1px solid #a3a6ff',
                textTransform: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#9396ff', boxShadow: 'none' },
              }}
            >
              View Codelore Architecture
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.2) 50%, transparent 100%)',
      }}
    />
    <Box
      sx={{
        position: 'fixed',
        top: 8,
        right: 8,
        p: 4,
        opacity: 0.1,
        pointerEvents: 'none',
        display: { xs: 'none', xl: 'block' },
      }}
    >
      <Box
        sx={{
          width: 256,
          height: 256,
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: 192, height: 192, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '50%' }} />
      </Box>
    </Box>
  </Box>
);
