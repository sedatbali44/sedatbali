import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from 'components/InformationCard';
import i18n, { t } from 'i18next';
import { Grid, Button, Typography, Box, Divider } from '@mui/material';
import TableCustomized from 'components/TableCustomized';
import OrderAuditsService from 'services/orderAuditsService';
import SummaryTable from './SummaryTable';
import LocalOrders from './LocalOrders';
import Iconify from 'components/Iconify';
import { Toolbar, RangeDateInput } from '@components';
import { setStartTime, setEndTime } from 'redux/slices/ordersSlice';
import { Icon } from '@iconify/react';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'orderAudits', en);

const EmployeeList = () => {
  const { starttime, endtime } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [rows, setRows] = useState([]);
  const [datatable, setDataTable] = useState([
    {
      title: 143,
      subtitle: 'Total Completed',
      color: colors[0],
      icon: 'ant-design:file-done-outlined',
    },
    {
      title: (
        <span>
          <Iconify icon="mdi:percent-circle-outline"></Iconify> 574.14
        </span>
      ),
      subtitle: 'Total Sale',
      color: colors[1],
      icon: 'mdi:point-of-sale',
    },
    {
      title: <span>2 / $ 1074.13</span>,
      subtitle: 'Total Wire Margin',
      color: colors[2],
      icon: 'cib:wire',
    },
  ]);
  const [headCells] = useState([
    {
      id: 'firstname', // sort edilecek satı
      align: 'left', // header ve rows için hizalama
      label: t('orderAudits:headCells.firstname'),
    },
    {
      id: 'lastname', // sort edilecek satır
      align: 'center', // header ve rows için hizalama
      label: t('orderAudits:headCells.lastname'),
    },
    {
      id: 'completedOrderCount', // sort edilecek satır
      align: 'center', // header ve rows için hizalama
      label: t('orderAudits:headCells.completedOrderCount'),
      component: (row) => <div>{row.completedOrderCount}</div>,
    },
    {
      id: 'process', // sort edilecek satır
      align: 'center', // header ve rows için hizalama
      label: t('orderAudits:headCells.process'),
      component: (row) => (
        <div>
          {row.completedOrderCount > 0 && (
            <Button
              variant={'contained'}
              onClick={() => {
                setEmployee(row);
                getEmployeeCompletedOrdersAudit(row);
              }}
            >
              <Icon icon="iconoir:open-select-hand-gesture"></Icon>
            </Button>
          )}
        </div>
      ),
    },
  ]);

  const getTodayEmployeeCompletedReport = async () => {
    const { employees, totals } = await OrderAuditsService.getTodayEmployeeCompletedReport(starttime, endtime);
    setRows(employees);
    const datatableNew = [...datatable];
    datatableNew[0].title = totals[0].totalCompleted || 0;
    datatableNew[1].title = totals[0].totalSale ? `${parseFloat(totals[0].totalSale).toFixed(2)} $` : '0.00 $';
    datatableNew[2].title = totals[0].totalOrderDetailsFulfill || 0;

    setDataTable(datatableNew);
  };

  useEffect(() => {
    getTodayEmployeeCompletedReport();
  }, [starttime, endtime]);

  const getEmployeeCompletedOrdersAudit = async (row) => {
    const data = await OrderAuditsService.getEmployeeCompletedOrdersAudit(starttime, endtime, row.employeeId);
    setOrders(data || []);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SummaryTable datatable={datatable}></SummaryTable>
        <Divider sx={{ marginY: 3 }}></Divider>
      </Grid>
      <Grid item xs={12} id="order-list">
        {employee && orders.length > 0 && <LocalOrders orders={orders}></LocalOrders>}
      </Grid>
      <Grid item xs={12}>
        <TableCustomized align="left" rows={rows} headCells={headCells} perpage={10} rowsperpage={[10, 25, 50]}>
          <Toolbar>
            <Box sx={{ align: 'center', display: 'flex', justifyContent: 'end', width: '100%', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ marginRight: 3 }}>
                EMPLOYEE LIST
              </Typography>
              <RangeDateInput
                startdate={starttime}
                enddate={endtime}
                setStartDate={(e) => {
                  dispatch(setStartTime(e));
                }}
                setEndDate={(e) => {
                  dispatch(setEndTime(e));
                }}
                hidesearch
                hidetoday
              ></RangeDateInput>
            </Box>
          </Toolbar>
        </TableCustomized>
      </Grid>
    </Grid>
  );
};

export default EmployeeList;
