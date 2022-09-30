import { Typography, Grid } from '@mui/material';

const OrderPriceDetailed = () => (
  <Grid container>
    <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant={'subtitle1'}>SUGGESTED SENDING PRICES</Typography>
      <Typography variant={'subtitle2'}>40% ($51.67) | 45% ($47.83) | 50% ($43.98) | 55% ($40.13)</Typography>
    </Grid>
  </Grid>
);

export default OrderPriceDetailed;
