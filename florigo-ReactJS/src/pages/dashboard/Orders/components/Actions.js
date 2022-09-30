import { useState } from 'react';
import { Box, Grid, Button } from '@mui/material';

import { format } from 'date-fns';

import { SectionStyle, SectionHeader } from './SectionDetail';

import { useSelector } from 'react-redux';

import StatusSelector from './StatusSelector';

const Actions = ({ orderId, currentStatus, service }) => {
  const user = useSelector((state) => state.auth.user); // eslint-disable-line

  const [status, setStatus] = useState(currentStatus);

  const onChange = (val) => {
    service.setOrderTag(orderId, val).then(() => {
      setStatus(val);
    });
  };

  return (
    <Box sx={SectionStyle}>
      <SectionHeader>ACTIONS</SectionHeader>
      <Grid container sx={{ marginY: 2 }}>
        <Grid item xs={6} sx={{ borderRadius: 1, bgcolor: 'rgb(2,2,2,0.1)', padding: 1, fontSize: 12 }}>
          <strong>Claimed By</strong> <br /> Mahir Altinkaya <br /> (
          {format(new Date().getTime(), 'dd-MM-yyyy hh:mm aa')})
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
          <StatusSelector status={status} setStatus={onChange}></StatusSelector>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
          <Button
            fullWidth
            color="error"
            variant={'contained'}
            size={'small'}
            sx={{ marginX: 1 }}
            target="_blank"
            href="https://www.yelp.com/search?find_desc=florist&find_loc=07047"
          >
            FIND IN YELP
          </Button>
          <Button fullWidth color="info" variant={'contained'} size={'small'} sx={{ marginX: 1 }}>
            EMAIL TO FLORIST
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
          <Button fullWidth color="primary" variant={'contained'} size={'small'} sx={{ marginX: 1 }}>
            ORDER LOG
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Actions;
