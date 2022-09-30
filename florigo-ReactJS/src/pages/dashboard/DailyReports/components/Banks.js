import { Grid, Typography, Divider, Card, CardContent } from '@mui/material';
import reportServices from 'services/reportsService';
import TagsBox from './TagsBox';

const Banks = ({ items, starttime, endtime, setOrders }) => {
  const getValues = async (e) => {
    await reportServices.getTagTransactions(e, starttime, endtime).then((res) => {
      setOrders(res);
    });
  };
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant={'h6'} sx={{ fontWeight: 400 }} color="info.light">
              # Banks
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
            {items &&
              items.map((item, i) => (
                <TagsBox
                  status={item.title}
                  getValues={(e) => {
                    getValues(e);
                  }}
                  key={i}
                  count={parseFloat(item.total).toFixed(2)}
                ></TagsBox>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Banks;
