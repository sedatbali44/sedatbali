import { useState } from 'react';
import { Paper, Grid, Typography, Tooltip, format, IconButton, Card, CardContent } from '@components';
import { Modal } from '@mui/material';
import Iconify from 'components/Iconify';
import OrderLogsComponent from './OrderLogsComponent';

import useDisabled from 'hooks/useDisabled';

import OrderAuthority from './OrderAuthority';

const OrderInformation = ({
  zipcode,
  claimed,
  orderId,
  teamlead = [],
  status,
  setLocked,
  id,
  orderDate,
  paymentLog = [],
}) => {
  const [claim, setClaim] = useState(claimed);
  const [open, setOpen] = useState(false);
  const [logDialog, setLogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null || claimed);
  const isDisabled = useDisabled();

  return (
    <Grid container direction="column" spacing="16px">
      <Grid item>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Order Information</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Find in Yelp" placement="top">
              <span>
                <IconButton
                  color="error"
                  href={`https://www.yelp.com/search?find_desc=florist&find_loc=${zipcode}`}
                  target="new_window"
                >
                  <Iconify icon={'cib:yelp'}></Iconify>
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Order Logs" placement="top">
              <span>
                <IconButton
                  color="warning"
                  onClick={() => {
                    setLogDialog(true);
                  }}
                >
                  <Iconify icon={'iconoir:google-docs'}></Iconify>
                </IconButton>
              </span>
            </Tooltip>

            {!isDisabled('UPDATE_ORDER_STATUS') && (
              <Tooltip title="Unlock Order" placement="top">
                <span>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setLocked(false);
                    }}
                  >
                    <Iconify icon={'eva:lock-outline'}></Iconify>
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Paper variant="outlined" sx={{ p: '16px' }}>
          <Grid container direction="column" spacing="8px">
            <Grid item>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle1">Claimed by</Typography>
                  <Typography sx={{ fontSize: '16px' }}>{`${claim?.firstname} ${claim?.lastname}`}</Typography>
                </Grid>
                <Grid item sx={{ display: 'flex', flex: 'row', alignItems: 'center' }}>
                  <div>
                    <Tooltip title="Only a team leader can update the claimed agent.">
                      <span>
                        <IconButton
                          disabled={teamlead.length === 0 || status === 'completed'}
                          sx={{ width: 40, height: 40, marginX: 1 }}
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          <Iconify icon="mdi:face-agent"></Iconify>
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Order Claimed By from agent">
                      <span>
                        <Iconify icon="bi:info-circle"></Iconify>
                      </span>
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle1">Claim date</Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    {claim?.claimedDate && format(new Date(claim?.claimedDate), 'MM-dd-yyyy h:mm a')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Agent order claimed date">
                    <span>
                      <Iconify icon="bi:info-circle"></Iconify>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle1">Order Date</Typography>
                  <Typography sx={{ fontSize: '16px', color: 'deeporange' }}>
                    {orderDate && format(new Date(orderDate * 1000), 'MM-dd-yyyy h:mm a')}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Ordered Date">
                    <span>
                      <Iconify icon="fa-regular:clock"></Iconify>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            {paymentLog && paymentLog.length > 0 && (
              <Grid item>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="subtitle1">Order Transaction</Typography>
                    {paymentLog.map((item) => (
                      <Typography key={item.transaction_id} sx={{ fontSize: '16px', color: 'deeporange' }}>
                        {item.transaction_id}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item>
                    <Tooltip title="Ordered Date">
                      <span>
                        <Iconify icon="ant-design:credit-card-filled"></Iconify>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <OrderAuthority
          selected={selected}
          loading={loading}
          setLoading={setLoading}
          setClaim={setClaim}
          orderId={orderId}
          teamIds={teamlead}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
        ></OrderAuthority>
      </Grid>
      <Grid item>
        <Modal
          open={logDialog}
          onClose={() => {
            setLogDialog(false);
          }}
        >
          <Card>
            <CardContent>
              {logDialog && (
                <OrderLogsComponent
                  id={id}
                  orderId={orderId}
                  renderButton={
                    <IconButton
                      onClick={() => {
                        setLogDialog(false);
                      }}
                    >
                      <Iconify icon="ep:close"></Iconify>
                    </IconButton>
                  }
                ></OrderLogsComponent>
              )}
            </CardContent>
          </Card>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default OrderInformation;
