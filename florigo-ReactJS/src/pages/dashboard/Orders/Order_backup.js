import { useState, useEffect } from 'react';
import { Card, Grid, Typography, CardContent, Divider } from '@mui/material';

import { useNavigate, useParams } from 'react-router';

// Assets

import Actions from './components/Actions';
import CustomerInfo from './components/CustomerInfo';
import FullFillOrder from './components/FullFillOrder';
import RecipientInfo from './components/RecipientInfo';
import PurchaseInfo from './components/PurchaseInfo';
import MessageSection from './components/MessageSection';
import OrderTabs from './components/OrderTabs';

import LoadingOverlay from 'utils/LoadingOverlay';

import orderService from 'services/ordersService';

const Order = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    let unmounted = false; // eslint-disable-line
    orderService
      .getOrderById(params.id)
      .then((response) => {
        setOrder(response);
        setOrderDetails(response.order_details);
        setMessages([...response.order_messages]);
        setCustomer(response.customer);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      orderService.leaveInOrder(params.id).then(() => {});
      unmounted = true;
    };
  }, []);

  const save = () => {};

  return (
    <LoadingOverlay isLoading={isLoading}>
      {!isLoading && (
        <Grid container spacing={1} sx={{ zoom: '100%' }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            display={'flex'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Card sx={{ flex: 1, width: '100%', paddingY: 0 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 1 }}>
                <Typography variant={'h6'}>OPEN ORDER DETAIL ID :</Typography>
              </CardContent>
              <Divider></Divider>
              <CardContent sx={{ padding: 1, paddingY: 0.25, height: '100%' }}>
                <Grid container spacing={0.25} sx={{ diplay: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Grid item xs={5} sx={{ minWidth: '350px !important', width: '100%' }}>
                    <Grid container spacing={0.5}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Actions orderId={order.id} service={orderService} currentStatus={order.order_tag}></Actions>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <CustomerInfo customer={customer}></CustomerInfo>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MessageSection
                          orderId={order.id}
                          messages={messages}
                          setMessages={setMessages}
                        ></MessageSection>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={7} sx={{ minWidth: '350px !important', width: '100%' }}>
                    <Grid container spacing={0.5}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <OrderTabs
                          orderLength={orderDetails.length}
                          selectedOrder={selectedOrder}
                          setSelectedOrder={(e) => {
                            setSelectedOrder(e);
                          }}
                        ></OrderTabs>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <PurchaseInfo
                          orderDetail={orderDetails[selectedOrder]}
                          key={`details_${selectedOrder}`}
                        ></PurchaseInfo>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <RecipientInfo
                          delivery={orderDetails[selectedOrder].delivery}
                          key={`delivery_${selectedOrder}`}
                        ></RecipientInfo>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FullFillOrder navigate={navigate} save={save}></FullFillOrder>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </LoadingOverlay>
  );
};
export default Order;
