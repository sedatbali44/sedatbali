import { useEffect, useState } from 'react';
import { colors } from 'components/InformationCard';
import i18n, { t } from 'i18next';
import { Grid, Typography, Box, Divider, IconButton } from '@mui/material';
import TableCustomized from 'components/TableCustomized';
import VendorReportsService from 'services/vendorReportsService';
import OrderPreview from 'components/OrderPreview';
import { format } from 'date-fns';
import Iconify from 'components/Iconify';
import { setStartTime, setEndTime } from 'redux/slices/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar, RangeDateInput } from '@components';
import en from './i18n/en.json';

import useMarginCalculator from 'hooks/useMarginCalculator';

i18n.addResourceBundle('en', 'vendorreports', en);

const VendorReports = () => {
  const marginCalculate = useMarginCalculator();
  const dispatch = useDispatch();
  const { starttime, endtime } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setHeadCells2([
      {
        id: 'subtitle',
        align: 'left',
        disablePadding: false,
        label: 'Title',
        component: (row) => (
          <Box>
            <Typography variant="h6"> {row?.subtitle}</Typography>
          </Box>
        ),
      },
      {
        id: 'title',
        align: 'center',
        disablePadding: false,
        label: t('headCells.price'),
        component: (row) => (
          <Box>
            <Typography variant="h6"> $ {row?.title}</Typography>
          </Box>
        ),
      },
      {
        id: 'sales',
        align: 'center',
        disablePadding: false,
        label: 'Sold',
        component: (row) => (
          <Box>
            <Typography variant="h6"> $ {row?.rate}</Typography>
          </Box>
        ),
      },
      {
        id: 'margin',
        align: 'center',
        disablePadding: false,
        label: 'Margin',
        component: (row) => (
          <Box>
            <Typography variant="h6"> % {row.margin}</Typography>
          </Box>
        ),
      },
      {
        id: 'show',
        align: 'center',
        disablePadding: false,
        label: 'Details',
        component: (row) => (
          <Box>
            <IconButton
              size={'large'}
              color="primary"
              onClick={() => {
                getAllVendorOrders(row.vendorId);
              }}
            >
              <Iconify icon={'icon-park-outline:click-tap'}></Iconify>
            </IconButton>
          </Box>
        ),
      },
    ]);
    getVendorsTotalTransactions();
  }, [starttime, endtime]);

  const [datatable, setDataTable] = useState([
    {
      title: '0.00',
      subtitle: 'Bloomnet',
      color: colors[5],
      icon: 'emojione-monotone:sunflower',
      vendorId: 2,
    },
    {
      title: '0.00',
      subtitle: 'Local',
      color: colors[6],
      icon: 'carbon:load-balancer-local',
      vendorId: 3,
    },
    {
      title: '0.00',
      subtitle: 'FTD',
      color: colors[11],
      icon: 'emojione-monotone:letter-f',
      vendorId: 1,
    },
  ]);
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
  const [headCells2, setHeadCells2] = useState([
    {
      id: 'subtitle',
      align: 'left',
      disablePadding: false,
      label: 'Title',
      component: (row) => (
        <Box>
          <Typography variant="h6"> {row?.subtitle}</Typography>
        </Box>
      ),
    },
    {
      id: 'title',
      align: 'center',
      disablePadding: false,
      label: t('headCells.price'),
      component: (row) => (
        <Box>
          <Typography variant="h6"> $ {row?.title}</Typography>
        </Box>
      ),
    },
    {
      id: 'sales',
      align: 'center',
      disablePadding: false,
      label: 'Sold',
      component: (row) => (
        <Box>
          <Typography variant="h6"> $ {row?.rate}</Typography>
        </Box>
      ),
    },
    {
      id: 'margin',
      align: 'center',
      disablePadding: false,
      label: 'Margin',
      component: (row) => (
        <Box>
          <Typography variant="h6"> % {row.margin}</Typography>
        </Box>
      ),
    },
    {
      id: 'show',
      align: 'center',
      disablePadding: false,
      label: 'Details',
      component: (row) => (
        <Box>
          <IconButton
            size={'large'}
            color="primary"
            onClick={() => {
              getAllVendorOrders(row.vendorId);
            }}
          >
            <Iconify icon={'icon-park-outline:click-tap'}></Iconify>
          </IconButton>
        </Box>
      ),
    },
  ]);

  const getAllVendorOrders = async (vendorId) => {
    await VendorReportsService.getVendorsTransactions(starttime, endtime, vendorId).then((res) => {
      setRows([...res] || []);
    });
  };

  const getVendorsTotalTransactions = async () => {
    const data = await VendorReportsService.getVendorsTotalTransactions(starttime, endtime);

    datatable.map((item) => {
      const inData = data.find((x) => x.title === item.subtitle);

      if (inData) {
        item.title = parseFloat(Number(inData.total)).toFixed(2);
        item.rate = parseFloat(Number(inData.rate)).toFixed(2);
        item.margin = marginCalculate(item.title, item.rate);
      } else {
        item.title = 0;
        item.rate = 0;
        item.margin = 0;
      }

      return item;
    });

    setDataTable([...datatable]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableCustomized align="left" rows={datatable} headCells={headCells2} perpage={10} rowsperpage={[10, 25, 50]}>
          <Toolbar>
            <Box sx={{ align: 'center', display: 'flex', justifyContent: 'end', width: '100%', alignItems: 'center' }}>
              <RangeDateInput
                startdate={starttime}
                enddate={endtime}
                setStartDate={(e) => {
                  dispatch(setStartTime(e));
                }}
                setEndDate={(e) => {
                  dispatch(setEndTime(e));
                }}
                hidesearch
                hidetoday
              ></RangeDateInput>
            </Box>
          </Toolbar>
        </TableCustomized>
        <Divider sx={{ marginY: 3 }}></Divider>
      </Grid>
      <Grid item xs={12}>
        <TableCustomized align="left" rows={rows} headCells={headCells} perpage={10} rowsperpage={[10, 25, 50]}>
          <Typography variant="h5" sx={{ marginRight: 3 }}>
            ORDERS
          </Typography>
        </TableCustomized>
        <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
      </Grid>
    </Grid>
  );
};

export default VendorReports;
