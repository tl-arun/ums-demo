// src/components/Home.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to University Admissions
        </Typography>
        <Typography variant="h5" gutterBottom>
          Apply for your degree program today
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/apply"
          sx={{ mt: 3 }}
        >
          Start Application
        </Button>
      </Box>
    </Container>
  );
};

export default Home;