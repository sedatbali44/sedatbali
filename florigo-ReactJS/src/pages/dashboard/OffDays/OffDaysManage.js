import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import StatusBadges from 'components/StatusBadges';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from 'components/Modal';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton, CustomDeleteButton } from 'components/CustomButtons';
import { dispatch } from 'redux/store';
import { openSnackbar } from 'redux/slices/generalSlice';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import OffDaysService from 'services/offDaysService';
import { format } from 'date-fns';

import { TableCustomized, FormControlLabel, Switch } from '@components';

i18n.addResourceBundle('en', 'offdays', en);

export default function OffDaysManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const updateOffDayStatus = async (row, e) => {
    row.status = e ? 1 : 0;
    await OffDaysService.updateOffDayStatus(row);
  };

  const headCells = [
    {
      id: 'description',
      align: 'left',
      disablePadding: true,
      label: t('offdays:headCells.description'),
    },
    {
      id: 'name',
      align: 'left',
      disablePadding: true,
      label: t('offdays:headCells.name'),
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: true,
      label: t('offdays:headCells.status'),
      component: (row) => <StatusBadges align="center" status={row.status}></StatusBadges>,
    },
    {
      id: 'start_date',
      align: 'center',
      disablePadding: false,
      label: t('offdays:headCells.start_date'),
      component: (row) => <Typography align="center">{format(new Date(row.start_date), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'end_date',
      align: 'center',
      disablePadding: false,
      label: t('offdays:headCells.end_date'),
      component: (row) => <Typography align="center">{format(new Date(row.end_date), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('offdays:headCells.process'),
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
                  updateOffDayStatus(row, e.target.checked);
                }}
              />
            }
          />
          |
          <CustomDeleteButton
            onClick={() => {
              setSelectedRow(row);
              setOpenDeleteModal(true);
            }}
          />
        </Box>
      ),
    },
  ];

  const getRequest = async () => {
    const { rows } = await OffDaysService.getOffDays();
    if (rows) setRows(rows);
  };

  useEffect(() => {
    getRequest();
  }, []); // eslint-disable-line

  const deleteSelectedRow = async () => {
    await OffDaysService.deleteOffDay(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`offdays:buttons.new`)}
            onClick={() => {
              navigate(PATH_MANAGE.offday_create);
            }}
          />
        </TableCustomized>

        {selectedRow && (
          <Modal
            isOpenModal={openDeleteModal}
            onCancel={() => {
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            onEvent={() => {
              dispatch(openSnackbar({ message: 'Offday deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.description} Selected OffDay will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
