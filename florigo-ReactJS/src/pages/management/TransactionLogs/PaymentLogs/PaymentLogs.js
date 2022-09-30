import Page from 'components/Page';
import { Container, Grid } from '@mui/material';

import i18n from 'i18next';
import en from './i18n/en.json';

import useNumberToAmount from 'hooks/useNumberToAmount';

import InformationCard, { colors } from 'components/InformationCard';

i18n.addResourceBundle('en', 'paymentlogs', en);

const PaymentLogs = () => {
  const numberToAmount = useNumberToAmount();

  return (
    <Page>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <InformationCard
              title={`$ ${numberToAmount(112312321.7)}`}
              subtitle={'ETC Bank'}
              count="133"
              icon={'clarity:bank-solid'}
              color={colors[0]}
            ></InformationCard>
          </Grid>
          <Grid item xs={4}>
            <InformationCard
              title={`$ ${numberToAmount(987671.7)}`}
              subtitle={'DEUTCHE Bank'}
              count="871"
              icon={'clarity:bank-solid'}
              color={colors[1]}
            ></InformationCard>
          </Grid>
          <Grid item xs={4}>
            <InformationCard
              title={`$ ${numberToAmount(112312321.7)}`}
              subtitle={'ETC Bank'}
              count="133"
              icon={'clarity:bank-solid'}
              color={colors[8]}
            ></InformationCard>
          </Grid>
          <Grid item xs={4}>
            <InformationCard
              title={`$ ${numberToAmount(987671.7)}`}
              subtitle={'DEUTCHE Bank'}
              count="871"
              icon={'clarity:bank-solid'}
              color={colors[10]}
            ></InformationCard>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
export default PaymentLogs;
