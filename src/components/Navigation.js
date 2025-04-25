// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          University Admission System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/apply">
          Apply Now
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Admin Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;