import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, Container } from '@mui/material';
import { CustomUpdateSubmitButton } from 'components/CustomButtons';
// hooks

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateUserProfileImage, updateProfileValues } from 'redux/slices/authSlices';
// utils
import { fData } from 'utils/formatNumber';

import ProfileService from 'services/profileService';

// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from 'components/hook-form';
import ResetPasswordForm from './components/ResetPasswordForm';
import DepartmentService from 'services/departmentsService';
import TeamService from 'services/teamsService';
import RoleService from 'services/roleService';
import EmployeeService from 'services/employeesService';
import i18n from 'i18next';
import en from './i18n/en.json';
import { openSnackbar } from 'redux/slices/generalSlice';

i18n.addResourceBundle('en', 'employees', en);
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getData = () => {
      getDepartmentTitle();
      getRoles();
      getTeamTitle();
    };

    getData();
  }, []);

  const UpdateUserSchema = Yup.object().shape({
    id: Yup.number(),
    details: Yup.object().shape({
      prefix: Yup.string().required(),
      personelInformation: Yup.object().shape({
        ext: Yup.string(),
        phone: Yup.string(),
        cell: Yup.string(),
        address: Yup.string(),
      }),
    }),
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    department_id: Yup.string().required('Department is required'),
    team_id: Yup.string().required('Team is required'),
    role_id: Yup.string().required('Role is required'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: { ...user },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (obj) => {
    const values = { ...obj };

    EmployeeService.updateEmployee(user.id, values).then(() => {
      reset(values);
      dispatch(updateProfileValues(values));
      dispatch(openSnackbar({ message: t('messages.userFormUpdate'), severity: 'success' }));
    });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    const setURL = async () => {
      const fd = new FormData();

      fd.append('file', getValues('photoUrl'));

      await ProfileService.setURL(fd)
        .then((response) => {
          dispatch(updateUserProfileImage(response.details.photoUrl));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setValue('photoUrl', null);
        });
    };

    if (watch('photoUrl')) setURL();

    return () => {
      setURL();
    };
  }, [watch('photoUrl')]);

  const getRoles = async () => {
    const { rows } = await RoleService.getRoles();

    setRoles(rows);
  };

  const getDepartmentTitle = async () => {
    const { rows } = await DepartmentService.getDepartments();
    setDepartments(rows);
  };

  const getTeamTitle = async () => {
    const { rows } = await TeamService.getTeams();
    setTeams(rows);
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <RHFUploadAvatar
                name="photoUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFSelect name="details.personelInformation.prefix" label="Prefix">
                  <option value="" />
                  <option value={'Mr'}>Mr.</option>
                  <option value={'Miss'}>Miss.</option>
                  <option value={'Mrs'}>Mrs.</option>
                </RHFSelect>
                <RHFTextField name="firstname" label="First Name" />
                <RHFTextField name="lastname" label="Last Name" />
                {departments && (
                  <RHFSelect name={'department_id'} label={'Departments'} placeholder="Departments" disabled>
                    <option value="">Please Select</option>
                    {departments.map((item) => (
                      <option value={item.id || ''} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </RHFSelect>
                )}
                {roles && (
                  <RHFSelect name={'role_id'} label={'Roles'} disabled>
                    <option value="">Please Select</option>
                    {roles.map((item) => (
                      <option value={item.id || ''} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </RHFSelect>
                )}
                {teams && (
                  <RHFSelect name={'team_id'} label={'Teams'} placeholder="Teams" key="teams" disabled>
                    <option value="">Please Select</option>
                    {teams.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </RHFSelect>
                )}
                <RHFTextField disabled name="email" label="Email" />
                <RHFTextField name="details.personelInformation.phone" label="Phone Number" />
                <RHFTextField name="details.personelInformation.ext" label="Ext" />
                <RHFTextField fullWidth name="details.personelInformation.address" label="Address" multiline rows={3} />
                <RHFTextField name="details.personelInformation.cell" label={'Cell Phone'} />
              </Box>
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <CustomUpdateSubmitButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  title="User Information Update"
                ></CustomUpdateSubmitButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      <ResetPasswordForm></ResetPasswordForm>
    </Container>
  );
}
