import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORY_TEXTS } from '../../constants/common';
import {
  COURSES_SCHEDULES_MANAGEMENT_LINK,
  LECTURER_MANAGEMENT_LINK,
  STUDENT_MANAGEMENT_LINK,
} from '../../links';

const mainListItems = [
  {
    text: CATEGORY_TEXTS.LECTURER_MANAGMENT,
    link: LECTURER_MANAGEMENT_LINK,
    icon: <PeopleRoundedIcon />,
  },
  {
    text: CATEGORY_TEXTS.STUDENTS_MANAGMENT,
    link: STUDENT_MANAGEMENT_LINK,
    icon: <AnalyticsRoundedIcon />,
  },
  {
    text: CATEGORY_TEXTS.COURSES_SCHEDULES,
    link: COURSES_SCHEDULES_MANAGEMENT_LINK,
    icon: <AssignmentRoundedIcon />,
  },
];

export default function MenuContent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleOnClickNavbar = (link: string) => {
    navigate(link);
  };

  return (
    <Stack sx={{ flexGrow: 1, gap: 3 }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            onClick={() => handleOnClickNavbar(item.link)}
            key={index}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              sx={{
                padding: '10px 16px',
              }}
              selected={pathname.replace('/', '') === item.link}
            >
              <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
