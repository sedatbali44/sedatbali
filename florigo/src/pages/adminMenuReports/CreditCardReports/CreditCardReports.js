import Page from 'components/Page';
import Iconify from 'components/Iconify';
import { format } from 'date-fns';
import { Container, Grid, TextField, IconButton } from '@mui/material';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import OrderPreview from 'components/OrderPreview';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CreditCardReportsService from 'services/creditCardReportsService';
import TableCustomized from 'components/TableCustomized';
import { startOfDay, endOfDay, RangeDateInput } from '@components';

i18n.addResourceBundle('en', 'creditcardreports', en);

export default function CreditCardReports() {
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());
  const [last5digit, setLast5digit] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const [headCells] = useState([
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: t('creditcardreports:headCells.order_id'),
    },
    {
      id: 'firstname',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.firstname'),
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.firstname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'lastname',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.lastname'),
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.lastname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'created_at',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.created_at'),
      component: (row) => <Box>{format(new Date(row.created_at), 'MM-dd-yyyy h:mm a')}</Box>,
    },
    {
      id: 'order_status',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.order_status'),
    },
    {
      id: 'order_tag',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.order_tag'),
    },

    {
      id: 'creditcardlast5digits',
      align: 'center',
      disablePadding: false,
      label: t('creditcardreports:headCells.creditcardlast6digits'),
      component: (row) => (
        <Box>
          {row.payment_logs.map((item, i) => (
            <span key={i}>{item?.request?.cardNumber}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'show',
      align: 'right',
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

  const getAllCardinfo = async () => {
    const data = await CreditCardReportsService.getCreditCardandOrders(last5digit, starttime, endtime);
    setRows(data);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;

    if (last5digit.length === 5 || last5digit === null) {
      getAllCardinfo();
    }

    return () => {
      unmounted = true;
    };
  }, [starttime, endtime, last5digit]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableCustomized rows={rows} headCells={headCells}>
              <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                <Box sx={{ flex: 1 }}></Box>
                <TextField
                  variant="outlined"
                  sx={{ width: 260 }}
                  size={'small'}
                  label="Enter last 5 digits of credit card"
                  value={last5digit}
                  onChange={(e) => {
                    setLast5digit(e.target.value);
                  }}
                ></TextField>
                <RangeDateInput
                  startdate={starttime}
                  enddate={endtime}
                  hidesearch
                  setStartDate={setStarttime}
                  setEndDate={setEndtime}
                ></RangeDateInput>
              </Box>
              <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
            </TableCustomized>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
