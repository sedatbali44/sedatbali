import React, { useState } from 'react';

import Page from 'components/Page';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField, RHFSelect } from 'components/hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Iconify,
  Divider,
} from '@components';
import { CustomUpdateSubmitButton, CustomCreateSubmitButton } from 'components/CustomButtons';
import InputMask from 'react-input-mask';
import floristService from 'services/floristsService';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloristCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state;
  const florist = data?.florist;
  const [phone, setPhone] = useState(florist?.florist_phone);
  const [open, setOpen] = useState(false);

  const floristSheme = Yup.object().shape({
    florist_name: Yup.string(),
    florist_phone: Yup.string().required('Title is required'),
    zipcode: Yup.string().required('Title is required'),
    vendor: Yup.number().required('Title is required'),
    email: Yup.string().email(),
    vendor_id: Yup.string(),
    type: Yup.string(),
    note: Yup.string(),
    address: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(floristSheme),
    defaultValues: {
      id: florist?.id ? florist.id : null,
      florist_name: florist?.florist_name ? florist?.florist_name : '',
      florist_phone: florist?.florist_phone ? florist?.florist_phone : '',
      zipcode: florist?.zipcode ? florist?.zipcode : '',
      email: florist?.email ? florist?.email : '',
      vendor: florist?.vendor ? florist?.vendor : 3,
      vendor_id: florist?.vendor_id ? florist?.vendor_id : '',
      type: florist?.type ? florist?.type : 'STANDART',
      note: florist?.note ? florist?.note : '',
      address: florist?.address ? florist?.address : '',
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    await floristService.setFlorist(data).then(() => {
      setOpen(true);
      setPhone('');
      reset();
      navigate('/florists/florists/florists_manage');
    });
  };
  return (
    <Page className="bg-orange">
      <Container maxWidth={'md'}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert severity="success">Florist Created!</Alert>
        </Snackbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }} color="primary">
                {florist?.id ? (
                  <Iconify sx={{ fontSize: 29 }} icon="bx:message-square-edit"></Iconify>
                ) : (
                  <Iconify sx={{ fontSize: 29 }} icon="uil:create-dashboard"></Iconify>
                )}
                {florist?.id ? 'FLORIST UPDATE' : 'CREATE FLORIST'}
              </Typography>
              <Divider></Divider>
            </CardContent>

            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFTextField
                    name="florist_name"
                    label="Florist Name"
                    variant="outlined"
                    inputProps={{ maxLength: 100 }}
                  ></RHFTextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <InputMask
                    mask="999-999-9999"
                    value={phone}
                    disabled={false}
                    maskChar=" "
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setValue('florist_phone', e.target.value);
                    }}
                  >
                    {() => <TextField fullWidth label="Florist Phone Number" variant={'outlined'} />}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFTextField
                    name="email"
                    label="Email"
                    inputProps={{ maxLength: 50 }}
                    variant="outlined"
                  ></RHFTextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFTextField
                    name="zipcode"
                    label="Florist Zipcode"
                    inputProps={{ maxLength: 11 }}
                    variant="outlined"
                  ></RHFTextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFSelect name="vendor" label="Select Vendor" variant="outlined">
                    <option value={1}>FTD</option>
                    <option value={2}>Bloomnet</option>
                    <option value={3}>Local </option>
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFTextField name="florist_id" label="Vendor ID" variant="outlined"></RHFTextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <RHFSelect name="type" label="Action Type" variant="outlined">
                    <option value={'STANDART'}>STANDART </option>
                    <option value={'AUTO_SEND'}>AUTO_SEND</option>
                    <option value={'DNC'}>DNC</option>
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <RHFTextField
                    name="address"
                    inputProps={{ maxLength: 300 }}
                    label="Address"
                    variant="outlined"
                    multiline
                    rows={3}
                  ></RHFTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <RHFTextField
                    name="note"
                    label="Note"
                    inputProps={{ maxLength: 300 }}
                    variant="outlined"
                    multiline
                    rows={3}
                  ></RHFTextField>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              {florist?.id ? (
                <CustomUpdateSubmitButton type="submit" icon="carbon:update-now" isLoading={isSubmitting}>
                  Update
                </CustomUpdateSubmitButton>
              ) : (
                <CustomCreateSubmitButton type="submit" icon="eva:save-fill" isLoading={isSubmitting}>
                  Save
                </CustomCreateSubmitButton>
              )}
            </CardActions>
          </Card>
        </FormProvider>
      </Container>
    </Page>
  );
}
