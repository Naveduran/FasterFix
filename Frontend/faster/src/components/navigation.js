import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Active" icon={<AssignmentIcon />} />
        <BottomNavigationAction label="Solved" icon={<AssignmentTurnedInIcon />} />
        <BottomNavigationAction label="Update" icon={<AssignmentReturnedIcon />} />
        <BottomNavigationAction label="LogOut" icon={<LogoutIcon />} />
      </BottomNavigation>
    </Box>
  );
}
