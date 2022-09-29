import { Grid, useState, useEffect, Typography, Divider, Box, format } from '@components';
import TableCustomized from 'components/TableCustomized';
import Scrollbar from 'components/Scrollbar';
import useWindowDimensions from 'hooks/useWindowDimensions';

import orderService from 'services/ordersService';
import { useSelector } from 'react-redux';

import { t } from 'locales/i18n';

const OrderLogsComponent = ({ id, renderButton, orderId }) => {
  const tags = useSelector((state) => state.orders.tags);
  const [rows, setRows] = useState([]);
  const { height } = useWindowDimensions();
  const statusFinder = (key) => tags.find((x) => x.key === key)?.title;

  const headCells = [
    {
      id: 'Owner',
      align: 'left',
      disablePadding: false,
      label: 'Employee',
      component: (row) => (
        <Box>
          {row.details?.firstname} {row.details?.lastname}
        </Box>
      ),
    },
    {
      id: 'message',
      align: 'left',
      disablePadding: true,
      label: 'Action',
    },
    {
      id: 'old_action',
      align: 'left',
      disablePadding: true,
      label: 'Old Value',
      component: (row) => (
        <Box>
          <Box>{row.details?.oldOrderTag && statusFinder(row.details?.oldOrderTag)} </Box>
          <Box>{row.details?.oldDate && format(new Date(row.details?.oldDate * 1000), 'MM-dd-yyyy')} </Box>
        </Box>
      ),
    },
    {
      id: 'new_action',
      align: 'left',
      disablePadding: true,
      label: 'New Value',
      component: (row) => (
        <Box>
          <Box>{row.details?.orderTag && statusFinder(row.details?.orderTag)} </Box>
          <Box>{row.details?.newDate && format(new Date(row.details?.newDate * 1000), 'MM-dd-yyyy')} </Box>
        </Box>
      ),
    },
    {
      id: 'createdate',
      align: 'right',
      disablePadding: false,
      label: t('headCells.date'),
      component: (row) => <Box>{format(new Date(row.createdAt), 'MM-dd-yyyy hh:mm a')}</Box>,
    },
  ];

  useEffect(() => {
    const getLogs = async () => {
      await orderService.getOrderLogs(id).then((res) => {
        setRows(res.rows);
      });
    };

    getLogs();
  }, []);

  return (
    <Grid container sx={{ height: height - 100, display: 'flex', flexDirection: 'column' }}>
      <Scrollbar>
        <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant={'h5'}>Order Logs #{orderId}</Typography>
          {renderButton}
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{}}></Divider>
          <TableCustomized rows={rows} headCells={headCells}></TableCustomized>
        </Grid>
      </Scrollbar>
    </Grid>
  );
};

export default OrderLogsComponent;
