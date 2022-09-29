import Page from 'components/Page';
import { Container, Grid, IconButton, Iconify } from '@components';
import { CustomCreateButton } from 'components/CustomButtons';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FloristsService from 'services/floristsService';
import TableCustomized from 'components/TableCustomized';
import { useNavigate } from 'react-router-dom';

i18n.addResourceBundle('en', 'florists', en);

export default function FloristsManage() {
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const headCells = [
    {
      id: 'florist_name',
      align: 'left',
      disablePadding: true,
      label: 'Florist Name',
    },

    {
      id: 'email',
      align: 'center',
      disablePadding: false,
      label: t('florists:headCells.email'),
    },
    {
      id: 'florist_phone',
      align: 'center',
      disablePadding: false,
      label: t('florists:headCells.phone'),
    },
    {
      id: 'zipcode',
      align: 'center',
      disablePadding: false,
      label: 'Zipcode',
    },
    {
      id: 'address',
      align: 'center',
      disablePadding: false,
      label: 'Address',
    },
    {
      id: 'note',
      align: 'center',
      disablePadding: false,
      label: 'Note',
    },
    {
      id: 'type',
      align: 'center',
      disablePadding: false,
      label: 'Florist TYPE',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
      component: (row) => (
        <Grid>
          <IconButton
            onClick={() => {
              navigate('/florists/florists/florists_update', { state: { florist: row } });
            }}
          >
            <Iconify icon="bx:message-square-edit" color="red"></Iconify>
          </IconButton>
        </Grid>
      ),
    },
  ];
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    const getDepartments = async () => {
      const { rows } = await FloristsService.getFlorists();
      if (rows) setRows(rows);
    };

    getDepartments();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} xl={12} lg={12}>
            <TableCustomized rows={rows} headCells={headCells}>
              <CustomCreateButton
                title={'Create Florist'}
                onClick={() => {
                  navigate('/florists/florists/florists_create');
                }}
              />
            </TableCustomized>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
