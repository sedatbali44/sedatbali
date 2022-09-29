import { useState } from 'react';
import { Paper, Grid, Typography, Tooltip, IconButton, Iconify, format, Box } from '@components';

import PriceBox from './PriceBox';
import ProductBox from './ProductBox';
import emailService from 'services/emailService';

import MailModal from 'components/MailModal';

function PurchaseInformation({ orderDetail, order }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(
    `<table cellpadding="10" style="boder:1px #cccccc solid; width:100%"> <tbody> <tr> <td style="vertical-align:top"> <h3>${
      orderDetail?.product?.name
    }</h3> <img src="${orderDetail.product?.url}" style="width:150px" /><br /> <strong>PRICE:</strong>
    <br/>
    
    <strong>${
      orderDetail.details?.productDetails?.addons.length > 0
        ? orderDetail.details?.productDetails?.addons[0].addOns_name
        : ''
    }</strong> <br/>
    <strong>${
      orderDetail.details?.productDetails?.addons.length > 1
        ? orderDetail.details?.productDetails?.addons[1].addOns_name
        : ''
    }</strong><br/>
    <strong>${
      orderDetail.details?.productDetails?.addons.length > 2
        ? orderDetail.details?.productDetails?.addons[2].addOns_name
        : ''
    }</strong><br/>
    <strong>${
      orderDetail.details?.productDetails?.addons.length > 3
        ? orderDetail.details?.productDetails?.addons[3].addOns_name
        : ''
    }</strong><br/>
    
    </td> <td> <h3>Recepeient Information</h3> <strong>Order Id</strong> ${
      order.order_id
    } <strong>Recepient Name:</strong> ${orderDetail.delivery?.firstname} ${
      orderDetail.delivery?.lastname
    } <br /> <strong>Phone:</strong> ${orderDetail.delivery?.phone} <br /> <strong>Occasion:</strong> ${
      orderDetail.delivery?.occasion?.title
    } <br /> <strong>Delivery Date:</strong> ${format(
      new Date(orderDetail.delivery_date * 1000),
      'MM-dd-yyyy'
    )} <br /> <strong>Institution:</strong> ${
      orderDetail.delivery?.institution_name
    } <br /> <strong>Institution Name:</strong> ${orderDetail.delivery?.institution} <h6>RECEPIENT ADDRESS</h6>

    ${orderDetail.delivery.zipcode} - ${orderDetail.delivery.city} <br />
    
    ${orderDetail.delivery?.address1}<br /> ${orderDetail.delivery.address2}<br /> 
    
    UNITED STATES
    
    <h6>CARD MESSAGE</h6> ${orderDetail.delivery?.message} <h6>SPECIAL INSTRUCTIONS</h6> 
    ${orderDetail.delivery?.note}
    </td> </tr> <tr> <td colspan="2">Thank you<br /> If you have questions or need assistance with your order, please contact us as follows:<br /> By Email: service@terrysflorist.com<br /> Our Phone: 1-888-507-9738</td> </tr> </tbody> </table>`
  );
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');

  const sendMail = async () => {
    await emailService
      .sendEmail({
        to,
        subject,
        html: content,
        text: content.replace(/<[^>]+>/g, ''),
      })
      .then(() => {
        setOpen(false);
      });
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Typography variant="h6">Purchase Information</Typography>
        <Tooltip title="Email to Florist" placement="top">
          <span>
            <IconButton
              color="info"
              onClick={() => {
                setOpen(true);
              }}
              sx={{ marginRight: 4 }}
            >
              <Iconify icon={'ic:round-mark-email-read'}></Iconify>
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing="16px">
          <Grid item>
            <Paper variant="outlined" sx={{ p: '12px' }}>
              <Typography variant="body2">
                {order.order_id} | <strong sx={{ marginRight: 5 }}> </strong>
                <strong>CC Last 5 Digit: {order?.payment_logs[0]?.request?.cardNumber} </strong>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Grid container spacing="16px">
              <Grid item md={6}>
                <Grid container direction="column" spacing="16px">
                  <Grid item>
                    <ProductBox orderDetail={orderDetail?.details.productDetails} product={orderDetail?.product} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container direction="column" spacing="16px">
                  <Grid item>
                    <PriceBox text="Flower Price" price={`${orderDetail?.details?.productDetails?.productPrice} $`} />
                  </Grid>
                  <Grid item>
                    <PriceBox text="Grand Total" price={`${order.details.total_price} $`} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MailModal
        mailModal={open}
        content={content}
        setContent={setContent}
        to={to}
        setTo={setTo}
        subject={subject}
        setSubject={(e) => {
          setSubject(e);
        }}
        sendHandler={() => {
          sendMail();
        }}
        onCancel={(e) => {
          setOpen(e);
        }}
      >
        <Box>
          <Grid container>
            <Grid item>
              <Typography variant="h6">Summary </Typography>
            </Grid>
            <Grid item xs={12}>
              {orderDetail.product.name}
            </Grid>
            <Grid item xs={12}>
              FLOWER PRICE : {orderDetail.product.price}
            </Grid>
            <Grid item xs={12}>
              SUB TOTAL : $ {orderDetail.product.price}
            </Grid>

            <Grid item xs={12}>
              TOTAL : $ {order.details?.total_price}
            </Grid>
          </Grid>
        </Box>
      </MailModal>
    </Grid>
  );
}

export default PurchaseInformation;
