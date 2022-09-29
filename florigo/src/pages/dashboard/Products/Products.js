import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';

import i18next from 'i18next';
import en from './i18n/en.json';

i18next.addResourceBundle('en', 'roles', en);

export default function Products() {
  const { themeStretch } = useSettings();

  return (
    <Page className="bg-orange">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Container>
    </Page>
  );
}
