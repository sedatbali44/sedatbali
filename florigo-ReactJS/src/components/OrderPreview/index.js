import { DialogAnimate } from 'components/animate';

import Scrollbar from 'components/Scrollbar';

import { Card, CardContent } from '@components';
import Order from 'pages/dashboard/Orders/Order';
import useWindowDimensions from 'hooks/useWindowDimensions';

const OrderPreview = ({ order, open, onClose }) => {
  const { height } = useWindowDimensions();

  return (
    <DialogAnimate
      open={open}
      maxWidth="xl"
      onClose={() => {
        onClose(false);
      }}
      sx={{ height: height - 100 }}
    >
      <Scrollbar>
        <Card>
          <CardContent>
            <Order preview={order} onClose={onClose} />
          </CardContent>
        </Card>
      </Scrollbar>
    </DialogAnimate>
  );
};

export default OrderPreview;
