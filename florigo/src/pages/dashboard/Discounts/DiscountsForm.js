import {
  Box,
  InputAdornment,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  CardActions,
  FormGroup,
  Switch,
} from '@components';
import { useNavigate } from 'react-router-dom';
import { PATH_MANAGE } from 'routes/paths';

import { useEffect, useState, React } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFSelect } from 'components/hook-form';

import DiscountsService from 'services/discountsService';
import i18n from 'i18next';
import en from './i18n/en.json';
import { CustomCreateSubmitButton, CustomUpdateSubmitButton } from 'components/CustomButtons';
import { openSnackbar } from 'redux/slices/generalSlice';
import { useDispatch } from 'react-redux';

i18n.addResourceBundle('en', 'discounts', en);

const DiscountsForm = ({ discount }) => {
  const [status, setStatus] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (discount) {
      setStatus(discount.status === 1);
      setIsEdit(true);
    }
  }, []);

  const NewUserSchema = Yup.object().shape({
    id: Yup.number(),
    discount_code: Yup.string().required('Discount Code is required'),
    rate: Yup.number().required('Discount Rate is required'),
    type: Yup.string().required('Discount Type is required'),
    use_limit: Yup.string().required('Usage Limit is required'),
    start_date: Yup.string(),
    description: Yup.string(),
    applies_to: Yup.string(),
    status: Yup.number(),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: { ...discount, type: 'percentage' },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    formData.status = status ? 1 : 0;
    formData.discount_code = formData.discount_code.toUpperCase();

    try {
      if (isEdit) {
        await DiscountsService.updateDiscount(formData);
        dispatch(openSnackbar({ message: 'Discount Updated', severity: 'success' }));
      } else {
        await DiscountsService.createDiscount(formData);
        dispatch(openSnackbar({ message: 'Discount Saved', severity: 'success' }));
      }
      reset();
      navigate(PATH_MANAGE.discount_manage);
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, severity: 'error' }));
    }
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={status}
                      onChange={(e) => {
                        setStatus(e.target.checked);
                      }}
                    />
                  }
                  label="Active"
                />
              </FormGroup>
            </Box>
          </CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField size={'medium'} name="discount_code" label="Discount Code" />
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFSelect disabled size={'medium'} name="type" label="Discount Type">
                  <option value={'percentage'}>Percentage</option>
                  <option value={'price'}>Price</option>
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField
                  size={'medium'}
                  name="rate"
                  label="Discount Rate"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end" sx={{ marginX: 1 }}>
                        %
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField
                  size={'medium'}
                  name="use_limit"
                  label="Usage Limits"
                  helperTextMessage="-1 is equal unlimitted"
                />
              </Grid>

              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField multiline rows={3} name="description" label="Description" />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
            {!isEdit ? (
              <CustomCreateSubmitButton type="submit" loading={isSubmitting}></CustomCreateSubmitButton>
            ) : (
              <CustomUpdateSubmitButton type="submit" loading={isSubmitting}></CustomUpdateSubmitButton>
            )}
          </CardActions>
        </Card>
      </FormProvider>
    </Box>
  );
};
export default DiscountsForm;
