import { useState, useEffect } from 'react';
import { Grid, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';

import DailySummary from './DailySummary';

import LoadingOverlay from 'utils/LoadingOverlay';
import Page from 'components/Page';

import CustomDatePicker from './components/CustomDatePicker';

const OrderReports = () => {
  const { tags, vendors, banks, occasions } = useSelector((state) => state.orders);

  const [isLoading, setSIsloading] = useState(true);

  const [filterDate, setFilterDate] = useState();

  useEffect(() => {
    setTimeout(() => {
      setSIsloading(false);
    }, 300);
  }, []);

  return (
    <Page>
      <LoadingOverlay isLoading={isLoading}>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <CustomDatePicker value={filterDate} setValue={setFilterDate} />
            </Toolbar>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 1, zoom: '95%' }}>
            <DailySummary title="BANKS" banks={banks}></DailySummary>
            <DailySummary title="VENDORS" vendors={vendors}></DailySummary>
            <DailySummary title="TAGS" tags={tags}></DailySummary>
            <DailySummary title="OCCASIONS" occasions={occasions}></DailySummary>
          </Grid>
        </Grid>
      </LoadingOverlay>
    </Page>
  );
};

export default OrderReports;
