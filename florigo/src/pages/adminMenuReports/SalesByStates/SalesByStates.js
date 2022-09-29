import Page from 'components/Page';
import OrderPreview from 'components/OrderPreview';
import Iconify from 'components/Iconify';
import { format } from 'date-fns';
import { Container, Grid, TextField, Autocomplete, IconButton } from '@mui/material';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SalesByStatesService from 'services/salesByStatesService';
import TableCustomized from 'components/TableCustomized';
import { startOfDay, endOfDay, RangeDateInput } from '@components';

import { useSelector } from 'react-redux';

i18n.addResourceBundle('en', 'salesbystates', en);

export default function SalesByStates() {
  const { states } = useSelector((state) => state.orders);
  const [selected, setSelected] = useState({
    code: 'AL',
    id: 1,
    title: 'Alabama',
  });

  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [headCells] = useState([
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: t('salesbystates:headCells.order_id'),
    },
    {
      id: 'firstname',
      align: 'center',
      disablePadding: false,
      label: t('salesbystates:headCells.firstname'),
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
      label: t('salesbystates:headCells.lastname'),
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
      label: t('salesbystates:headCells.created_at'),
      component: (row) => <Box>{format(new Date(row.created_at), 'MM-dd-yyyy h:mm a')}</Box>,
    },
    {
      id: 'order_status',
      align: 'center',
      disablePadding: false,
      label: t('salesbystates:headCells.order_status'),
    },
    {
      id: 'order_tag',
      align: 'center',
      disablePadding: false,
      label: t('salesbystates:headCells.order_tag'),
    },

    {
      id: 'state',
      align: 'center',
      disablePadding: false,
      label: t('salesbystates:headCells.state'),
      component: (row) => <Box>{row.details?.state}</Box>,
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

  const getAllStateinfo = async () => {
    const data = await SalesByStatesService.getStateandOrders(selected.code, starttime, endtime);
    setRows(data);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;

    if (selected.code != null || selected.code === undefined) {
      getAllStateinfo();
    }

    return () => {
      unmounted = true;
    };
  }, [starttime, endtime, selected]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableCustomized rows={rows} headCells={headCells}>
              <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                <Box sx={{ flex: 1 }}></Box>
                <Autocomplete
                  value={selected}
                  onChange={(event, value) => {
                    if (typeof value === 'string') {
                      setSelected(value);
                    } else if (value !== null) {
                      setSelected(value);
                    }
                  }}
                  sx={{ width: 200 }}
                  size={'small'}
                  getOptionLabel={(option) => option.title}
                  isOptionEqualToValue={(option, value) => option.code === value.code}
                  options={states}
                  renderInput={(params) => <TextField {...params} label="Select State" />}
                />
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
