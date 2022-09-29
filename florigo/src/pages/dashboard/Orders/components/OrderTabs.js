import { Box, Grid, Tabs, Tab } from '@mui/material';

import { useSelector } from 'react-redux';

import _ from 'lodash';

const OrderTabs = ({ orderLength, selectedOrder = 0, setSelectedOrder }) => {
  const user = useSelector((state) => state.auth.user); // eslint-disable-line

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'rgb(178, 190, 181,0.1)',
        borderRadius: 1,
        padding: 1,
        paddingLeft: 2,
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ overflowX: 'auto' }}>
          <Tabs
            value={selectedOrder}
            onChange={(e, value) => {
              setSelectedOrder(value);
            }}
            sx={{ marginTop: -1 }}
            size={'small'}
          >
            {_.times(orderLength, (e) => (
              <Tab key={e} label={`ORDER ${e + 1}`} sx={{ fontWeight: 'bold', fontSize: 14, width: 160 }} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderTabs;
