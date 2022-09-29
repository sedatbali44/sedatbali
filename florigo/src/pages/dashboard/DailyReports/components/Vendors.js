import { Grid, Typography, Divider, Card, CardContent } from '@components';
import reportServices from 'services/reportsService';
import TagsBox2 from './TagsBox2';

const Vendors = ({ items, starttime, endtime, setOrders, setSelectedValues, selectedValues }) => {
  const getValues = async (e) => {
    await reportServices.getVendorTransactions(e, starttime, endtime).then((res) => {
      setOrders(res);
    });
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant={'h6'} sx={{ fontWeight: 400 }} color="info.light">
              # Vendors
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
            {items &&
              items.map((item, i) => (
                <TagsBox2
                  color={selectedValues?.vendorId === item.vendorId ? '#CEFA055e' : 'white'}
                  status={item.vendorId}
                  title={item.title}
                  key={i}
                  count={parseFloat(item.total).toFixed(2)}
                  getValues={(e) => {
                    setSelectedValues(item);
                    getValues(e);
                  }}
                ></TagsBox2>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Vendors;
