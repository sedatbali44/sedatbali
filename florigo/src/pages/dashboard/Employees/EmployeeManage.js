/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import EmployeeService from 'services/employeesService';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import Modal from 'components/Modal';
import Typography from '@mui/material/Typography';
import MyAvatar from 'components/MyAvatar';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton, CustomUpdateButton, CustomDeleteButton } from 'components/CustomButtons';
import { dispatch } from 'redux/store';
import { openSnackbar } from 'redux/slices/generalSlice';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';

import TableCustomized from 'components/TableCustomized';

import StatusBadges from 'components/StatusBadges';

i18n.addResourceBundle('en', 'employees', en);

export default function EmployeeManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const headCells = [
    {
      id: 'details.photoUrl',
      align: 'center',
      disablePadding: true,
      label: t('employees:headCells.image'),
      component: (row, title) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MyAvatar profile={row.details?.photoUrl ? row.details?.photoUrl : ''} name={row.firstname}></MyAvatar>
        </Box>
      ),
    },
    {
      id: 'firstname',
      align: 'left',
      disablePadding: true,
      label: t('employees:headCells.name'),
    },
    {
      id: 'lastname',
      align: 'left',
      disablePadding: false,
      label: t('employees:headCells.lastname'),
    },
    {
      id: 'email',
      align: 'center',
      disablePadding: false,
      label: t('employees:headCells.email'),
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: t('employees:headCells.status'),
      component: (row) => <StatusBadges status={row.status}></StatusBadges>,
    },

    {
      id: 'createdAt',
      align: 'center',
      disablePadding: false,
      label: t('employees:headCells.date'),
      component: (row) => <Typography align="center">{format(new Date(row.createdAt), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('employees:headCells.process'),
      component: (row, title) => (
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
              navigate(PATH_MANAGE.employee_update, { state: { employee: row } });
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

  useEffect(() => {
    let unmounted = false;
    const getEmployees = async () => {
      const { rows } = await EmployeeService.getEmployees();
      if (rows) setRows(rows);
    };

    getEmployees();
    return () => {
      unmounted = true;
    };
  }, []);

  const getRequest = async () => {
    const { rows } = await EmployeeService.getEmployees();
    if (rows) setRows(rows);
  };

  const deleteSelectedRow = async () => {
    await EmployeeService.deleteEmployee(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`employees:buttons.new`)}
            onClick={() => {
              navigate(PATH_MANAGE.employee_create);
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
              dispatch(openSnackbar({ message: 'Employee deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.firstname} ${selectedRow.lastname} selected employee will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
