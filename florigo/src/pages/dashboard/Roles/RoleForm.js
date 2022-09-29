import { Box, Card, CardContent, CardActions, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH_MANAGE } from 'routes/paths';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from 'components/hook-form';

import RoleService from 'services/roleService';

import { CustomCreateSubmitButton, CustomUpdateSubmitButton } from 'components/CustomButtons';
import { openSnackbar } from 'redux/slices/generalSlice';
import { useDispatch } from 'react-redux';

const RoleForm = ({ team }) => {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (team) {
      setIsEdit(true);
    }
  }, []); // eslint-disable-line

  const navigate = useNavigate();

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      title: team?.title,
    },
  });

  const {
    reset,
    controls, // eslint-disable-line
    setValue, // eslint-disable-line
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        await RoleService.updateRole(team.id, formData);
        dispatch(openSnackbar({ message: 'Role Updated', severity: 'success' }));
      } else {
        await RoleService.createRole(formData);
        dispatch(openSnackbar({ message: 'Role Saved', severity: 'success' }));
      }
      reset();
      navigate(PATH_MANAGE.roles_manage);
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, severity: 'error' }));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <RHFTextField style={{ width: '200%' }} name="title" label="Role" />
          </Box>
        </CardContent>
        <Divider sx={{ marginX: 2 }}></Divider>
        <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          {!isEdit ? (
            <CustomCreateSubmitButton other={{ type: 'submit' }}></CustomCreateSubmitButton>
          ) : (
            <CustomUpdateSubmitButton other={{ type: 'submit' }} loading={isSubmitting}></CustomUpdateSubmitButton>
          )}
        </CardActions>
      </Card>
    </FormProvider>
  );
};
export default RoleForm;
