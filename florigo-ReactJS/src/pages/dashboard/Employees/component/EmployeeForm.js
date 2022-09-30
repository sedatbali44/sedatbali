import * as Yup from 'yup';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Card, Stack, Container, CardActions } from '@mui/material';
import { CustomUpdateSubmitButton, CustomCreateSubmitButton } from 'components/CustomButtons';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { FormProvider, RHFSelect, RHFTextField } from 'components/hook-form';
import DepartmentService from 'services/departmentsService';
import TeamService from 'services/teamsService';
import RoleService from 'services/roleService';
import EmployeeService from 'services/employeesService';
import i18n from 'i18next';
import en from '../i18n/en.json';
import { openSnackbar } from 'redux/slices/generalSlice';

import { useNavigate } from 'react-router-dom';
import useSettings from 'hooks/useSettings';

import ResetPasswordForm from './ResetPasswordForm';

i18n.addResourceBundle('en', 'employees', en);

export default function EmployeeForm({ employee }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const getDepartments = async () => {
    const { rows } = await DepartmentService.getDepartments();
    if (rows) setDepartments(rows);
  };

  const getTeams = async () => {
    const { rows } = await TeamService.getTeams();
    if (rows) setTeams(rows);
  };

  const getRoles = async () => {
    const { rows } = await RoleService.getRoles();
    if (rows) setRoles(rows);
  };

  useEffect(() => {
    const getData = async () => {
      await getDepartments();
      await getTeams();
      await getRoles();
    };

    if (employee) {
      setIsEdit(true);
    }

    getData();
    return () => {
      getData();
    };
  }, []); // eslint-disable-line

  const { themeStretch } = useSettings();

  const NewUserSchema = Yup.object().shape({
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
    phone: Yup.string(),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: employee,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (obj) => {
    const values = { ...obj };
    if (isEdit) {
      EmployeeService.updateEmployee(employee.id, values).then(() => {
        dispatch(openSnackbar({ message: t('messages.userFormUpdate'), severity: 'success' }));
      });
    } else {
      EmployeeService.createEmployee(values).then(() => {
        dispatch(openSnackbar({ message: 'Employee Created !', severity: 'success' }));
      });
    }

    navigate(-1);
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <Box sx={{ minWidth: 120 }}>
                    <RHFSelect name={'details.prefix'} label="Prefix">
                      <option value="">Please Select</option>
                      <option value={'mr'}>Mr.</option>
                      <option value={'mrs'}>Mrs.</option>
                      <option value={'miss'}>Miss</option>
                    </RHFSelect>
                  </Box>
                  <RHFTextField name="firstname" label="First Name" />
                  <Box sx={{ minWidth: 120 }}>
                    {departments && (
                      <RHFSelect name={'department_id'} label={'Departments'} placeholder="Departments">
                        <option value="">Please Select</option>
                        {departments.map((item) => (
                          <option value={item.id || ''} key={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  </Box>
                  <RHFTextField name="lastname" label="Last Name" />

                  <Box sx={{ minWidth: 120 }}>
                    {teams && (
                      <RHFSelect name={'team_id'} label={'Teams'} placeholder="Teams" key="teams">
                        <option value="">Please Select</option>
                        {teams.map((item) => (
                          <option value={item.id || ''} key={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  </Box>
                  <RHFTextField name="details.personelInformation.phone" label="Phone" />
                  <Box sx={{ minWidth: 120 }}>
                    {roles && (
                      <RHFSelect name={'role_id'} label={'Roles'}>
                        <option value="">Please Select</option>
                        {roles.map((item) => (
                          <option value={item.id || ''} key={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                  </Box>
                  <RHFTextField name="email" label="Email" />
                  <RHFTextField name="details.personelInformation.address" label="Employee Adress" />
                  <RHFTextField name="details.personelInformation.cell" label={'Cell Phone' || ''}></RHFTextField>
                  <RHFTextField name="details.personelInformation.ext" label="Ext" />
                  {!isEdit && <RHFTextField name="password" label="Password" />}
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {!isEdit ? (
                      <CustomCreateSubmitButton other={{ type: 'submit' }}></CustomCreateSubmitButton>
                    ) : (
                      <CustomUpdateSubmitButton
                        other={{ type: 'submit' }}
                        loading={isSubmitting}
                      ></CustomUpdateSubmitButton>
                    )}
                  </CardActions>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
      <Grid item xs={12}>
        {isEdit && <ResetPasswordForm employee={employee}></ResetPasswordForm>}
      </Grid>
    </Container>
  );
}
