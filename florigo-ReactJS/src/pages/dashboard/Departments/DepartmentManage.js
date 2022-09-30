import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from 'components/Modal';
import { PATH_MANAGE } from 'routes/paths';
import { CustomCreateButton, CustomUpdateButton, CustomDeleteButton } from 'components/CustomButtons';
import { dispatch } from 'redux/store';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import DepartmentService from 'services/departmentsService';
import { openSnackbar } from 'redux/slices/generalSlice';
import { format } from 'date-fns';

import StatusBadges from 'components/StatusBadges';

import TableCustomized from 'components/TableCustomized';

import './index.css';

i18n.addResourceBundle('en', 'departments', en);

export default function DepartmentManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const headCells = [
    {
      id: 'title',
      align: 'left',
      disablePadding: true,
      label: t('departments:headCells.title'),
    },

    {
      id: 'status',
      align: 'center',
      disablePadding: false,
      label: t('departments:headCells.status'),
      component: (row) => <StatusBadges status={row.status}></StatusBadges>,
    },

    {
      id: 'createdAt',
      align: 'center',
      disablePadding: false,
      label: t('departments:headCells.date'),
      component: (row) => <Typography align="center">{format(new Date(row.createdAt), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('departments:headCells.process'),
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
              navigate(PATH_MANAGE.department_update, { state: { department: row } });
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
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    const getDepartments = async () => {
      const { rows } = await DepartmentService.getDepartments();
      if (rows) setRows(rows);
    };

    getDepartments();

    return () => {
      unmounted = true;
    };
  }, []);

  const getRequest = async () => {
    const { rows } = await DepartmentService.getDepartments();
    if (rows) setRows(rows);
  };

  const deleteSelectedRow = async () => {
    await DepartmentService.deleteDepartment(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}>
          <CustomCreateButton
            title={t(`departments:buttons.new`)}
            onClick={() => {
              navigate(PATH_MANAGE.department_create);
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
              dispatch(openSnackbar({ message: 'Department deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.title} Selected Department will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
