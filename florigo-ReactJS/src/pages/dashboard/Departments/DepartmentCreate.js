import { Container, Grid } from '@mui/material';
import QuickAccess from 'components/QuickAccess';
import DepartmentForm from './DepartmentForm';
import i18n from 'i18next';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'departments', en);

const DepartmentCreate = () => (
  <Container>
    <Grid container spacing={1}>
      <Grid item xs={8} md={8} xl={8} lg={8}>
        <DepartmentForm />
      </Grid>
      <Grid item xs={4} md={4} xl={4} lg={4}>
        <QuickAccess />
      </Grid>
    </Grid>
  </Container>
);

export default DepartmentCreate;
