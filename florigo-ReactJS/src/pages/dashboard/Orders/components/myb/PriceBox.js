import { Paper, Grid, Typography } from '@mui/material';

function PriceBox(props) {
  return (
    <>
      <Paper variant="outlined" sx={{ px: '16px', py: '12px' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>{props.text}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {props.price}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default PriceBox;
