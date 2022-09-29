import { useState, useEffect } from 'react';
import { Grid, Toolbar, Card, CardContent, Box, IconButton } from '@mui/material';
import i18n, { t } from 'i18next';
import ReportsService from 'services/reportsService';
import TableCustomized from 'components/TableCustomized';
import { startOfDay, endOfDay, format } from 'date-fns';
import en from './i18n/en.json';
import Iconify from 'components/Iconify';
import OrderPreview from 'components/OrderPreview';
import RangeDateInput from 'components/RangeDateInput';
import LoadingOverlay from 'utils/LoadingOverlay';
import Banks from './components/Banks';
import Vendors from './components/Vendors';
import Occasions from './components/Occasions';
import Tags from './components/Tags';
import Timezones from './components/Timezones';

i18n.addResourceBundle('en', 'dailyreports', en);

const OrderReports = () => {
  const [starttime, setStartTime] = useState(startOfDay(new Date()).getTime()); // eslint-disable-line
  const [endtime, setEndTime] = useState(endOfDay(new Date()).getTime()); // eslint-disable-line
  const [rows, setRows] = useState([]);
  const [isLoading, setSIsloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedValues, setSelectedValues] = useState(null);

  const [orders, setOrders] = useState([]);

  const getAllDailyinfo = async () => {
    const data = await ReportsService.getDailyReports(starttime, endtime);
    setRows(data);
  };

  const [headCells] = useState([
    {
      id: 'id',
      align: 'left',
      disablePadding: false,
      label: t('headCells.id'),
    },
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: t('headCells.orderId'),
    },
    {
      id: 'customer',
      align: 'center',
      disablePadding: false,
      label: t('headCells.customerInfo'),
      component: (row) => (
        <Box>
          <Grid container>
            <Grid item xs={12}>
              {row.customer?.firstname} {row.customer?.lastname}
            </Grid>
            <Grid item xs={12}>
              {row.customer?.phone}
            </Grid>
            <Grid item xs={12}>
              {row.customer?.email}
            </Grid>
          </Grid>
        </Box>
      ),
    },

    {
      id: 'delivery',
      align: 'center',
      disablePadding: false,
      label: t('headCells.deliveryInfo'),
      component: (row) => (
        <Box>
          <Grid container>
            {row.order_details.map((item, i) => (
              <Grid key={i} item xs={12}>
                <Box sx={{ padding: 0.1 }}>
                  <Box>{format(new Date(item?.delivery_date * 1000), 'MM-dd-yyyy h:mm a')}</Box>
                  <Box>
                    {item.delivery.firstname} {item.delivery.lastname}
                  </Box>
                  <Box>{item.delivery.email}</Box>
                  <Box>{item.delivery.phone}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      id: 'created_at',
      align: 'center',
      disablePadding: false,
      label: t('headCells.createdAt'),
      component: (row) => <Box>{format(new Date(row.created_at), 'MM-dd-yyyy h:mm a')}</Box>,
    },
    {
      id: 'price',
      align: 'center',
      disablePadding: false,
      label: t('headCells.price'),
      component: (row) => <Box>$ {row.details?.total_price}</Box>,
    },
    {
      id: 'show',
      align: 'center',
      disablePadding: false,
      label: t('headCells.preview'),
      component: (row) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedOrder(row);
              setOpen(true);
            }}
          >
            <Iconify icon={'bx:show-alt'}></Iconify>
          </IconButton>
        </Box>
      ),
    },
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;

    if (starttime != null && endtime != null) {
      getAllDailyinfo();
      setSIsloading(false);
    } else {
      setSIsloading(true);
    }

    return () => {
      unmounted = true;
    };
  }, [starttime, endtime]);

  return (
    <LoadingOverlay isLoading={isLoading}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Banks items={rows.banksTotal} starttime={starttime} endtime={endtime} setOrders={setOrders}></Banks>
                </Grid>
                <Grid item xs={8}>
                  <Vendors
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    items={rows.vendorsTotal}
                    starttime={starttime}
                    endtime={endtime}
                    setOrders={setOrders}
                  ></Vendors>
                </Grid>
                <Grid item xs={12}>
                  <Occasions
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    items={rows.occasionsTotal}
                    starttime={starttime}
                    endtime={endtime}
                    setOrders={setOrders}
                  ></Occasions>
                </Grid>
                <Grid item xs={12}>
                  <Tags
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    items={rows.tagsTotal}
                    starttime={starttime}
                    endtime={endtime}
                    setOrders={setOrders}
                  ></Tags>
                </Grid>
                <Grid item xs={12}>
                  <Timezones
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    items={rows?.timezonesTotal}
                    starttime={starttime}
                    endtime={endtime}
                    setOrders={setOrders}
                  ></Timezones>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableCustomized
                align="right"
                rows={orders}
                headCells={headCells}
                perpage={10}
                rowsperpage={[10, 25, 50]}
              >
                <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
                  <RangeDateInput
                    startdate={starttime}
                    enddate={endtime}
                    setStartDate={setStartTime}
                    setEndDate={setEndTime}
                    onSubmit={() => {
                      getAllDailyinfo();
                    }}
                  ></RangeDateInput>
                </Toolbar>
              </TableCustomized>
              <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </LoadingOverlay>
  );
};

export default OrderReports;
