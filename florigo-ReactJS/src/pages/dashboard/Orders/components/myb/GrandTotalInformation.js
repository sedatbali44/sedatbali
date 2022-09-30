import { Grid, Typography } from '@mui/material';

import PriceBox from './PriceBox';

function GrandTotalInformation({ price }) {
  return (
    <Grid container direction="column" spacing="16px">
      <Grid item>
        <Typography variant="h6">Grand Total Information</Typography>
      </Grid>
      <Grid item>
        <PriceBox text="Grand Total" price={`$${price}`} />
      </Grid>
    </Grid>
  );
}

export default GrandTotalInformation;
