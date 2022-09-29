// form
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Card, CardContent, CardActions } from '@mui/material';
// hooks

import { useDispatch } from 'react-redux';

import { CustomUpdateSubmitButton } from 'components/CustomButtons';

import { FormProvider, RHFTextField } from 'components/hook-form';

import { openSnackbar } from 'redux/slices/generalSlice';

import EmployeeService from 'services/employeesService';

import i18n, { t } from 'i18next';
import en from '../i18n/en.json';

i18n.addResourceBundle('en', 'employees', en);
// ----------------------------------------------------------------------

const ResetPasswordForm = ({ employee }) => {
  const dispatch = useDispatch();
  const [user] = useState(employee);

  const UpdateUserSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'), // about min of "new password" button, but we have 2 buttons, it works only with one of them
  });

  const defaultValues = {
    password: user?.password || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (obj) => {
    await EmployeeService.updatePassword(user.id, obj).then(() => {
      dispatch(
        openSnackbar({
          message: t('messages.updatePassword'),
          severity: 'success',
        })
      );
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <RHFTextField fullWidth type="password" name="password" label="New  Password" />
            </CardContent>
            <CardActions sx={{ display: 'flex', flex: 'row', justifyContent: 'end' }}>
              <CustomUpdateSubmitButton type="submit" title={'Update Password'} loading={isSubmitting} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ResetPasswordForm;
