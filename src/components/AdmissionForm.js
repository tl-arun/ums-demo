// src/components/AdmissionForm.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem, Grid } from '@mui/material';

const AdmissionForm = () => {
  const [files, setFiles] = useState({
    ssc_marksheet: null,
    hsc_marksheet: null,
    graduation_marksheet: null,
    photo: null,
    signature: null,
    id_proof: null
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      gender: '',
      course: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      dob: Yup.date().required('Required'),
      gender: Yup.string().required('Required'),
      course: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      
      // Append all form values
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      // Append all files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      try {
        const response = await axios.post('http://localhost:8000/api/students', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Application submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting application');
      }
    }
  });

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Degree Course Admission Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {/* Add more fields similarly */}
            
            {/* File Uploads */}
            <Grid item xs={12}>
              <Typography variant="h6">Documents Upload</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <input
                accept=".pdf,.jpg,.png"
                id="ssc_marksheet"
                name="ssc_marksheet"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="ssc_marksheet">SSC Marksheet</label>
            </Grid>
            
            {/* Add more file upload fields similarly */}
            
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdmissionForm;