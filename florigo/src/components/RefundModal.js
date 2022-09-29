import { useState } from 'react';
import { Modal, Card, CardContent, CardActions, Grid, TextField, Typography, Divider } from '@mui/material';
import { Iconify } from '@components';
import { CustomButton } from './CustomButtons';

import useWindowDimensions from 'hooks/useWindowDimensions';

const RefundModal = ({ open, onClose, onSubmit, order }) => {
  const [payment] = useState(order.payment_logs.find((item) => item.transaction_id));
  const [refund, setRefund] = useState({
    orderId: order.order_id,
    refund_amount: order.details.total_price,
    description: order.details.reason,
  });

  const windowDimensions = useWindowDimensions();

  const checkAmount = () => {
    if (refund.refund_amount === '') return true;

    if (refund.refund_amount === 0 || refund.refund_amount === '0') return true;

    if (order.details.total_price < refund.refund_amount) return true;

    if (order.details?.refunded_amount) return true;

    if (refund.description.trim() === '') return true;

    return false;
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose(false);
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: 450, maxHeight: windowDimensions.height - 150, overflow: 'auto' }}>
        <CardContent>
          <Typography variant="h6">
            <Iconify icon="fa:hashtag"></Iconify> Order Refund/Void
          </Typography>
          <Divider></Divider>
        </CardContent>
        <CardContent>
          Click OK to continue this action and Refund this transaction. Click Cancel to abort this action and return to
          the previous page.
        </CardContent>
        <Divider></Divider>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Customer Name
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : {order.customer?.firstname} {order.customer?.lastname}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Card Holder
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : {payment?.request?.firstname} {payment?.request?.lastname}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Transaction ID
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : {payment?.transaction_id}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Payment Card
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : {payment?.request?.cardNumber}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Payment Method
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : Credit Card
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Invoice (Order ID)
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  : {order.order_id}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Payment Amount ($)
                  </Typography>
                </Grid>
                <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
                  : {order.details?.total_price}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Refund Amount ($)
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    type="number"
                    value={refund.refund_amount}
                    onChange={(e) => {
                      setRefund({
                        ...refund,
                        refund_amount: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 69) {
                        e.preventDefault();
                      }
                    }}
                    fullWidth
                    label="Refund Amount"
                    size="small"
                    variant="outlined"
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    value={refund.description}
                    size="small"
                    rows={4}
                    fullWidth
                    multiline
                    label="Reason for Refund"
                    onChange={(e) => {
                      setRefund({
                        ...refund,
                        description: e.target.value,
                      });
                    }}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 2, paddingY: 2 }}>
          <CustomButton
            color="error"
            onClick={() => {
              onClose(false);
            }}
          >
            <Iconify icon="ant-design:close-circle-outlined"></Iconify> Cancel
          </CustomButton>
          <CustomButton
            color="primary"
            onClick={() => {
              onSubmit(refund);
            }}
            disabled={checkAmount() || !payment?.transaction_id}
          >
            <Iconify icon="mdi:credit-card-refund-outline"></Iconify> Refund
          </CustomButton>
        </CardActions>
      </Card>
    </Modal>
  );
};
export default RefundModal;
