import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import StatusBadges from 'components/StatusBadges';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from 'components/Modal';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton, CustomUpdateButton, CustomDeleteButton } from 'components/CustomButtons';
import { dispatch } from 'redux/store';
import { openSnackbar } from 'redux/slices/generalSlice';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import DiscountsService from 'services/discountsService';
import { format } from 'date-fns';

import { TableCustomized } from '@components';

i18n.addResourceBundle('en', 'discounts', en);

export default function DiscountsManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const headCells = [
    {
      id: 'discount_code',
      align: 'center',
      disablePadding: true,
      label: t('discounts:headCells.discount_code'),
    },
    {
      id: 'status',
      align: 'right',
      disablePadding: true,
      label: t('discounts:headCells.status'),
      component: (row) => <StatusBadges align="center" status={row.status}></StatusBadges>,
    },
    {
      id: 'start_date',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.start_date'),
      component: (row) => <Typography align="center">{format(new Date(row.start_date), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'end_date',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.end_date'),
      component: (row) => <Typography align="center">{format(new Date(row.end_date), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'use_limit',
      align: 'left',
      disablePadding: false,
      label: t('discounts:headCells.use_limit'),
    },
    {
      id: 'type',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.type'),
    },
    {
      id: 'used_count',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.used_count'),
    },
    {
      id: 'description',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.description'),
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('discounts:headCells.process'),
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
          <CustomUpdateButton
            onClick={() => {
              navigate(PATH_MANAGE.discount_update, { state: { discount: row } });
            }}
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
    const { rows } = await DiscountsService.getDiscounts();
    if (rows) setRows(rows);
  };

  useEffect(() => {
    getRequest();
  }, []); // eslint-disable-line

  const deleteSelectedRow = async () => {
    await DiscountsService.deleteDiscount(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`discounts:buttons.new`)}
            onClick={() => {
              navigate(PATH_MANAGE.discount_create);
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
              dispatch(openSnackbar({ message: 'Discount deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.discount_code} Selected Discount will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
