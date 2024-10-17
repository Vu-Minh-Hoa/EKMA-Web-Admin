import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        display: { md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: '#f8f8fa',
        },
      }}
    >
      <Stack
        direction='row'
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes='small'
          alt='Avatar'
          src='/static/images/avatar/7.jpg'
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography
            variant='body2'
            sx={{ fontWeight: 500, lineHeight: '16px' }}
          >
            Admin
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            admin@actvn.vn.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
      <Divider />
      <MenuContent />
    </Drawer>
  );
}
