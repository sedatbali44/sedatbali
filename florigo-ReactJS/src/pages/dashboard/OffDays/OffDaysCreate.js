import { Container, Grid } from '@mui/material';
import OffDaysForm from './OffDaysForm';
import i18n from 'i18next';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'offdays', en);

const OffDaysCreate = () => (
  <Container>
    <Grid container spacing={1}>
      <Grid item xs={8} md={8} xl={8} lg={8}>
        <OffDaysForm />
      </Grid>
      <Grid item xs={4} md={4} xl={4} lg={4}></Grid>
    </Grid>
  </Container>
);

export default OffDaysCreate;
