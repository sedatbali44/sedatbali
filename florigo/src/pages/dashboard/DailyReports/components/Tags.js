import { Grid, Typography, Divider, Card, CardContent } from '@components';
import reportServices from 'services/reportsService';
import TagsBox from './TagsBox';

const Tags = ({ items, starttime, endtime, setOrders, selectedValues, setSelectedValues }) => {
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
              # Tags
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flex: 'row', flexWrap: 'wrap' }}>
            {items &&
              items.map((item, i) => (
                <TagsBox
                  color={selectedValues?.title === item.title ? '#CEFA055e' : 'white'}
                  status={item.title}
                  key={i}
                  count={item.total}
                  getValues={(e) => {
                    setSelectedValues(item);
                    getValues(e);
                  }}
                ></TagsBox>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Tags;
