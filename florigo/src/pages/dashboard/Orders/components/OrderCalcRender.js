import { Grid, Paper, Typography } from '@mui/material';

const OrderCalcRender = ({ orderDetail }) => {
  const percentPrice = (percent, total) => {
    const R = 5.5;

    const C = 20;

    const Fraction = total - (total * percent) / 100;

    return Fraction + R + (Fraction * C) / 100;
  };
  const setPrices = (percent) => {
    const total = Number(orderDetail.price);
    return parseFloat(percentPrice(percent, total)).toFixed(2);
  };

  return (
    <Grid item>
      <Paper variant="outlined" sx={{ p: '12px' }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              SUGGESTED SENDING PRICES
            </Typography>{' '}
            <Typography variant="body2">
              <strong>40%</strong> ($ {setPrices(40)}) | <strong>45% </strong>($ {setPrices(45)}) | <strong>50%</strong>{' '}
              ($ {setPrices(50)}) | <strong>55%</strong> ($ {setPrices(55)})
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default OrderCalcRender;
