/* eslint-disable no-unused-vars */
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CustomCreateButton, CustomDeleteButton, CustomUpdateButton } from 'components/CustomButtons';
import Modal from 'components/Modal';
import StatusBadges from 'components/StatusBadges';
import TableCustomized from 'components/TableCustomized';
import i18n, { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'redux/slices/generalSlice';
import { dispatch } from 'redux/store';
import { PATH_MANAGE } from 'routes/paths';
import ProductsService from 'services/productsService';
import { format } from 'date-fns';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'products', en);

export default function ProductsManage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const headCells = [
    {
      id: 'url',
      align: 'center',
      disablePadding: true,
      label: 'Image',
      component: (row, title) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar alt={row.name} src={row.url} />
        </Box>
      ),
    },
    {
      id: 'name',
      align: 'left',
      disablePadding: true,
      label: t('products:headCells.name'),
      component: (row, title) => <Box sx={{ display: 'flex' }}>{row.name}</Box>,
    },
    {
      id: 'price',
      align: 'left',
      disablePadding: false,
      label: t('products:headCells.price'),
      component: (row) => <div>$ {row.price} </div>,
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: t('products:headCells.status'),
      component: (row) => <StatusBadges status={row.status}></StatusBadges>,
    },

    {
      id: 'createdAt',
      align: 'center',
      disablePadding: false,
      label: t('products:headCells.createdAt'),
      component: (row) => <Typography align="center">{format(new Date(row.createdAt), 'MM/dd/yyyy')}</Typography>,
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: t('products:headCells.process'),
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
              navigate(PATH_MANAGE.products_update, { state: { product: row } });
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
    const getProducts = async () => {
      const data = await ProductsService.getProducts();
      if (data) setRows(data.rows);
    };

    getProducts();
    return () => {
      unmounted = true;
    };
  }, []);

  const getRequest = async () => {
    const { rows } = await ProductsService.getProducts();
    if (rows) setRows(rows);
  };

  const deleteSelectedRow = async () => {
    await ProductsService.deleteProduct(selectedRow.id);
    getRequest();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableCustomized rows={rows} headCells={headCells}></TableCustomized>

        {selectedRow && (
          <Modal
            isOpenModal={openDeleteModal}
            onCancel={() => {
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            onEvent={() => {
              dispatch(openSnackbar({ message: 'Product deleted', severity: 'success' }));
              deleteSelectedRow(selectedRow);
              setOpenDeleteModal(false);
              setSelectedRow(null);
            }}
            obj={{
              description: `${selectedRow.name} , Selected product will be deleted. Are you sure?`,
              status: 'danger',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
