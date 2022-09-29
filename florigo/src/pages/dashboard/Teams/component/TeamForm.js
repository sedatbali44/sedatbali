import { Box, Card, CardContent, CardActions, Divider, Autocomplete, TextField, AlertMessage } from '@components';
import { useNavigate } from 'react-router-dom';
import { PATH_MANAGE } from 'routes/paths';

import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from 'components/hook-form';

import TeamsService from 'services/teamsService';
import EmployeeService from 'services/employeesService';

import { CustomCreateSubmitButton, CustomUpdateSubmitButton } from 'components/CustomButtons';
import { openSnackbar } from 'redux/slices/generalSlice';
import { setEmployees } from 'redux/slices/empolyeesSlice';
import { useDispatch, useSelector } from 'react-redux';

const TeamForm = ({ team }) => {
  const [isEdit, setIsEdit] = useState(false);
  const employees = useSelector((state) => state.employees.employees);
  const [selected, setSelected] = useState(team?.options?.teamlead || null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (team) {
      setIsEdit(true);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (employees.length === 0) {
      const getEmployees = async () => {
        await EmployeeService.getEmployees().then((res) => {
          dispatch(setEmployees(res.rows));
        });
      };

      getEmployees();
    }
  }, [employees]);

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      title: team?.title || '',
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
    if (!selected) {
      setErrorMessage('Please Select Team Leader');
      return;
    }
    const obj = { ...formData };
    obj.options = { ...obj.options, teamlead: selected };
    try {
      if (isEdit) {
        await TeamsService.updateTeam(team.id, obj);
        dispatch(openSnackbar({ message: 'Team Updated', severity: 'success' }));
      } else {
        await TeamsService.createTeam(obj);
        dispatch(openSnackbar({ message: 'Team Saved', severity: 'success' }));
      }
      reset();
      navigate(PATH_MANAGE.teams_manage);
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, severity: 'error' }));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        {errorMessage && (
          <CardContent>
            <AlertMessage
              severity="info"
              onClose={() => {
                setErrorMessage('');
              }}
            >
              {errorMessage}
            </AlertMessage>
          </CardContent>
        )}

        <CardContent>
          <Box sx={{ margin: 1 }}>
            <RHFTextField fullWidth name="title" label="Team" />
          </Box>
          <Box sx={{ margin: 1, marginY: 2 }}>
            {employees && (
              <Autocomplete
                value={selected}
                onChange={(event, value) => {
                  setSelected(value);
                }}
                fullWidth
                getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={employees}
                renderInput={(params) => <TextField {...params} label="Select Team Lead" />}
              />
            )}
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
export default TeamForm;
