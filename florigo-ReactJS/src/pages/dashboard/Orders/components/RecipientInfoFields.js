import { useRef, useState } from 'react';
import { Grid, Box, Divider, Card, CardContent, Typography, Button } from '@mui/material';
import { FormProvider, RHFTextField, RHFSelect } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector } from 'react-redux';

import orderService from 'services/ordersService';

import { CustomUpdateSubmitButton, CustomCancelEventButton } from 'components/CustomButtons';
import useWindowDimensions from 'hooks/useWindowDimensions';

import Scrollbar from 'components/Scrollbar';

const RecipientInfoFields = ({ delivery, setOpen, updateDelivery }) => {
  const dimensions = useWindowDimensions();
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { occasions } = useSelector((state) => state.orders);

  const recipientResolver = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    phone: Yup.string(),
    zipcode: Yup.string(),
    city: Yup.string(),
    message: Yup.string(),
    note: Yup.string(),
    occasion: Yup.number(),
  });

  const methods = useForm({
    resolver: yupResolver(recipientResolver),
    defaultValues: { ...delivery, country: 'United States', occasion: delivery.occasion?.id || 1 },
  });

  const { handleSubmit } = methods;

  const onSubmit = (val) => {
    setIsLoading(true);
    orderService.updateOrderRecipient(delivery.id, val).then(() => {
      updateDelivery(val);
      setOpen(false);
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">RECIPIENT INFORMATION</Typography>
      </CardContent>
      <Divider light></Divider>
      <CardContent sx={{ height: dimensions.height - 150 }}>
        <Scrollbar>
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
                    <RHFTextField size={'small'} label={'First Name'} name="firstname" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Last Name'} name="lastname" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Phone Number'} name="phone" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Institution'} name="institution" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField
                      size={'small'}
                      label={'Institution Name'}
                      name="institution_name"
                      fullWidth
                    ></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFSelect label="Occasion" name="occasion" fullWidth>
                      {occasions &&
                        occasions.map((item) => (
                          <option key={item.title} value={item.id}>
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
                    <RHFTextField size={'small'} label={'Address 1'} name="address1" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Address 2'} name="address2" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Zip Code'} name="zipcode" disabled fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'City'} name="city" fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'State'} name="state" disabled fullWidth></RHFTextField>
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <RHFTextField size={'small'} label={'Country'} fullWidth name="country" disabled></RHFTextField>
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
                          size={'small'}
                          multiline
                          rows={4}
                          line={2}
                          label={'Card Message'}
                          name="message"
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
                        line={2}
                        label={'Special Instructions'}
                        fullWidth
                      ></RHFTextField>
                    </Box>
                    <Button type="submit" ref={ref} sx={{ display: 'none' }}></Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
              <CustomCancelEventButton
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {
                  setOpen(false);
                }}
              ></CustomCancelEventButton>
              <CustomUpdateSubmitButton
                type={'submit'}
                size="small"
                variant="outlined"
                color="primary"
                isLoading={isLoading}
              ></CustomUpdateSubmitButton>
            </Grid>
          </FormProvider>
        </Scrollbar>
      </CardContent>
    </Card>
  );
};

export default RecipientInfoFields;
