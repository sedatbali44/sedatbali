import { Box, Tooltip } from '@mui/material';
import RecipientStatus from './RecipientStatus';
import { format, startOfDay } from 'date-fns';
import clsx from 'clsx';

const SubOrderDetailOnList = ({ order }) => {
  const deliveryDate = format(new Date(order.delivery_date * 1000), 'MM-dd-yyyy');

  const checktSameDateEvent = () => {
    const today = startOfDay(new Date()).getTime();
    const delivery = startOfDay(new Date(order.delivery_date * 1000)).getTime();

    if (today === delivery) {
      return true;
    }

    return false;
  };

  return (
    <Box sx={{ zoom: '100% !important' }}>
      <Tooltip
        title={
          <div>
            {order && (
              <RecipientStatus
                name={`${order?.delivery?.firstname} ${order?.delivery?.lastname}`}
                email={order?.delivery?.email}
                phone={order?.delivery?.phone}
                deliveryDate={deliveryDate}
                occasion={order?.delivery?.occasion}
                id={order.id}
              ></RecipientStatus>
            )}
          </div>
        }
        placement="left-start"
      >
        <span
          style={{ width: 90 }}
          className={clsx('badge btn', checktSameDateEvent() ? 'bg-info text-dark' : 'bg-warning text-dark')}
        >
          {deliveryDate}
        </span>
      </Tooltip>
    </Box>
  );
};

export default SubOrderDetailOnList;
