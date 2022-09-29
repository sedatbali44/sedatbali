import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import { useLocation } from 'react-router-dom';
import QuickAccess from 'components/QuickAccess';
import RoleForm from './RoleForm';

export default function RoleUpdate() {
  const { themeStretch } = useSettings();
  const location = useLocation();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid container spacing={1}>
        <Grid item xs={8} md={8} xl={8} lg={8}>
          <RoleForm team={location.state.team} />
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4}>
          <QuickAccess />
        </Grid>
      </Grid>
    </Container>
  );
}
