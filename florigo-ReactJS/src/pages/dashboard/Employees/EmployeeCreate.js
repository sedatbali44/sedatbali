import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import EmployeeForm from './component/EmployeeForm';

export default function EmployeeCreate() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <EmployeeForm />
      </Grid>
    </Container>
  );
}
