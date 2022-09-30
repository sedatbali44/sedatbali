import { useMemo, useState } from 'react';
import { Grid, Typography, Button, CircularProgress, Alert, TextField } from '@mui/material';
import { Delete, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormProvider, RHFTextField, RHFSelect } from 'components/hook-form';

import AlertComponents from '../AlertComponents';

import { useDispatch } from 'react-redux';
import { openSnackbar } from 'redux/slices/generalSlice';

import OrderCalcRender from '../OrderCalcRender';

import OrderService from 'services/ordersService';

function FullfillOrder({ locked, orderDetail, preview, onClose, complateOrder, zipcode }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fullfill } = orderDetail?.details;
  const [phone, setPhone] = useState(fullfill.floristPhone || '');
  const specialInstruction = orderDetail?.delivery?.note;
  const fullfillscheme = Yup.object().shape({
    floristId: Yup.string().required('Florist ID is required'),
    floristName: Yup.string().required('Florist Name is required'),
    floristPhone: Yup.string().required('Florist Number is required'),
    totalPrice: Yup.string().required('Total Price is required'),
    vendorId: Yup.string().required('Vendor is required'),
  });

  const defaultValues = useMemo(
    () => ({
      floristId: fullfill?.floristId || '',
      floristName: fullfill?.floristName || '',
      floristPhone: fullfill?.floristPhone || '',
      totalPrice: fullfill?.totalPrice || '',
      vendorId: fullfill?.vendorId || 1,
      zipcode: fullfill?.zipcode || zipcode,
      specialInstruction: specialInstruction || '',
      description: fullfill?.description || '',
      updated: fullfill?.updated || false,
    }),
    [orderDetail]
  );

  const methods = useForm({
    resolver: yupResolver(fullfillscheme),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting }, // eslint-disable-line
  } = methods;

  const onSubmit = async (values) => {
    values.specialInstruction = values.specialInstruction
      .replace(/\n/gim, ' ')
      .replace(/\r/gim, ' ')
      .replace(/’/gim, ' ')
      .replace(/"/gim, ' ')
      .replace(/`/gim, ' ')
      .replace(/`/gim, ' ');

    values.description = values.description
      .replace(/\n/gim, ' ')
      .replace(/\r/gim, ' ')
      .replace(/’/gim, ' ')
      .replace(/"/gim, ' ')
      .replace(/`/gim, ' ')
      .replace(/`/gim, ' ');
    values.updated = true;
    setIsLoading(true);

    OrderService.updateOrderFullfill(orderDetail.id, values)
      .then(async () => {
        setValue('updated', true);
        setIsLoading(false);
        complateOrder();
      })
      .catch(() => {
        dispatch(openSnackbar({ message: 'An error accured when update order', severity: 'error' }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const applyFlorist = (florist) => {
    setPhone(florist.florist_phone);
    setValue('floristPhone', florist.florist_phone);
    setValue('floristName', florist.florist_name);
    setValue('floristId', florist.florist_id);
    setValue('vendorId', florist.vendor);
  };
  return (
    <Grid container direction="column" spacing="8px">
      <Grid item sx={{ marginBottom: 3, border: '.3px solid #d9d9d9', borderRadius: 2, padding: 2 }}>
        {orderDetail && orderDetail?.alerts && (
          <AlertComponents applyFlorist={applyFlorist} alerts={orderDetail?.alerts || []}></AlertComponents>
        )}
      </Grid>
      <Grid item>
        <Typography variant="h6">Fullfill Order</Typography>
      </Grid>
      <OrderCalcRender orderDetail={orderDetail} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          {getValues('updated') ? (
            <Alert severity="success">This order has been sent and updated!</Alert>
          ) : (
            <Alert severity="warning">This order has not yet been sent !</Alert>
          )}
        </Grid>
        <Grid item sx={{ marginTop: 4, padding: '12px' }}>
          <Grid container spacing="16px">
            <Grid item md={4}>
              <RHFSelect name="vendorId" label="Select Vendor" variant="standard" disabled={locked}>
                <option value={1}>FTD</option>
                <option value={2}>Bloomnet</option>
                <option value={3}>Local </option>
              </RHFSelect>
            </Grid>
            <Grid item md={4}>
              <RHFTextField
                name="floristId"
                label="Florist ID"
                variant="standard"
                inputProps={{ maxLength: 50 }}
                fullWidth
                disabled={locked}
              />
            </Grid>
            <Grid item md={4}>
              <RHFTextField
                type="number"
                name="totalPrice"
                label="Sending Price"
                variant="standard"
                fullWidth
                disabled={locked}
                onKeyDown={(e) => {
                  if (e.keyCode === 69) {
                    e.preventDefault();
                  }
                }}
              />
            </Grid>

            <Grid item md={4}>
              <RHFTextField name="floristName" label="Florist Name" variant="standard" fullWidth disabled={locked} />
            </Grid>
            <Grid item md={4}>
              <InputMask
                mask="999-999-9999"
                value={phone}
                disabled={false}
                maskChar=" "
                onChange={(e) => {
                  setPhone(e.target.value);
                  setValue('floristPhone', e.target.value);
                }}
              >
                {() => <TextField fullWidth label="Florist Phone Number" variant={'standard'} />}
              </InputMask>
            </Grid>
            <Grid item md={4}>
              <RHFTextField
                type="number"
                name="zipcode"
                label="Florist Zipcode"
                variant="standard"
                fullWidth
                disabled
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item md={6} sx={{ p: 1 }}>
                  <RHFTextField
                    multiline
                    rows={4}
                    name="description"
                    label="Order Details"
                    variant="standard"
                    inputProps={{ maxLength: 200 }}
                    fullWidth
                    disabled={locked}
                  />
                </Grid>
                <Grid item md={6} sx={{ p: 1 }}>
                  <RHFTextField
                    multiline
                    rows={4}
                    name="specialInstruction"
                    label="Special Instruction"
                    variant="standard"
                    inputProps={{ maxLength: 200 }}
                    fullWidth
                    disabled={locked}
                  ></RHFTextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', flex: 'row', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={isLoading ? <CircularProgress size={18} /> : <Save />}
                disabled={locked || isLoading || phone === ''}
              >
                {getValues('updated') ? 'Update' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Delete />}
                disabled={isLoading}
                color="error"
                onClick={() => {
                  if (preview) {
                    onClose(false);
                    return;
                  }
                  navigate(-1);
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </Grid>
  );
}

export default FullfillOrder;
