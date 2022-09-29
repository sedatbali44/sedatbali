import { useState, useEffect, useContext, useRef, Grid } from '@components';

// myb components
import ActionHeader from './components/myb/ActionHeader';
import OrderInformation from './components/myb/OrderInformation';
import CustomerInformation from './components/myb/CustomerInformation';
import CustomOrderLog from './components/myb/CustomOrderLog';
import SuborderSelectbox from './components/myb/SuborderSelectbox';
import RecipientInformation from './components/myb/RecipientInformation';
import PurchaseInformation from './components/myb/PurchaseInformation';
import FullfillOrder from './components/myb/FullfillOrder';

import { CustomButton } from 'components/CustomButtons';

import { useNavigate, useParams } from 'react-router';
import orderService from 'services/ordersService';

import LoadingOverlay from 'utils/LoadingOverlay';
import { SocketContext } from 'contexts/SocketContext';

import { openSnackbar } from 'redux/slices/generalSlice';

import { useSelector, useDispatch } from 'react-redux';

import { Card, Modal, CardContent, Divider, CardActions, Typography } from '@mui/material';

const Order = ({ preview = null, onClose }) => {
  const dispatch = useDispatch();

  const [updateKey, setUpdateKey] = useState(new Date().getTime().toString());

  const user = useSelector((state) => state.auth.user);

  const { socketId } = useContext(SocketContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [messages, setMessages] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [order, setOrder] = useState(null);
  const lockId = useRef(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customer, setCustomer] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [locked, setLocked] = useState(!!preview);

  const unmountFunction = async () => {
    if (lockId.current === socketId)
      await orderService.leaveInOrder(params.id || preview.order_id).then(() => {
        console.log('Order Socket Cleared!');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let unmounted = false; // eslint-disable-line
    if (order === null) {
      setIsLoading(true);
      orderService
        .getOrderById(params.id || preview.order_id)
        .then(async (response) => {
          setOrder(response);
          if (!response.details.claimedBy || !response.details.claimedBy.employeeId) {
            setIsLoading(true);
            await orderService
              .setOrderClaimed(response.order_id, user.id)
              .then((res) => {
                const details = { ...response.details };
                details.claimedBy = res;
                setOrder({ ...response, details });
              })
              .finally(() => {
                setIsLoading(false);
                setOrderDetails(response.order_details);
                setMessages([...response.order_messages]);
                setCustomer(response.customer);
                setSelectedOrder(0);
              });
          }

          setOrderDetails(response.order_details);
          setMessages([...response.order_messages]);
          setCustomer(response.customer);
          setSelectedOrder(0);

          lockId.current = response.lock_socket_id;
          if (socketId !== response.lock_socket_id) {
            setLocked(true);
          }

          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return async () => {
      await unmountFunction();
      unmounted = true;
    };
  }, []);

  const updateDelivery = () => {
    setTimeout(() => {
      orderService
        .getOrderById(params.id || preview.order_id)
        .then((order) => {
          setOrder(order);
          setOrderDetails(order.order_details);
          setMessages([...order.order_messages]);
          setCustomer(order.customer);
          setIsLoading(false);
          lockId.current = order.lock_socket_id;
          if (socketId !== order.lock_socket_id) {
            setLocked(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 150);
  };

  const complateOrder = () => {
    order.order_details[selectedOrder].details.fullfill = {
      ...order.order_details[selectedOrder].details.fullfill,
      updated: true,
    };
    setUpdateKey(new Date().getTime().toString());
    window.scrollTo(0, 0);
  };

  const onChange = async () => {
    setIsLoading(true);
    await orderService.setOrderTag(order.order_id, 'completed').then(() => {
      dispatch(openSnackbar({ message: 'Order Complated!', severity: 'success' }));
      setIsLoading(false);
      setOpenModal(true);
    });
  };

  const save = () => {};

  return (
    <LoadingOverlay isLoading={isLoading} key={order?.id}>
      {!isLoading && (
        <>
          {order && (
            <ActionHeader
              key={updateKey}
              preview={preview}
              locked={locked}
              currentStatus={order.order_tag}
              orderId={order.order_id}
              service={orderService}
              orderExId={order?.order_id}
              suborders={order.order_details.every((x) => x.details?.fullfill?.updated === true)}
            />
          )}
          <Grid container spacing={4} sx={{ py: 4 }}>
            <Grid item md={4}>
              <Grid container direction="column" spacing="32px">
                <Grid item>
                  {order && orderDetails && (
                    <OrderInformation
                      orderDate={order.order_details[0].order_date}
                      setLocked={(e) => {
                        setLocked(e);
                      }}
                      order_date
                      id={order.id}
                      status={order.order_tag}
                      teamlead={user?.teamlead}
                      orderId={order.order_id}
                      zipcode={orderDetails[selectedOrder]?.delivery?.zipcode}
                      claimed={order.details?.claimedBy}
                      paymentLog={order?.payment_logs}
                    />
                  )}
                </Grid>
                <Grid item>{customer && <CustomerInformation customer={customer} />}</Grid>

                <Grid item>
                  <CustomOrderLog
                    locked={locked}
                    messages={messages}
                    setMessages={(e) => {
                      setMessages(e);
                    }}
                    orderId={order?.id}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={8}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <SuborderSelectbox
                    setSelectedOrder={(e) => {
                      setSelectedOrder(e);
                    }}
                    selectedOrder={selectedOrder}
                    orderLength={orderDetails?.length}
                  />
                </Grid>
                <Grid item>
                  {orderDetails && (
                    <RecipientInformation
                      key={selectedOrder}
                      locked={locked}
                      deliveryDate={orderDetails[selectedOrder]}
                      delivery={orderDetails[selectedOrder].delivery}
                      updateDelivery={(e) => {
                        updateDelivery(e);
                      }}
                    />
                  )}
                </Grid>
                <Grid item>
                  {orderDetails && (
                    <PurchaseInformation
                      order={order}
                      orderDetail={orderDetails[selectedOrder]}
                      key={`details_${selectedOrder}`}
                    />
                  )}
                </Grid>
                <Grid item>
                  {orderDetails && (
                    <FullfillOrder
                      orderId={order.order_id}
                      service={orderService}
                      onClose={onClose}
                      preview={preview}
                      orderDetail={orderDetails[selectedOrder]}
                      locked={locked}
                      navigate={navigate}
                      save={save}
                      key={`fullfill_${selectedOrder}`}
                      complateOrder={complateOrder}
                      zipcode={orderDetails[selectedOrder].delivery?.zipcode}
                    />
                  )}
                  {openModal && (
                    <Modal
                      open={openModal}
                      onClose={() => {
                        setOpenModal(false);
                      }}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Card sx={{ padding: 1, borderRadius: 1, minWidth: 360 }}>
                        <CardContent>
                          <Typography variant="subtitle-1">Order status will be complate! Sure?</Typography>
                        </CardContent>
                        <Divider></Divider>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <CustomButton
                            color="error"
                            onClick={() => {
                              setOpenModal(false);
                            }}
                          >
                            Cancel
                          </CustomButton>
                          <CustomButton
                            color="success"
                            onClick={() => {
                              setOpenModal(false);
                              onChange();
                            }}
                          >
                            Ok
                          </CustomButton>
                        </CardActions>
                      </Card>
                    </Modal>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </LoadingOverlay>
  );
};
export default Order;
