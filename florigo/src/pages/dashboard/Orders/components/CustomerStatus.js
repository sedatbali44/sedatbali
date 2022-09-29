import { Box, Grid } from '@mui/material';

import CopyClipboard from 'components/CopyClipboard';

const CustomerStatus = ({ name, phone, email }) => (
  <Box sx={{ minWidth: 200, display: 'flex', alignItems: 'center' }}>
    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        {name}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        <CopyClipboard value={phone}></CopyClipboard>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        <CopyClipboard value={email}></CopyClipboard>
      </Grid>
    </Grid>
  </Box>
);

export default CustomerStatus;
