import Page from 'components/Page';
import { Grid, Divider } from '@mui/material';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OrderConsolidationService from 'services/orderConsolidationService';
import TableCustomized from 'components/TableCustomized';
import InformationCard from 'components/InformationCard';
import { red, blue, green, orange } from '@mui/material/colors';
import useNumberToAmount from 'hooks/useNumberToAmount';

i18n.addResourceBundle('en', 'orderconsolidations', en);

const headCells = [
  {
    id: 'createdAt',
    align: 'left',
    disablePadding: true,
    label: t('orderconsolidations:headCells.date'),
  },
  {
    id: 'title',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.florist'),
  },
  {
    id: 'vendor',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.vendor'),
  },
  {
    id: 'amount',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.amount'),
  },
  {
    id: 'cc_last4_digits',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.cc_last4_digits'),
  },
  {
    id: 'florist_state',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.florist_state'),
  },
  {
    id: 'logs',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.logs'),
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: t('orderconsolidations:headCells.status'),
  },
];

export default function OrderConsolidations() {
  const [rows, setRows] = useState([]);
  const numberToAmount = useNumberToAmount();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    const getDepartments = async () => {
      const { rows } = await OrderConsolidationService.getDepartments();
      if (rows) setRows(rows);
    };

    getDepartments();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Page>
      <Grid container>
        <Grid item xs={3}>
          <InformationCard
            sx={{ maxWidth: 250 }}
            title={`$ ${numberToAmount(18.365)}`}
            subtitle={t('orderconsolidations:titles.ftd')}
            count="133"
            icon={'carbon:finance'}
            color={red[300]}
          ></InformationCard>
        </Grid>
        <Divider light sx={{ marginY: 1 }} />
        <Grid item xs={3}>
          <InformationCard
            sx={{ maxWidth: 250 }}
            title={`$ ${numberToAmount(63.457)}`}
            subtitle={t('orderconsolidations:titles.bloomnet')}
            count="871"
            icon={'file-icons:netlify'}
            color={blue[300]}
          ></InformationCard>
        </Grid>
        <Divider light sx={{ marginY: 1 }} />
        <Grid item xs={3}>
          <InformationCard
            sx={{ maxWidth: 250 }}
            title={`$ ${numberToAmount(112312.7)}`}
            subtitle={t('orderconsolidations:titles.local_order')}
            count="78"
            icon={'icon-park-solid:transaction-order'}
            color={orange[300]}
          ></InformationCard>
        </Grid>
        <Divider light sx={{ marginY: 1 }} />
        <Grid item xs={3}>
          <InformationCard
            sx={{ maxWidth: 250 }}
            title={`$ ${numberToAmount(4671.7)}`}
            subtitle={t('orderconsolidations:titles.completed')}
            count="56"
            icon={'ic:baseline-cloud-done'}
            color={green[300]}
          ></InformationCard>
        </Grid>
      </Grid>

      <br></br>
      <h4>ALL VENDORS</h4>
      <Box sx={{ width: '100%' }}>
        <TableCustomized rows={rows} headCells={headCells}></TableCustomized>
      </Box>
    </Page>
  );
}
