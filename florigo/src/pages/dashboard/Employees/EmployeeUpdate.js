import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import EmployeeForm from './component/EmployeeForm';
import { useLocation } from 'react-router-dom';

export default function EmployeeCreate() {
  const { themeStretch } = useSettings();
  const location = useLocation();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <EmployeeForm employee={location.state.employee} />
      </Grid>
    </Container>
  );
}
