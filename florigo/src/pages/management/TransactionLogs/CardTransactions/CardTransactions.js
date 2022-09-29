import Page from 'components/Page';
import { Container, Grid } from '@mui/material';

import i18n, { t } from 'i18next';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'cardtransactions', en);

const CardTransactions = () => (
  <Page>
    <Container>
      <Grid container>
        <Grid item xs={12}>
          {t('cardtransactions:title')} will be prepare on this page
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default CardTransactions;
