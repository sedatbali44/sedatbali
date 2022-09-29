import { Paper, Grid, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

function CustomerInformation({ customer }) {
  const { states } = useSelector((state) => state.orders);
  return (
    <>
      <Grid container direction="column" spacing="16px">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">Customer Information</Typography>
            </Grid>
            <Grid item>
              {/* <Tooltip title="Check Fraud" placement="top">
                <IconButton size="small">
                  <VerifiedUserOutlined />
                </IconButton>
              </Tooltip> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper variant="outlined" sx={{ p: '16px' }}>
            <Grid container spacing="16px">
              <Grid item md={6}>
                <Typography variant="subtitle1">Billing Name</Typography>
                <Typography variant="body2">
                  {customer?.firstname} {customer?.lastname}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">Phone</Typography>
                <Typography variant="body2">{customer?.phone}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">Address 1</Typography>
                <Typography variant="body2">{customer?.details?.addressInformation?.address1}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">Address 2</Typography>
                <Typography variant="body2">{customer?.details?.addressInformation?.address2}</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="subtitle1">E-mail</Typography>
                <Typography variant="body2">{customer?.email}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">City</Typography>
                <Typography variant="body2">{customer?.details?.addressInformation?.city}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">Zip</Typography>
                <Typography variant="body2">{customer?.details?.addressInformation?.zipCode}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="subtitle1">State</Typography>
                <Typography variant="body2">
                  {states.find((item) => item.code === customer?.details?.addressInformation?.state)?.title} -{' '}
                  {customer?.details?.addressInformation?.state}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default CustomerInformation;
