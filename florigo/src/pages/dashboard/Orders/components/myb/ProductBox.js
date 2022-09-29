import { Paper, Grid, Typography, Box } from '@mui/material';
import AP_MYLAR1 from 'assets/imgs/AP_MYLAR1.jpg';
import AP_GREETING1 from 'assets/imgs/AP_GREETING1.jpg';
import AP_PLUSH1 from 'assets/imgs/AP_PLUSH1.jpg';
import AP_CHOC1 from 'assets/imgs/AP_CHOC1.jpg';

const ProductBox = (props) => {
  const { product, orderDetail } = props;

  const checkUrl = (url) => {
    if (url === 'AP_MYLAR1.jpg') {
      return AP_MYLAR1;
    }

    if (url === 'AP_GREETING1.jpg') {
      return AP_GREETING1;
    }

    if (url === 'AP_PLUSH1.jpg') {
      return AP_PLUSH1;
    }
    if (url === 'AP_CHOC1.jpg') {
      return AP_CHOC1;
    }

    return null;
  };

  const AddonBox = ({ addon }) => (
    <>
      <Box key={`addon_${addon.addonName}`} sx={{ fontSize: 10, marginTop: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {addon.addonUrl && (
            <img
              src={checkUrl(addon.addonUrl)}
              style={{ width: 50, height: 50, resize: 'contain', marginRight: 5 }}
              alt={'addon img'}
            />
          )}
          {addon.addonName} - <strong>${addon.addonPrice}</strong>
        </Box>
      </Box>
    </>
  );
  return (
    <>
      <Paper variant="outlined" sx={{ p: '16px', marginBottom: 3 }}>
        <Grid container justifyContent="space-between">
          <Grid item md={10}>
            <Grid container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
              <Grid item>
                <Typography>
                  <strong>{product.name}</strong>
                </Typography>
                <Typography variant="body2" className="font-weight-bold">
                  {orderDetail?.skuId} - {orderDetail?.skuName}
                </Typography>
                <Typography variant="body2">
                  <strong>SKU:</strong> {product.sku_id}Id
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" color="primary" sx={{ mt: '8px', display: 'inline-block' }}>
                  <strong>{product?.price} $</strong>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <img src={product.url} alt="" />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderTop: '1px solid #f5f5f5ce',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {orderDetail && orderDetail.addons.map((item, i) => <AddonBox key={i} addon={item}></AddonBox>)}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProductBox;
