import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick: React.MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget as HTMLElement); // Cast event.currentTarget to HTMLElement
  };

  const handleClose: React.MouseEventHandler = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgb(19, 38, 77)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white' }}>
          TOEIC Solo Leveling
        </Typography>
        <AccountCircleIcon component={Link} to="profile/" />
        <>
          <IconButton color="inherit" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem component={Link} to="/" onClick={handleClose} sx={{ color: 'black' }}>Home</MenuItem>
            <MenuItem component={Link} to="/exam" onClick={handleClose} sx={{ color: 'black' }}>Full Exam</MenuItem>
            <MenuItem component={Link} to="/quickfire" onClick={handleClose} sx={{ color: 'black' }}>Quickfire</MenuItem>
            <MenuItem component={Link} to="/practice" onClick={handleClose} sx={{ color: 'black' }}>Practice</MenuItem>
            <MenuItem component={Link} to="/profile" onClick={handleClose} sx={{ color: 'black' }}>Profile</MenuItem>
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;