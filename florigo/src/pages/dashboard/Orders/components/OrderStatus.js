import { Box, Grid, IconButton, Iconify, Tooltip, Typography } from '@components';

import CopyClipboard from 'components/CopyClipboard';

import StatusBadges from 'components/StatusBadges';

const OrderStatus = ({
  status,
  tx,
  orderId,
  orderSocket,
  claimedBy,
  lockSocketId,
  id,
  activeUser,
  cleanSocket = () => {},
}) => (
  <Box sx={{ minWidth: 200, minHeight: 80, display: 'flex', alignItems: 'center' }}>
    <Grid
      container
      sx={{
        backgroundColor: orderSocket || lockSocketId ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1);',
        paddingY: 1,
        paddingX: 1,
        borderRadius: 1,
      }}
    >
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
        Status : <StatusBadges status={status}></StatusBadges>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        TX ID :{tx && tx.map((x, i) => <CopyClipboard key={i} value={x?.transaction_id}></CopyClipboard>)}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        Order Id : <CopyClipboard value={orderId}></CopyClipboard>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 12 }}>
        Assign To :
        <span>
          {claimedBy?.firstname || claimedBy?.lastname ? (
            <span className="badge bg-success text-white ms-1">{`${claimedBy?.firstname} ${claimedBy?.lastname}`}</span>
          ) : (
            <span className="badge bg-danger text-white ms-1">Non Claimed</span>
          )}
        </span>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 15, marginTop: 1 }}
      >
        {orderSocket || lockSocketId ? (
          <div>
            <StatusBadges status={'locked'}></StatusBadges>
            <div>
              <Typography variant={'caption'} sx={{ fontWeight: 'bold', fontSize: 14 }}>
                by {activeUser?.firstname} {activeUser?.lastname}
              </Typography>
            </div>
            <Tooltip
              title="
If you think your order is locked incorrectly."
            >
              <IconButton
                onClick={() => {
                  cleanSocket(id, orderId);
                }}
                sx={{ marginX: 1 }}
              >
                <Iconify color="error" icon="ri:logout-circle-line"></Iconify>
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <StatusBadges status={'free'}></StatusBadges>
        )}
      </Grid>
    </Grid>
  </Box>
);

export default OrderStatus;
