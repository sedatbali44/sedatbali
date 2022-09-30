import { Container } from '@mui/material';
import useSettings from 'hooks/useSettings';

import Page from 'components/Page';
import { Outlet } from 'react-router';

export default function Employees() {
  const { themeStretch } = useSettings();

  return (
    <Page className="bg-orange">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Outlet />
      </Container>
    </Page>
  );
}
