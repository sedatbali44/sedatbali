import { Box, FormControlLabel, Grid, Card, CardContent, CardActions, FormGroup, Switch } from '@components';
import { useNavigate } from 'react-router-dom';
import { PATH_MANAGE } from 'routes/paths';
import { useEffect, useState, React } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from 'components/hook-form';
import OccasionsService from 'services/OccasionsService';
import i18n from 'i18next';
import FormLabel from '@mui/material/FormLabel';
import en from './i18n/en.json';
import { CustomCreateSubmitButton } from 'components/CustomButtons';
import { openSnackbar } from 'redux/slices/generalSlice';
import { useDispatch } from 'react-redux';

i18n.addResourceBundle('en', 'occasions', en);

const OccasionForm = ({ occasion }) => {
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (occasion) {
      setStatus(occasion.status === 1);
    }
  }, []);

  const NewUserSchema = Yup.object().shape({
    status: Yup.number(),
    title: Yup.string().required('Title is required'),
    options: Yup.object().shape({
      ftdCode: Yup.string().required('FTD Code is required'),
      bloomnetCode: Yup.string().required('BloomNet Code is required'),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      status: 1,
      title: '',
      options: {
        ftdCode: 'OTHER',
        bloomnetCode: 8,
      },
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {
    formData.status = status ? 1 : 0;
    try {
      await OccasionsService.createOccasion(formData);
      dispatch(openSnackbar({ message: 'Occasion Saved', severity: 'success' }));
      reset();
      navigate(PATH_MANAGE.occasion_manage);
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, severity: 'error' }));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Box>
            <FormGroup>
              <FormLabel variant="outlined">Status</FormLabel>
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
            <Grid item xs={9} md={9} xl={9} lg={9} sx={{ padding: 1 }}>
              <RHFTextField multiline rows={1} name="title" label="Title" />
            </Grid>
            <Grid item xs={9} md={9} xl={9} lg={9} sx={{ padding: 1 }}>
              <RHFTextField multiline rows={1} name="options.ftdCode" label="FTD Code" disabled />
            </Grid>
            <Grid item xs={9} md={9} xl={9} lg={9} sx={{ padding: 1 }}>
              <RHFTextField multiline rows={1} name="options.bloomnetCode" label="BloomNet Code" disabled />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <CustomCreateSubmitButton type="submit" loading={isSubmitting}></CustomCreateSubmitButton>
        </CardActions>
      </Card>
    </FormProvider>
  );
};
export default OccasionForm;
