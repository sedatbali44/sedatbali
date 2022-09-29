import Page from 'components/Page';
import { Grid, Divider } from '@mui/material';

import i18n from 'i18next';
import en from './i18n/en.json';

import EmployeeList from './components/EmployeeList';

import { useSelector } from 'react-redux';

i18n.addResourceBundle('en', 'orderaudits', en);

const OrderAudits = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <Page>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <EmployeeList employees={orders}></EmployeeList>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginY: 2 }}></Divider>
        </Grid>
      </Grid>
    </Page>
  );
};

export default OrderAudits;
