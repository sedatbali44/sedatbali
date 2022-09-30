import { Grid, Typography, Divider, Card, CardContent, CardActions } from '@mui/material';
import Iconify from 'components/Iconify';

import useNumberToAmount from 'hooks/useNumberToAmount';

const Vendors = ({ title, vendors, tags, banks, occasions }) => {
  const changeToPrice = useNumberToAmount();

  return (
    <Grid container sx={{ marginBottom: 1 }}>
      <Grid item xs={12} sx={{ backgroundColor: 'rgba(178, 190, 181,0.03)', padding: 1, borderRadius: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Divider></Divider>
        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingY: 1 }}>
            {tags &&
              tags.map((item, i) => (
                <Card
                  key={i}
                  variant="outlined"
                  sx={{ marginX: 1, marginY: 0.5, minWidth: 120, borderRadius: 0.5, padding: 0 }}
                >
                  <CardContent sx={{ paddingX: 1, paddingY: 0.3 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                  </CardContent>
                  <Divider sx={{ marginX: 1 }}></Divider>
                  <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingY: 0.2, alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="akar-icons:info-fill" sx={{ fontSize: 18 }}></Iconify> {changeToPrice(123)}
                    </Typography>
                  </CardActions>
                </Card>
              ))}
            {vendors &&
              vendors.map((item, i) => (
                <Card
                  key={i}
                  variant="outlined"
                  sx={{ marginX: 1, marginY: 0.5, minWidth: 120, borderRadius: 0.5, padding: 0 }}
                >
                  <CardContent sx={{ paddingX: 1, paddingY: 0.3 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                  </CardContent>
                  <Divider sx={{ marginX: 1 }}></Divider>
                  <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingY: 0.2, alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="bxs:dollar-circle" sx={{ fontSize: 18 }}></Iconify> {changeToPrice(item.total)}
                    </Typography>
                  </CardActions>
                </Card>
              ))}
            {banks &&
              banks.map((item, i) => (
                <Card
                  key={i}
                  variant="outlined"
                  sx={{ marginX: 1, marginY: 0.5, minWidth: 120, borderRadius: 0.5, padding: 0 }}
                >
                  <CardContent sx={{ paddingX: 1, paddingY: 0.3 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                  </CardContent>
                  <Divider sx={{ marginX: 1 }}></Divider>
                  <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingY: 0.2, alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="bxs:dollar-circle" sx={{ fontSize: 18 }}></Iconify> {changeToPrice(item.total)}
                    </Typography>
                  </CardActions>
                </Card>
              ))}
            {occasions &&
              occasions.map((item, i) => (
                <Card
                  key={i}
                  variant="outlined"
                  sx={{ marginX: 1, marginY: 0.5, minWidth: 120, borderRadius: 0.5, padding: 0 }}
                >
                  <CardContent sx={{ paddingX: 1, paddingY: 0.3 }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                  </CardContent>
                  <Divider sx={{ marginX: 1 }}></Divider>
                  <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingY: 0.2, alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Iconify icon="fluent:status-20-regular" sx={{ fontSize: 18 }}></Iconify> {changeToPrice(123)}
                    </Typography>
                  </CardActions>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Vendors;
