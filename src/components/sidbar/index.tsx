import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useLocation } from 'react-router-dom';

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
  value: string;
}

const Item = ({ title, to, icon, selected, setSelected, value }: ItemProps) => {
  return (
    <MenuItem
      value={value}
      active={selected === value}
      style={{
        color: '#ccc',
      }}
      onClick={() => setSelected(value)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(pathname.slice(1));
  }, [pathname]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${theme.palette.primary.main} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: '#ccc',
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography variant='h3' color={'#ccc'}>
                  For GDG Member
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src={`../../assets/user.png`}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                  }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  color={'#ccc'}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                >
                  GDG Hanoi
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              value=''
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='User management'
              to='/user-management'
              value='user'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Agenda'
              to='/agenda'
              value='agenda'
              icon={<ViewAgendaIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebar;
