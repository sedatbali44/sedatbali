import { useRef } from 'react';
import { FormProvider, RHFTextField, RHFSelect } from 'components/hook-form';
import { Grid, Box, Divider, Tooltip, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'components/Iconify';
import { SectionStyle, SectionHeader } from './SectionDetail';


import { useSelector } from 'react-redux';

import orderService from 'services/ordersService';

const FullFillOrder = ({ delivery }) => {
  const updateEvent = useRef(null);
  const occasions = useSelector((state) => state.orders.occasions);
  const recipientResolver = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string(),
    zipcode: Yup.string(),
    city: Yup.string(),
    message: Yup.string(),
    note: Yup.string(),
    occasion: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(recipientResolver),
    defaultValues: { ...delivery, country: 'United States', occasion: delivery.occasion?.id },
  });

  const { handleSubmit } = methods;

  const onSubmit = (val) => {
    orderService.updateOrderRecipient(delivery.id, val);
  };

  return (
    <Box sx={SectionStyle}>
      <SectionHeader>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          RECIPIENT INFO
          <Box>
            <Tooltip title="If need some changes recipient User Information Update (logging)" placement={'left'}>
              <div>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  size={'small'}
                  startIcon={<Iconify sx={{ fontSize: 28 }} icon="heroicons-outline:refresh"></Iconify>}
                  sx={{ mb: 1 }}
                  onClick={() => {
                    updateEvent.current.click();
                  }}
                >
                  Update
                </Button>
              </div>
            </Tooltip>
          </Box>
        </Box>
      </SectionHeader>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={5}>
            <Box
              sx={{
                marginY: 2,
                paddingRight: 3,
              }}
            >
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} label={'First Name'} name={'firstname'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} label={'Last Name'} name={'lastname'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} label={'Phone Number'} name="phone" fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} name="institution" label={'Institution'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField
                  size={'small'}
                  name="institution_name"
                  label={'Institution Name'}
                  fullWidth
                ></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFSelect name="occasion" label="Occasion" size={'small'}>
                  {occasions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                marginY: 2,
                paddingRight: 3,
              }}
            >
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} name="address1" label={'Address 1'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} name="address2" label={'Address 2'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} name="zipcode" label={'Zip Code'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField size={'small'} label={'City'} name="city" fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField name="state" size={'small'} label={'State'} fullWidth></RHFTextField>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <RHFTextField name="country" disabled size={'small'} label={'Country'} fullWidth></RHFTextField>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider></Divider>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <Box sx={{ marginBottom: 2 }}>
                  <Box
                    sx={{
                      marginY: 2,
                      paddingRight: 3,
                    }}
                  >
                    <RHFTextField
                      name="message"
                      size={'small'}
                      multiline
                      rows={4}
                      line={3}
                      label={'Card Message'}
                      fullWidth
                    ></RHFTextField>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    marginY: 2,
                    paddingRight: 3,
                  }}
                >
                  <RHFTextField
                    name="note"
                    size={'small'}
                    multiline
                    rows={4}
                    line={3}
                    label={'Special Instructions'}
                    fullWidth
                    value=""
                  ></RHFTextField>
                </Box>
                <Button
                  type="submit"
                  color={'primary'}
                  variant={'contained'}
                  size={'small'}
                  startIcon={<Iconify sx={{ fontSize: 28 }} icon="heroicons-outline:refresh"></Iconify>}
                  sx={{ mb: 1, display: 'none' }}
                  ref={updateEvent}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};
export default FullFillOrder;
