import { Grid, Box, Divider, Typography, Button } from '@mui/material';

import Iconify from 'components/Iconify';

import {
  red,
  blue,
  green,
  purple,
  orange,
  teal,
  indigo,
  yellow,
  pink,
  lime,
  lightGreen,
  deepPurple,
  amber,
} from '@mui/material/colors';

const TagsBox = ({ count = null, status, icon, color, keys, selectedStatus, setSelectedStatus }) => (
  <Button
    variant="standart"
    sx={{
      width: 155,
      height: 65,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '.1px solid #dfdfdfe5',
      borderRadius: 1,
      margin: 0.3,
      backgroundColor: selectedStatus === keys ? '#CEFA055e' : 'transparent',
    }}
    onClick={() => {
      setSelectedStatus(keys);
    }}
  >
    <Box>
      <Typography variant="body1" color={color} sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        <Iconify icon={icon} sx={{ fontSize: 16, marginX: 1, fontWeight: 'bold' }}></Iconify> {count}
      </Typography>
    </Box>
    <Divider sx={{ mx: 1 }}></Divider>
    <Box sx={{ textAlign: 'center', fontSize: 12 }}>{status}</Box>
  </Button>
);

const refundList = ['cancelled', 'chargeback', 'non_delivery', 'rejection', 'refund'];

const ListStatusColored = ({
  tags,
  selectedStatus,
  setSelectedStatus,
  orders,
  occasions,
  selectedOccasion,
  setSelectedOccasion,
  timezones = [],
  selectedTimezone,
  setSelectedTimezone,
}) => {
  const occasionCounts = (title) => {
    const lists = orders.filter((item) => item.order_details.some((x) => x.delivery?.occasion?.title === title));
    return lists.length;
  };

  const colors = [
    red[600],
    blue[600],
    green[600],
    purple[600],
    orange[600],
    teal[600],
    indigo[600],
    yellow[600],
    pink[600],
    lime[600],
    lightGreen[600],
    deepPurple[600],
    amber[600],
  ];
  const timezoneCount = (title) => {
    const lists = orders.filter((item) => item.details.customerTimezone === title);

    return lists.length;
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant={'h6'}># Tags</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flex: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {tags &&
          tags.map((item, i) => (
            <Box key={i}>
              {!refundList.includes(item.key) && (
                <TagsBox
                  status={item.title}
                  icon={item.icon}
                  color={item.color}
                  keys={item.key}
                  count={orders.filter((x) => x.order_tag === item.key).length || 0}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={(e) => {
                    if (selectedStatus === e) {
                      setSelectedStatus('');
                    } else {
                      setSelectedStatus(e);
                    }
                  }}
                ></TagsBox>
              )}
            </Box>
          ))}
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginY: 3 }}></Divider>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}># Occasions</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        {occasions &&
          occasions.map((item) => (
            <Button
              key={item.title}
              variant="standart"
              sx={{
                width: 150,
                height: 65,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '.1px solid #dfdfdfe5',
                borderRadius: 1,
                margin: 0.3,
                backgroundColor: selectedOccasion === item.title ? '#CEFA055e' : 'transparent',
              }}
              onClick={() => {
                if (selectedOccasion === item.title) {
                  setSelectedOccasion('');
                } else {
                  setSelectedOccasion(item.title);
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Iconify
                  icon={'fa:clock-o'}
                  sx={{ fontSize: 13, marginX: 1, fontWeight: 'bold' }}
                  color={item.color[500]}
                ></Iconify>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color={item.color[500]}
                  sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>{occasionCounts(item.title)}</Box>
            </Button>
          ))}
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginY: 3 }}></Divider>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}># Timezones</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
        {timezones &&
          timezones.map((item, i) => (
            <Box key={i}>
              {
                <Grid item sx={{ flex: 1 }}>
                  <Button
                    variant="standart"
                    sx={{
                      width: 230,
                      height: 75,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '.1px solid #dfdfdfe5',
                      borderRadius: 1,
                      margin: 0.3,
                      backgroundColor: selectedTimezone === item ? '#CEFA055e' : 'transparent',
                    }}
                    onClick={() => {
                      if (selectedTimezone === item) {
                        setSelectedTimezone('');
                      } else {
                        setSelectedTimezone(item);
                      }
                    }}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        {item}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Box>
                        <Typography
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: colors[i],
                            fontSize: 14,
                          }}
                        >
                          <Iconify icon={'fa:clock-o'} sx={{ fontSize: 14, marginX: 1, fontWeight: 'bold' }}></Iconify>
                          {timezoneCount(item)}
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                </Grid>
              }
            </Box>
          ))}
      </Grid>
    </Grid>
  );
};

export default ListStatusColored;
