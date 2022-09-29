import { useState } from 'react';

import { Paper, Grid, Typography, IconButton, Divider, Box, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Iconify from 'components/Iconify';

import orderService from 'services/ordersService';

import { DialogAnimate } from 'components/animate';

import RecipientInfoField from '../RecipientInfoFields';

import useIsDisauseIsDisabledbled from 'hooks/useDisabled';

function RecipientInformation({ delivery, updateDelivery, locked, deliveryDate }) {
  const isDisable = useIsDisauseIsDisabledbled();
  const [date, setDate] = useState(new Date(deliveryDate?.delivery_date * 1000));

  const [open, setOpen] = useState(false);

  const handleChange = async (e) => {
    await orderService.updateOrderDeliveryDate(deliveryDate.id, new Date(e).getTime()).then(() => {
      setDate(e);
    });
  };

  return (
    <>
      <Grid container direction="column" spacing="8px">
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="h6">Recipient Information</Typography>
            </Grid>

            <Grid item>
              <IconButton
                variant="text"
                size="medium"
                color="primary"
                disabled={locked}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Iconify sx={{ fontSize: 28 }} icon="bx:message-square-edit"></Iconify>
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              fontWeight: 'bold',
              fontSize: 22,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1,
              padding: 1,
              backgroundColor: '#f5f5f5ce',
            }}
          >
            <MobileDatePicker
              disabled={locked || isDisable('UPDATE_DELIVERY_DATE')}
              label="Delivery Date"
              inputFormat="MM/dd/yyyy"
              value={date}
              autoOk={false}
              minDate={new Date()}
              onChange={(e) => {
                setDate(e);
              }}
              onClose={() => {
                setDate(new Date(deliveryDate?.delivery_date * 1000));
              }}
              onAccept={handleChange}
              renderInput={(params) => <TextField fullWidth size={'small'} {...params} />}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Paper variant="outlined">
            <Box sx={{ p: '16px' }}>
              <Grid container spacing="16px">
                <Grid item md={3}>
                  <Typography variant="subtitle1">First Name</Typography>
                  <Typography variant="body2">{`${delivery?.firstname}`}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">Last Name</Typography>
                  <Typography variant="body2">{`${delivery?.lastname}`}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">Phone Number</Typography>
                  <Typography variant="body2">{delivery?.phone}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body2">{delivery?.email}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider light />
            <Box sx={{ p: '16px' }}>
              <Grid container spacing="16px">
                <Grid item md={6}>
                  <Typography variant="subtitle1">Address 1</Typography>
                  <Typography variant="body2">{delivery?.address1}</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="subtitle1">Address 2</Typography>
                  <Typography variant="body2">{delivery?.address2}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider light />
            <Box sx={{ p: '16px' }}>
              <Grid container spacing="16px">
                <Grid item md={3}>
                  <Typography variant="subtitle1">Zip Code</Typography>
                  <Typography variant="body2">{delivery?.zipcode}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">City</Typography>
                  <Typography variant="body2">{delivery?.city}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">State</Typography>
                  <Typography variant="body2">{delivery?.state}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">Country</Typography>
                  <Typography variant="body2">USA</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider light />
            <Box sx={{ p: '16px' }}>
              <Grid container spacing="16px">
                <Grid item md={3}>
                  <Typography variant="subtitle1">Occasion</Typography>
                  <Typography variant="body2">{delivery?.occasion?.title}</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography variant="subtitle1">Institution Name</Typography>
                  <Typography variant="body2">{delivery?.institution_name}</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="subtitle1">Institution</Typography>
                  <Typography variant="body2">{delivery?.institution}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider light />
            <Box sx={{ p: '16px' }}>
              <Grid container spacing="16px">
                <Grid item md={6}>
                  <Typography variant="subtitle1">Card Message</Typography>
                  <Typography variant="body2">{delivery?.message}</Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="subtitle1">Special Instructions</Typography>
                  <Typography variant="body2">{delivery?.note}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <DialogAnimate open={open} maxWidth={'lg'}>
        <RecipientInfoField
          delivery={delivery}
          setOpen={(e) => {
            setOpen(e);
          }}
          updateDelivery={(e) => {
            updateDelivery(e);
          }}
        ></RecipientInfoField>
      </DialogAnimate>
    </>
  );
}

export default RecipientInformation;
