import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem } from '@mui/material';
import blue from '@mui/material/colors/blue';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@components';
import SubOrderDetailOnList from './components/SubOrderDetailOnList';

import LoadingOverlay from 'utils/LoadingOverlay';

import Iconify from 'components/Iconify';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { CustomButton } from 'components/CustomButtons';

import TableCustomized from 'components/TableCustomized';

import Page from 'components/Page';

import { format, addHours, startOfDay, endOfDay } from 'date-fns';

// ACTIONS
import OrderStatus from './components/OrderStatus';
import CustomerStatus from './components/CustomerStatus';

import Permissions from 'utils/Permissions';
import ListStatusColored from 'components/ListStatusColored';

import RangeDateInput from 'components/RangeDateInput';
import orderService from 'services/ordersService';
import { setStartTime, setEndTime, setLastOrders } from 'redux/slices/ordersSlice';

import EmployeeSummary from './components/EmployeeSummary';

export default function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [summaryModal, setSummaryModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [claimed, setClaimed] = useState('all');
  const user = useSelector((state) => state.auth.user);
  const { starttime, endtime, tags, orders, occasions, timezones } = useSelector((state) => state.orders);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const returnDateValue = (row) => {
    try {
      return format(new Date(row?.created_at), 'MM-dd-yyyy hh:mm aa');
    } catch (error) {
      return 'Invalid Date';
    }
  };
  const headCells = [
    {
      id: 'id',
      numeric: false,
      align: 'center',
      disablePadding: false,
      label: 'Action & Flags',
      component: (row) => <div> {checkFlags(row)}</div>,
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
          tx={row.payment_logs.filter((x) => x.transaction_id)}
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
  ];

  useEffect(() => {
    if (!expand) {
      setSelectedStatus('');
      setSelectedOccasion('');
      setSelectedTimezone('');
    }
  }, [expand]);

  const updateSocketClean = async (id, orderId) => {
    await orderService.updateSocketClean(id, orderId);
  };

  const checkSameDay = (createdAt) => {
    let sameDay = false;

    if (createdAt.getTime() === startOfDay(new Date()).getTime()) {
      sameDay = true;
    }

    return sameDay;
  };

  const deliveryToday = (row) => {
    let sameDay = false;

    row.delivery_date_arr.map((item) => {
      if (startOfDay(new Date(item * 1000)).getTime() === startOfDay(new Date().getTime()).getTime()) {
        sameDay = true;
      }
      return item;
    });

    return sameDay;
  };

  const checkFlags = (row) => {
    const createdAt = startOfDay(new Date(row.created_at));

    return (
      <Grid container sx={{ width: '1px', minWidth: 180 }}>
        {checkSameDay(createdAt) && (
          <Grid item xs={12} sx={{ marginBottom: 1 }}>
            <Button
              variant="contained"
              color={'error'}
              fullWidth
              startIcon={<Iconify icon="akar-icons:info-fill"></Iconify>}
              endIcon={<Iconify icon="akar-icons:flag"></Iconify>}
              size="medium"
              onClick={() => {
                dispatch(
                  setLastOrders({
                    id: row.id,
                    order_id: row.order_id,
                    customer: `${row.customer.firstname} ${row.customer.lastname}`,
                  })
                );
                navigate(`/main/orders/order/${row.order_id}`);
              }}
            >
              New Order
            </Button>
          </Grid>
        )}
        {deliveryToday(row, createdAt) && (
          <Grid item xs={12} sx={{ marginBottom: 1 }}>
            <Button
              variant="contained"
              color={'info'}
              fullWidth
              startIcon={<Iconify icon="akar-icons:info-fill"></Iconify>}
              endIcon={<Iconify icon="akar-icons:flag"></Iconify>}
              size="medium"
              onClick={() => {
                dispatch(
                  setLastOrders({
                    id: row.id,
                    order_id: row.order_id,
                    customer: `${row.customer.firstname} ${row.customer.lastname}`,
                  })
                );
                navigate(`/main/orders/order/${row.order_id}`);
              }}
            >
              Deliver Today
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Permissions has="ORDER_UPDATE">
            <Button
              fullWidth
              variant={'contained'}
              color={'warning'}
              size="medium"
              onClick={() => {
                dispatch(
                  setLastOrders({
                    id: row.id,
                    order_id: row.order_id,
                    customer: `${row.customer.firstname} ${row.customer.lastname}`,
                  })
                );
                navigate(`/main/orders/order/${row.order_id}`);
              }}
              startIcon={<Iconify icon="ic:outline-pending-actions"></Iconify>}
            >
              TAKE ACTION
            </Button>
          </Permissions>
        </Grid>
      </Grid>
    );
  };

  const checkClaimed = (item) => {
    // eslint-disable-next-line

    if (claimed === 'all') return true;

    if (claimed === 'notall' && Number(item?.details?.claimedBy?.employeeId) === user?.id) return true;

    return false;
  };

  const LocalFilter = useMemo(() => {
    setIsLoading(false);
    const localOrder = [...orders];
    localOrder.reverse();

    if (searchText) {
      return localOrder;
    }

    // eslint-disable-next-line
    return localOrder.filter((item) => {
      const count = item.delivery_date_arr.filter(
        (time) => time >= Math.floor(starttime / 1000) && time <= Math.ceil(endtime / 1000)
      );

      if (selectedStatus || selectedOccasion || selectedTimezone) {
        if (selectedStatus) {
          if (item.order_tag !== selectedStatus) return;
        }

        if (selectedOccasion) {
          if (!item.order_details.some((item) => item.delivery.occasion.title === selectedOccasion)) return;
        }

        if (selectedTimezone) {
          if (item.details.customerTimezone !== selectedTimezone) return;
        }
      }

      if (count.length > 0 && checkClaimed(item)) {
        // eslint-disable-next-line consistent-return
        return item;
      }
    });
  }, [orders, starttime, endtime, selectedStatus, claimed, searchText, selectedOccasion, selectedTimezone]);

  useEffect(() => {
    if (orders.length > 0) {
      setIsLoading(false);
    }
  }, [LocalFilter]);

  return (
    <Page>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Grid item sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Accordion
              sx={{ backgroundColor: '#181818112', padding: 1 }}
              onChange={() => {
                setExpand(!expand);
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h6" color={blue[500]}>
                  <Iconify icon="clarity:hashtag-solid"></Iconify> Tags - Occasions - Timezones
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <AccordionDetails>
                <ListStatusColored
                  timezones={timezones}
                  selectedTimezone={selectedTimezone}
                  setSelectedTimezone={setSelectedTimezone}
                  occasions={occasions}
                  orders={LocalFilter || []}
                  tags={tags}
                  selectedStatus={selectedStatus}
                  selectedOccasion={selectedOccasion}
                  setSelectedOccasion={setSelectedOccasion}
                  setSelectedStatus={(e) => {
                    setSelectedStatus(e);
                  }}
                ></ListStatusColored>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {(orders.length === 0 || isLoading) && <LoadingOverlay isLoading></LoadingOverlay>}
          {orders && (
            <TableCustomized
              clear={selectedStatus}
              rows={LocalFilter}
              headCells={headCells}
              setSearchText={(e) => {
                setSearchText(e);
              }}
            >
              <Box sx={{ display: 'flex', flex: 'column', width: '100%', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}></Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="nowrap"
                  sx={{ height: 44, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <CustomButton
                    color="primary"
                    variant={'contained'}
                    onClick={() => {
                      setSummaryModal(true);
                    }}
                  >
                    <Iconify icon="fa6-solid:users-gear" sx={{ fontSize: 18, marginRight: 1 }}></Iconify> Active Users
                  </CustomButton>
                  <IconButton
                    onClick={() => {
                      const ns = startOfDay(addHours(new Date(starttime), -24)).getTime();
                      const ne = endOfDay(addHours(new Date(endtime), -24)).getTime();
                      dispatch(setStartTime(ns));
                      dispatch(setEndTime(ne));
                    }}
                  >
                    <Iconify icon="bi:arrow-left-square"></Iconify>
                  </IconButton>
                  <RangeDateInput
                    range={8}
                    hidesearch
                    startdate={starttime}
                    enddate={endtime}
                    setStartDate={(e) => {
                      dispatch(setStartTime(e));
                    }}
                    setEndDate={(e) => {
                      dispatch(setEndTime(e));
                    }}
                  ></RangeDateInput>
                  <IconButton
                    onClick={() => {
                      const ns = startOfDay(addHours(new Date(starttime), 24)).getTime();
                      const ne = endOfDay(addHours(new Date(endtime), 24)).getTime();
                      dispatch(setStartTime(ns));
                      dispatch(setEndTime(ne));
                    }}
                  >
                    <Iconify icon="bi:arrow-right-square"></Iconify>
                  </IconButton>
                  <TextField
                    label="Assigned Orders"
                    select
                    value={claimed}
                    sx={{ m: 1, width: 163 }}
                    variant="outlined"
                    size="small"
                    onChange={(item) => {
                      setClaimed(item.target.value);
                    }}
                  >
                    <MenuItem value={'all'}>All Orders</MenuItem>
                    <MenuItem value={'notall'}>Only Assigned</MenuItem>
                  </TextField>

                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </Box>
              </Box>
            </TableCustomized>
          )}
        </Paper>
      </Box>
      <Box>
        {summaryModal && (
          <EmployeeSummary open={summaryModal} onClose={setSummaryModal} orders={orders}></EmployeeSummary>
        )}
      </Box>
    </Page>
  );
}
