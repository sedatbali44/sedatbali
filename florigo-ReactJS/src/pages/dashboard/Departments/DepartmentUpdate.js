import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DepartmentForm from 'pages/dashboard/Departments/DepartmentForm';
import QuickAccess from 'components/QuickAccess';

DepartmentUpdate.prototype = {
  title: PropTypes.string,
};

export default function DepartmentUpdate() {
  const location = useLocation();
  const { department } = location.state;

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={8} md={8} xl={8} lg={8}>
          <DepartmentForm department={department} />
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4}>
          <QuickAccess />
        </Grid>
      </Grid>
    </Container>
  );
}
