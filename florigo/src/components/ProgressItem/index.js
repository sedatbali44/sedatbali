import { Stack, Typography, LinearProgress } from '@components';
import numeral from 'numeral';

function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

const ProgressItem = ({ progress, total, color }) => (
  <Stack spacing={1}>
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        {progress.title}
      </Typography>
      <Typography variant="subtitle2">{fCurrency(total?.totalPrice)}</Typography>
    </Stack>

    <LinearProgress variant="determinate" size={40} value={100} sx={{ backgroundColor: color }} />
  </Stack>
);

export default ProgressItem;
