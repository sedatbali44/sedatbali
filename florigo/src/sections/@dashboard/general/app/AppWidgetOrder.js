import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AppWidgetOrder.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidgetOrder({ title, count, total, chartColor, chartData }) {
  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ backgroundColor: 'rgb(255,255,255,)', display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography color={'primary'} variant="subtitle2">
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography color={'primary'} variant="h2">
            {fNumber(count)}
          </Typography>
        </Stack>

        <Typography color={'primary'} variant="h3">
          ${fNumber(total)}
        </Typography>
      </Box>

      <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
