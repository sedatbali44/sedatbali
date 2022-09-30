import { Container, Grid } from '@mui/material';
import TeamForm from './component/TeamForm';
import QuickAccess from 'components/QuickAccess';

export default function TeamsCreate() {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={8} md={8} xl={8} lg={8}>
          <TeamForm />
        </Grid>
        <Grid item xs={4} md={4} xl={4} lg={4}>
          <QuickAccess />
        </Grid>
      </Grid>
    </Container>
  );
}
