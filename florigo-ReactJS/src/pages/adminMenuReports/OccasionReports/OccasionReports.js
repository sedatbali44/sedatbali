import Page from 'components/Page';
import { Container, Grid, startOfDay, endOfDay, colors, format, IconButton, Iconify } from '@components';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OccasionsService from 'services/OccasionsService';
import TableCustomized from 'components/TableCustomized';
import RangeDateInput from 'components/RangeDateInput';

import { useSelector } from 'react-redux';

import InformationCard from 'components/InformationCard';

import useNumberToAmount from 'hooks/useNumberToAmount';

import OrderPreview from 'components/OrderPreview';

i18n.addResourceBundle('en', 'occasionreport', en);

export default function SalesByStates() {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const numberToAmount = useNumberToAmount();
  const [isLoading, setIsLoading] = useState(false);
  const occasions = useSelector((state) => state.orders.occasions);
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());

  const getOccasionsTransactions = async () => {
    setIsLoading(true);
    await OccasionsService.getOccasionsTransactions(starttime, endtime)
      .then((res) => {
        if (res) setRows(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    const getOccasions = async () => {
      getOccasionsTransactions();
    };
    getOccasions();

    return () => {
      unmounted = true;
    };
  }, []);

  const checkOccasion = (title) => {
    const total = rows.find((occasion) => occasion.title === title);

    return total;
  };

  const getOccasionTransactions = async (occasion) => {
    setIsLoading(true);
    await OccasionsService.getOccasionTransactions(starttime, endtime, occasion.id)
      .then((res) => {
        if (res) setTransactions(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      component: (row) => <Box>$ {row.order_details.length}</Box>,
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
  return (
    <Page loading={isLoading}>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          {occasions &&
            occasions.map((item, i) => {
              const total = checkOccasion(item.title);
              return (
                <Grid key={i} item xs={12} sm={6} md={4} xl={3}>
                  <InformationCard
                    onSubmit={() => {
                      getOccasionTransactions(item);
                    }}
                    sx={{ minWidth: 274, cursor: 'pointer' }}
                    title={`$ ${numberToAmount(total?.totalPrice.toFixed(2) || 0)}`}
                    subtitle={item.title}
                    count={total?.count || 0}
                    icon={'fa6-solid:puzzle-piece'}
                    color={colors[i]}
                  ></InformationCard>
                </Grid>
              );
            })}

          <Grid item xs={12}>
            <TableCustomized rows={transactions} headCells={headCells}>
              <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                <Box sx={{ flex: 1 }}></Box>
                <RangeDateInput
                  startdate={starttime}
                  enddate={endtime}
                  setStartDate={setStarttime}
                  setEndDate={setEndtime}
                  onSubmit={getOccasionsTransactions}
                ></RangeDateInput>
              </Box>
            </TableCustomized>
            <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
