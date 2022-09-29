import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import StatusBadges from 'components/StatusBadges';
import Paper from '@mui/material/Paper';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton } from 'components/CustomButtons';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import OccasionsService from 'services/OccasionsService';

import { TableCustomized, FormControlLabel, Switch } from '@components';

i18n.addResourceBundle('en', 'occasions', en);

export default function OccasionManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const updateOccasionStatus = async (row, e) => {
    row.status = e ? 1 : 0;
    await OccasionsService.updateOccasionStatus(row);
  };

  const headCells = [
    {
      id: 'title',
      align: 'left',
      disablePadding: true,
      label: t('occasions:headCells.title'),
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: true,
      label: t('occasions:headCells.status'),
      component: (row) => <StatusBadges align="center" status={row.status}></StatusBadges>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('occasions:headCells.process'),
      component: (row) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormControlLabel
            label="Active"
            control={
              <Switch
                checked={row.status === 1}
                onChange={(e) => {
                  updateOccasionStatus(row, e.target.checked);
                }}
              />
            }
          />
        </Box>
      ),
    },
  ];

  const getRequest = async () => {
    const data = await OccasionsService.getOccasions();

    if (rows) setRows(data);
  };

  useEffect(() => {
    getRequest();
  }, []); // eslint-disable-line

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`occasions:buttons.new_occasion`)}
            onClick={() => {
              navigate(PATH_MANAGE.occasion_create);
            }}
          />
        </TableCustomized>
      </Paper>
    </Box>
  );
}
