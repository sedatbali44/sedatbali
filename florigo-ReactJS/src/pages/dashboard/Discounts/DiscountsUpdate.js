import React from 'react';
import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DiscountsForm from 'pages/dashboard/Discounts/DiscountsForm';

export default function DiscountsUpdate() {
  const location = useLocation();
  const { discount } = location.state;

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={8} md={8} xl={8} lg={8}>
          <DiscountsForm discount={discount} />
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4}></Grid>
      </Grid>
    </Container>
  );
}
