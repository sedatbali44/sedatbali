import { useState, useEffect } from 'react';
import {
  startOfDay,
  endOfDay,
  Grid,
  Toolbar,
  Divider,
  Box,
  RangeDateInput,
  TableCustomized,
  format,
  Iconify,
  IconButton,
} from '@components';

import OrderPreview from 'components/OrderPreview';
import Page from 'components/Page';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useNumberToAmount from 'hooks/useNumberToAmount';
import InformationCard from 'components/InformationCard';
import { red, blue, green, orange } from '@mui/material/colors';

import ReportsService from 'services/reportsService';

i18n.addResourceBundle('en', 'bankreports', en);

const colors = [red[400], blue[400], green[400], orange[400]];

const BankReports = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const numberToAmount = useNumberToAmount();

  const headCells = [
    {
      id: 'id',
      align: 'center',
      disablePadding: true,
      label: t('headCells.id'),
    },
    {
      id: 'order_id',
      align: 'center',
      disablePadding: true,
      label: t('headCells.orderId'),
    },

    {
      id: 'customer',
      align: 'center',
      disablePadding: false,
      label: t('headCells.date'),
      component: (row) => <Box>{row.customer.firstname.concat(` ${row.customer.lastname}`)}</Box>,
    },

    {
      id: 'order_status',
      align: 'center',
      disablePadding: false,
      label: t('headCells.status'),
    },

    {
      id: 'created_at',
      align: 'center',
      disablePadding: false,
      label: t('headCells.date'),
      component: (row) => <Box>{format(new Date(row.created_at), 'MM-dd-yyyy h:mm a')}</Box>,
    },

    {
      id: 'count',
      align: 'center',
      disablePadding: false,
      label: t('headCells.piece'),
      component: (row) => <Box> {row.order_details.length}</Box>,
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
  ];
  const getBankTotalTransactions = async () => {
    setIsLoading(true);
    ReportsService.getBankTotalTransactions(starttime, endtime)
      .then((res) => {
        setBanks(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getBankTransactions = async (bankId) => {
    setIsLoading(true);
    ReportsService.getBankTransactions(starttime, endtime, bankId)
      .then((res) => {
        setOrders(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let unmounted = false; // eslint-disable-line

    getBankTotalTransactions();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Page loading={isLoading}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <RangeDateInput
                startdate={starttime}
                enddate={endtime}
                setStartDate={setStarttime}
                setEndDate={setEndtime}
                onSubmit={() => {
                  getBankTotalTransactions();
                }}
              ></RangeDateInput>
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
        {banks &&
          banks.map((item, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => {
                getBankTransactions(item.bankId);
              }}
              style={{ cursor: 'pointer' }}
            >
              <InformationCard
                sx={{ maxWidth: 300 }}
                title={`$ ${numberToAmount(item.total)}`}
                subtitle={item.title}
                count={item?.count || 0}
                icon={'clarity:bank-solid'}
                color={colors[i]}
              ></InformationCard>
            </Grid>
          ))}
      </Grid>

      {orders && (
        <Grid container sx={{ marginTop: 5 }}>
          <Grid item xs={12}>
            <TableCustomized rows={orders} headCells={headCells}></TableCustomized>
            <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
          </Grid>
        </Grid>
      )}
    </Page>
  );
};
export default BankReports;
