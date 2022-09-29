import { Box, Grid } from '@mui/material';

import CopyClipboard from 'components/CopyClipboard';

const RecipientStatus = ({ name, phone, occasion, deliveryDate }) => (
  <Box sx={{ Width: 150, minHeight: 80, display: 'flex', alignItems: 'center' }}>
    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginY: 0.2 }}>
        Recipient : {name}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12, marginY: 0.2 }}
      >
        Phone : {phone && <CopyClipboard value={phone}></CopyClipboard>}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12, marginY: 0.2 }}
      >
        Delivery Date : {deliveryDate}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12, marginY: 0.2 }}
      >
        Occasion : {occasion?.title}
      </Grid>
    </Grid>
  </Box>
);

export default RecipientStatus;
