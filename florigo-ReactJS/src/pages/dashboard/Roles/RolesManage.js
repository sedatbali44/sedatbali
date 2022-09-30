import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from 'components/Modal';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton, CustomUpdateButton, CustomDeleteButton } from 'components/CustomButtons';
import { dispatch } from 'redux/store';
import { openSnackbar } from 'redux/slices/generalSlice';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import RoleService from 'services/roleService';
import { format } from 'date-fns';

import TableCustomized from 'components/TableCustomized';

i18n.addResourceBundle('en', 'teams', en);

export default function TeamsManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const headCells = [
    {
      id: 'title',
      align: 'center',
      disablePadding: true,
      label: t('roles:headCells.title'),
    },

    {
      id: 'status',
      align: 'center',
      disablePadding: false,
      label: t('roles:headCells.status'),
    },

    {
      id: 'createdAt',
      align: 'center',
      disablePadding: false,
      label: t('roles:headCells.date'),
      component: (row) => <Typography align="center">{format(new Date(row.createdAt), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('roles:headCells.process'),
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
              navigate(PATH_MANAGE.roles_update, { state: { team: row } });
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
    const { rows } = await RoleService.getRoles();
    if (rows) setRows(rows);
  };

  useEffect(() => {
    getRequest();
  }, []); // eslint-disable-line

  const deleteSelectedRow = async () => {
    await RoleService.deleteRole(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`roles:buttons.new`)}
            onClick={() => {
              navigate(PATH_MANAGE.roles_create);
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
              dispatch(openSnackbar({ message: 'Role deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.title} Selected Role will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
