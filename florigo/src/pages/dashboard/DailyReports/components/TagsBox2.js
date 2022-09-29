import { Box, Button, Typography, Iconify, Divider } from '@components';

const TagsBox2 = ({ count = null, status, title, color, keys, setSelectedStatus = () => {}, getValues = () => {} }) => (
  <Button
    variant="standart"
    sx={{
      width: 180,
      height: 65,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '.1px solid #dfdfdfe5',
      borderRadius: 1,
      margin: 0.3,
      backgroundColor: color,
    }}
    onClick={() => {
      getValues(status);
      setSelectedStatus(keys);
    }}
  >
    <Box>
      <Typography variant="body1" color={'black'} sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        <Iconify icon={'foundation:dollar'} sx={{ fontSize: 20, fontWeight: 'bold' }}></Iconify>{' '}
        {parseFloat(count).toFixed(2)}
      </Typography>
    </Box>
    <Divider sx={{ mx: 1 }}></Divider>
    <Box sx={{ textAlign: 'center', fontSize: 10 }}>{title}</Box>
  </Button>
);

export default TagsBox2;
