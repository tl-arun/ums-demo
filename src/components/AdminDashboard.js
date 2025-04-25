// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/students/${id}/verify`);
      setStudents(students.map(student => 
        student.id === id ? { ...student, documents_verified: true } : student
      ));
    } catch (error) {
      console.error('Error verifying student:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'course', headerName: 'Course', width: 150 },
    { 
      field: 'documents_verified', 
      headerName: 'Verified', 
      width: 120,
      renderCell: (params) => (
        params.value ? 'Verified' : 'Pending'
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={params.row.documents_verified}
          onClick={() => handleVerify(params.row.id)}
        >
          Verify
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student Applications
        </Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={students}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </div>
      </Box>
    </Container>
  );
};

export default AdminDashboard;