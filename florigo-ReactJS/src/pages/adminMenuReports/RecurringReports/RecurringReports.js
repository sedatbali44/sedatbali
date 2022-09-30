import Page from 'components/Page';
import {
  Container,
  Grid,
  format,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Iconify,
  Divider,
} from '@components';
import Modal from '@mui/material/Modal';
import { CustomButton } from 'components/CustomButtons';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import RecurringReportService from 'services/recurringReportsService';
import RangeDateInput from 'components/RangeDateInput';
import TableCustomized from 'components/TableCustomized';
import StatusFinder from 'components/StatusFinder';

import OrderPreview from 'components/OrderPreview';

import teamService from 'services/teamsService';
import useWindowDimensions from 'hooks/useWindowDimensions';
import useMarginCalculator from 'hooks/useMarginCalculator';

i18n.addResourceBundle('en', 'recurringreports', en);

const refunded = ['refund', 'rejection', 'non_delivery', 'cancelled', 'chargeback'];

export default function SalesByStates() {
  const marginCalculate = useMarginCalculator();
  const windowDimensions = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const [starttime, setStartTime] = useState(new Date()); // eslint-disable-line
  const [endtime, setEndTime] = useState(new Date()); // eslint-disable-line
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState();
  const [refunds, setRefunds] = useState([]);

  const teamCells = [
    {
      id: 'title',
      align: 'left',
      disablePadding: false,
      label: 'Team',
    },
    {
      id: 'lead',
      align: 'left',
      disablePadding: false,
      label: 'Team Lead',
      component: (row) => (
        <Box>
          {row.options?.teamlead?.firstname} {row.options?.teamlead?.lastname}
        </Box>
      ),
    },
    {
      id: 'count',
      align: 'center',
      disablePadding: false,
      label: 'Members',
      component: (row) => <Box>{row.employees?.length}</Box>,
    },
    {
      id: 'status',
      align: 'left',
      disablePadding: false,
      label: 'Status',
      component: (row) => (
        <Box>
          <span>
            {row.status === 1 ? (
              <span className="badge bg-success text-white ms-1">Active</span>
            ) : (
              <span className="badge bg-danger text-white ms-1">Passive</span>
            )}
          </span>
        </Box>
      ),
    },
    {
      id: 'process',
      align: 'center',
      disablePadding: false,
      label: 'Details',
      component: (row) => (
        <Box>
          <CustomButton
            onClick={() => {
              getTeamMembers(row.id);
              setSelectedTeam(row);
            }}
            icon="ant-design:dot-chart-outlined"
          >
            Team Details
          </CustomButton>
        </Box>
      ),
    },
  ];

  const getTeams = async () => {
    await teamService.getTeams().then((response) => {
      setTeams(response.rows);
    });
  };

  const getTeamMembers = async (id) => {
    await RecurringReportService.getTeamMembers(id, starttime, endtime).then((response) => {
      setRows(response);
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    const getAllTeams = async () => {
      getTeams();
    };
    getAllTeams();

    return () => {
      unmounted = true;
    };
  }, [starttime]);

  const getTotalCompletedPrice = (orders) => {
    const orderList = orders.filter((x) => x.order_tag === 'completed');
    let total = 0;

    const ftdPrice = 0;
    const bloomnetPrice = 0;
    const localPrice = 0;
    let vendorsTotal = 0;

    orderList.map((item) => {
      item.order_details.map((x) => {
        vendorsTotal += Number(x.details.fullfill.totalPrice);
        return x;
      });

      total += Number(item.details.total_price);

      return item;
    });

    let refundedPrice = 0;

    const refundedList = orders.filter((x) => refunded.includes(x.order_tag));

    refundedList.map((item) => {
      refundedPrice += Number(item.details.total_price);
      return item;
    });
    return {
      openOrders: orders.length - (orderList.length + refundedList.length),
      vendorsTotal,
      localPrice,
      ftdPrice,
      bloomnetPrice,
      refundedPrice,
      refundedCount: refundedList.length,
      count: orderList.length,
      price: parseFloat(total).toFixed(2),
    };
  };

  const employeeAnalyz = useMemo(
    () =>
      rows.map((item) => {
        const totalCompletedCount = getTotalCompletedPrice(item.orders);
        item.total_orders = item.orders.length;
        item.total_open_order = totalCompletedCount.openOrders;
        item.total_ftd_price = 0;
        item.total_vendors_price = totalCompletedCount.vendorsTotal;
        item.total_completed_margin = marginCalculate(totalCompletedCount.price, totalCompletedCount.vendorsTotal);
        item.total_completed_price = totalCompletedCount.price;
        item.total_completed_count = totalCompletedCount.count;
        item.total_refunded_count = totalCompletedCount.refundedCount;
        item.total_refunded_price = totalCompletedCount.refundedPrice;
        item.total_count = 0;
        item.total_refund = 0;
        item.total_refund_count = 0;
        return item;
      }),
    [selectedTeam, rows, starttime, endtime]
  );

  const getEmployeeRefundedReports = async (id) => {
    await RecurringReportService.getEmployeeRefundedReports(id, starttime, endtime).then((response) => {
      setRefunds(response);
    });
  };

  const headCells = [
    {
      id: 'firstname',
      align: 'left',
      disablePadding: false,
      label: 'Firstname',
    },
    {
      id: 'lastname',
      align: 'left',
      disablePadding: false,
      label: 'Lastname',
    },
    {
      id: 'total_orders',
      align: 'center',
      disablePadding: false,
      label: 'All Transactions',
      component: (row) => <Box>{row.total_orders}</Box>,
    },
    {
      id: 'total_open_order',
      align: 'center',
      disablePadding: false,
      label: 'Uncompleted',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'orange' }}>
            {row.total_open_order}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_completed_count',
      align: 'center',
      disablePadding: false,
      label: 'Completed',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'green' }}>
            {row.total_completed_count}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_completed_price',
      align: 'center',
      disablePadding: false,
      label: 'Completed Total Price',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'green' }}>
            $ {parseFloat(row.total_completed_price).toFixed(2)}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_vendors_price',
      align: 'center',
      disablePadding: false,
      label: 'Completed Total Vendors',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'green' }}>
            $ {parseFloat(row.total_vendors_price).toFixed(2)}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_completed_margin',
      align: 'center',
      disablePadding: false,
      label: 'Avarage Margin',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'green' }}>
            % {parseFloat(row.total_completed_margin).toFixed(2)}
          </Typography>
        </Box>
      ),
    },

    {
      id: 'total_refunded_count',
      align: 'center',
      disablePadding: false,
      label: 'Refunded',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'red' }}>
            {row.total_refunded_count}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_refunded_rate',
      align: 'center',
      disablePadding: false,
      label: 'Refund Rate',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'red' }}>
            %{' '}
            {row.total_refunded_count
              ? parseFloat((row.total_orders / 100) * row.total_refunded_count * 100).toFixed(2)
              : parseFloat(0).toFixed(2)}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'total_refunded_price',
      align: 'center',
      disablePadding: false,
      label: 'Refunded Total Price',
      component: (row) => (
        <Box>
          <CustomButton
            color="error"
            onClick={() => {
              getEmployeeRefundedReports(row.id);
              setIsOpen(true);
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'red' }}>
              $ {parseFloat(row.total_refunded_price).toFixed(2)}
            </Typography>
          </CustomButton>
        </Box>
      ),
    },
  ];

  const [reportCell] = useState([
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: 'Order Id',
    },
    {
      id: 'firstname',
      align: 'center',
      disablePadding: false,
      label: 'Firstname',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.firstname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'lastname',
      align: 'center',
      disablePadding: false,
      label: 'Lastname',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.lastname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'order_tag',
      align: 'center',
      disablePadding: false,
      label: 'Order Tag',
      component: (row) => <StatusFinder>{row.order_tag}</StatusFinder>,
    },

    {
      id: 'order_date',
      align: 'center',
      disablePadding: false,
      label: 'Order Date',
      component: (row) => <Box> {format(new Date(row.created_at), 'MM-dd-yyyy  HH:mm a')}</Box>,
    },
    {
      id: 'sub_order',
      align: 'center',
      disablePadding: false,
      label: 'Sub Orders',
      component: (row) => <Box>{row.order_details.length}</Box>,
    },
    {
      id: 'delivery_date',
      align: 'center',
      disablePadding: false,
      label: 'Delivery Dates',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <Box key={i}>{format(new Date(item.delivery_date * 1000), 'MM-dd-yyyy')}</Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'timezone',
      align: 'center',
      disablePadding: false,
      label: 'Order Timezone',
      component: (row) => <Box>{row.details?.customerTimezone}</Box>,
    },
    {
      id: 'city',
      align: 'center',
      disablePadding: false,
      label: 'State',
      component: (row) => <Box>{row.details?.stateshort}</Box>,
    },
    {
      id: 'reason',
      align: 'center',
      disablePadding: false,
      label: 'Refund Reason',
      component: (row) => <Box> {row.details?.reason}</Box>,
    },
    {
      id: 'total_price',
      align: 'center',
      disablePadding: false,
      label: 'Refund Price',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'red' }}>
            $ {row.details.total_price}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'show',
      align: 'right',
      disablePadding: false,
      label: t('headCells.preview'),
      component: (row) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedOrder(row);
              setOpen(true);
            }}
          >
            <Iconify icon={'bx:show-alt'}></Iconify>
          </IconButton>
        </Box>
      ),
    },
  ]);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableCustomized rows={teams} headCells={teamCells} header="TEAM LIST">
              <Box sx={{ display: 'flex', flex: 'roll', width: '100%', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}></Box>
                <RangeDateInput
                  hidesearch
                  startdate={starttime}
                  enddate={endtime}
                  setStartDate={setStartTime}
                  setEndDate={setEndTime}
                ></RangeDateInput>
              </Box>
            </TableCustomized>
          </Grid>
        </Grid>
      </Box>
      {selectedTeam && employeeAnalyz.length > 0 ? (
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableCustomized
                rows={employeeAnalyz}
                headCells={headCells}
                header={`${selectedTeam.title} TEAM'S EMPLOYEES`}
              >
                <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                  <Box sx={{ flex: 1 }}></Box>
                </Box>
              </TableCustomized>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Typography variant="h6">No Data Found. Please Select a Team</Typography>
        </Box>
      )}

      <Box>
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Card sx={{ height: windowDimensions.height - 100, overflow: 'auto' }}>
            <CardContent>
              <Typography variant="h6">Employee Refund Orders</Typography>
            </CardContent>
            <Divider></Divider>
            <CardContent>
              <TableCustomized hidesearch rows={refunds} headCells={reportCell}>
                <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                  <Box sx={{ flex: 1 }}></Box>
                </Box>
              </TableCustomized>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <CustomButton
                icon="ant-design:close-circle-outlined"
                color="error"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Close
              </CustomButton>
            </CardActions>
          </Card>
        </Modal>
        <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
      </Box>
    </Page>
  );
}
