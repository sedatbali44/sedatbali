import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';

import { SectionStyle, SectionHeader } from './SectionDetail';

import Iconify from 'components/Iconify';

import OrderPriceDetailed from './OrderPriceDetailed';

const FullFillOrder = ({ save, navigate }) => (
  <Box sx={SectionStyle}>
    <SectionHeader>FULLFILL ORDER</SectionHeader>
    <Grid container>
      <Grid item xs={12}>
        <OrderPriceDetailed></OrderPriceDetailed>
      </Grid>
    </Grid>
    <Grid container sx={{ marginY: 2 }} spacing={0.3}>
      <Grid item xs={12} sx={{ display: 'flex', flexDiretion: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant={'h5'}>Sale Margin 39.97%</Typography>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'API'} fullWidth></TextField>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth size={'small'}>
          <InputLabel id="demo-simple-select-label">Select Vendor</InputLabel>
          <Select value={10} labelId="demo-simple-select-label" id="demo-simple-select" label="Select Vendor" fullWidth>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'Florist ID'} fullWidth></TextField>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'Sending Price'} fullWidth></TextField>
        </Box>
      </Grid>
    </Grid>
    <Grid container sx={{ marginY: 2 }} spacing={0.3}>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'Vendor Order Id'} fullWidth></TextField>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'Florist Name'} fullWidth></TextField>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField size={'small'} label={'Florist Phone'} fullWidth></TextField>
        </Box>
      </Grid>
    </Grid>

    <Divider sx={{ mt: 2, mb: 1 }}></Divider>
    <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        variant={'contained'}
        size={'medium'}
        onClick={() => {
          save();
        }}
        startIcon={<Iconify icon="fluent:save-20-filled"></Iconify>}
      >
        UPDATE & SAVE ORDER
      </Button>
      <Button
        sx={{ width: 150 }}
        startIcon={<Iconify icon="fluent:save-20-filled"></Iconify>}
        color={'error'}
        variant={'outlined'}
        size={'medium'}
        onClick={() => {
          navigate(-1);
        }}
      >
        CLOSE
      </Button>
    </Grid>
  </Box>
);
export default FullFillOrder;
