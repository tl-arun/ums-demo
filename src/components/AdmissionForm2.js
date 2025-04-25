import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Button,
  Paper,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const AdmissionForm2 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: null,
    aadharNumber: '',
    panNumber: '',
    drivingLicense: '',
    email: '',
    contactNumber: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dob: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Student Admission Form
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
            Personal Information
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.fullName} />}
                label="Full Name"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>Date of Birth</Typography>
              <DatePicker
                value={formData.dob}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Government IDs Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
            Government Identification
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.aadharNumber} />}
                label="Aadhar Number"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter 12-digit Aadhar number"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.panNumber} />}
                label="PAN Number"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="Enter PAN number"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.drivingLicense} />}
                label="Driving License Number"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
                placeholder="Enter driving license number"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Contact Information Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
            Contact Information
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.email} />}
                label="Email Address"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={!!formData.contactNumber} />}
                label="Contact Number"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Photo Upload Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
            Photo Upload
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={!!formData.photo} />}
              label="Upload Photo"
              sx={{ mb: 1 }}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              {formData.photo ? formData.photo.name : 'Choose File'}
              <input
                type="file"
                name="photo"
                hidden
                onChange={handleChange}
                accept="image/*"
              />
            </Button>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ px: 6, py: 1.5 }}
          >
            Submit Application
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AdmissionForm2;