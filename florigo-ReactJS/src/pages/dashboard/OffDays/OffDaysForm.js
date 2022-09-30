import {
  startOfDay,
  endOfDay,
  RangeDateInput,
  Box,
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
import { FormProvider, RHFTextField } from 'components/hook-form';
import OffDaysService from 'services/offDaysService';
import i18n from 'i18next';
import en from './i18n/en.json';
import { CustomCreateSubmitButton } from 'components/CustomButtons';
import { openSnackbar } from 'redux/slices/generalSlice';
import { useDispatch } from 'react-redux';

i18n.addResourceBundle('en', 'offdays', en);

const OffDaysForm = ({ offday }) => {
  const [status, setStatus] = useState(true);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (offday) {
      setStatus(offday.status === 1);
    }
  }, []);

  const NewUserSchema = Yup.object().shape({
    id: Yup.number(),
    start_date: Yup.string(),
    end_date: Yup.string(),
    description: Yup.string().required('Description is required'),
    status: Yup.number(),
    name: Yup.string().required('Name is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    formData.status = status ? 1 : 0;
    formData.start_date = starttime;
    formData.end_date = endtime;
    formData.description = formData.description.trim();
    formData.name = formData.name.trim();

    try {
      await OffDaysService.createOffDay(formData);
      dispatch(openSnackbar({ message: 'OffDay Saved', severity: 'success' }));
      reset();
      navigate(PATH_MANAGE.offday_manage);
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
                  name="status"
                  label="Active"
                />
              </FormGroup>
            </Box>
          </CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                {' '}
                <RangeDateInput
                  startdate={starttime}
                  enddate={endtime}
                  setStartDate={setStarttime}
                  setEndDate={setEndtime}
                  hidesearch
                  hidetoday
                ></RangeDateInput>
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField multiline rows={1} name="name" label="Name" />
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} sx={{ padding: 1 }}>
                <RHFTextField multiline rows={3} name="description" label="Description" />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
            <CustomCreateSubmitButton type="submit" loading={isSubmitting}></CustomCreateSubmitButton>
          </CardActions>
        </Card>
      </FormProvider>
    </Box>
  );
};
export default OffDaysForm;
