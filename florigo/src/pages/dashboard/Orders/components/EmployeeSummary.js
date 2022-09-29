import { useState, useEffect, useMemo } from 'react';

import {
  Box,
  TableCustomized,
  Card,
  CardContent,
  CardActions,
  format,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@components';

import SubOrderDetailOnList from './SubOrderDetailOnList';

import Modal from '@mui/material/Modal';

import OrderStatus from './OrderStatus';
import CustomerStatus from './CustomerStatus';

import { CustomButton } from 'components/CustomButtons';
import useWindowDimensions from 'hooks/useWindowDimensions';
import orderService from 'services/ordersService';
import teamService from 'services/teamsService';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

const returnDateValue = (row) => {
  try {
    return format(new Date(row?.created_at), 'MM-dd-yyyy hh:mm aa');
  } catch (error) {
    return 'Invalid Date';
  }
};

const EmployeeSummary = ({ open, onClose, orders = [] }) => {
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState('');
  const [teams, setTeams] = useState([]);
  const dimension = useWindowDimensions();
  const { t } = useTranslation();

  const [headCells] = useState([
    {
      id: 'active_user',
      numeric: false,
      align: 'left',
      disablePadding: false,
      label: 'Employee',
      component: (row) => (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant={'caption'} sx={{ fontWeight: 'bold', fontSize: 16 }}>
              {row.active_user?.firstname} {row.active_user?.lastname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant={'caption'} sx={{ fontSize: 14 }}>
              {row.active_user?.role_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant={'caption'} sx={{ fontSize: 14 }}>
              {row.active_user?.team_name}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'order_id',
      numeric: false,
      align: 'center',
      disablePadding: false,
      label: 'Status',
      component: (row) => (
        <OrderStatus
          t={t}
          activeUser={row.active_user}
          lockSocketId={row.lock_socket_id}
          status={row.order_tag}
          tx={''}
          id={row.id}
          orderId={row.order_id}
          orderSocket={row.socket_id}
          claimedBy={row.details?.claimedBy}
          cleanSocket={updateSocketClean}
        ></OrderStatus>
      ),
    },
    {
      id: 'customer',
      numeric: false,
      align: 'left',
      disablePadding: false,
      label: 'Customer Info',
      component: (row) => (
        <CustomerStatus
          name={`${row.customer.firstname} ${row.customer.lastname}`}
          phone={row.customer.phone}
          email={row.customer.email}
        ></CustomerStatus>
      ),
    },
    {
      id: 'occasion',
      numeric: true,
      align: 'left',
      label: 'Occasion',
      component: (row) => (
        <Box>
          {row.order_details.map((item, index) => (
            <h2 key={index} className="badge bg-danger text-white" style={{ minWidth: 90, fontSize: 15 }}>
              {item.delivery?.occasion?.title}
            </h2>
          ))}
        </Box>
      ),
    },
    {
      id: 'price',
      numeric: true,
      align: 'center',
      disablePadding: false,
      label: 'Order Price',
      component: (row) => (
        <h2 className="badge bg-success" style={{ minWidth: 80, fontSize: 15 }}>
          ${row.details?.total_price}
        </h2>
      ),
    },
    {
      id: 'order_date',
      numeric: false,
      align: 'center',
      disablePadding: false,
      label: 'Order Date',
      component: (row) => (
        <Box>
          <div>
            <span className="badge bg-info text-dark btn">
              {returnDateValue(row)}
              <br></br>
              {row.details?.stateshort} - {row.details?.customerTimezone} {row.details?.shortname}
            </span>
          </div>
          <div></div>
        </Box>
      ),
    },
    {
      id: 'delivery_date',
      numeric: false,
      align: 'center',
      disablePadding: false,
      label: 'Delivery Date',
      component: (row) => (
        <div>
          {row.order_details.map((item) => (
            <SubOrderDetailOnList order={item} key={item.id} />
          ))}
        </div>
      ),
    },
  ]);
  const getTeams = async () => {
    const { rows } = await teamService.getTeams();

    setTeams(rows);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const newList = useMemo(
    () =>
      // eslint-disable-next-line
      orders.filter((item) => {
        if (item.active_user?.id) {
          if (selected) {
            return item.active_user.team_id === selected;
          }
          return item;
        }
      }),
    [orders, selected]
  );

  const updateSocketClean = async (id, orderId) => {
    await orderService.updateSocketClean(id, orderId);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose(false);
      }}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card sx={{ width: dimension.width - 100, height: dimension.height - 100, overflow: 'auto', paddingX: 4 }}>
        <CardContent>
          <Typography variant="h6">#{newList.length || 0} Active User(s) in Orders </Typography>
          <Divider></Divider>
          <TableCustomized align={'right'} rows={newList} headCells={headCells}>
            <TextField
              value={selected}
              sx={{ width: 200 }}
              size="small"
              label="Team List"
              select
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {teams.map(
                (item) =>
                  user.teamlead.includes(item.id) && (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  )
              )}
            </TextField>
          </TableCustomized>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <CustomButton
            color="error"
            onClick={() => {
              onClose(false);
            }}
          >
            Close
          </CustomButton>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default EmployeeSummary;
