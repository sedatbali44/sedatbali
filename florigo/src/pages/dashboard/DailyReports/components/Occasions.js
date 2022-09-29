import { Grid, Typography, Divider, Card, CardContent } from '@mui/material';
import reportServices from 'services/reportsService';
import TagsBox2 from './TagsBox2';

const Occasions = ({ items, starttime, endtime, setOrders, setSelectedValues, selectedValues }) => {
  const getValues = async (e) => {
    await reportServices.getOccasionTransactions(e, starttime, endtime).then((res) => {
      setOrders(res);
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant={'h6'} sx={{ fontWeight: 400 }} color="info.light">
              # Occasions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
            {items &&
              items.map((item, i) => (
                <TagsBox2
                  status={item.occasion_id}
                  color={selectedValues?.title === item.title ? '#CEFA055e' : 'white'}
                  title={item.title}
                  key={i}
                  getValues={(e) => {
                    getValues(e);
                    setSelectedValues(item);
                  }}
                  count={item.totalPrice}
                ></TagsBox2>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Occasions;
