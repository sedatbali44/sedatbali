import Page from 'components/Page';
import { Container, Grid } from '@mui/material';

import i18n, { t } from 'i18next';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'crmdatabaselogs', en);

const CrmDatabaseLogs = () => (
  <Page>
    <Container>
      <Grid container>
        <Grid item xs={12}>
          {t('crmdatabaselogs:title')} will be prepare on this page
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default CrmDatabaseLogs;
