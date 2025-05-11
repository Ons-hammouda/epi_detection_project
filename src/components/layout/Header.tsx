import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

export const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Safety Equipment Detection
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};