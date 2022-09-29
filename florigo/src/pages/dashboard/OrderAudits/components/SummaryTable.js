import { Grid, Box } from '@mui/material';

import InformationCard from 'components/InformationCard';

const SummaryTable = ({ datatable }) => (
  <Box sx={{ width: '100%' }}>
    <Grid container size="medium" sx={{ display: 'flex', justifyContent: 'center' }} spacing={1}>
      {datatable &&
        datatable.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <InformationCard
              onSubmit={() => {}}
              subtitle={data.subtitle}
              title={data.title}
              color={data.color}
              icon={data.icon}
              sx={{ minWidth: 80, cursor: 'pointer' }}
            ></InformationCard>
          </Grid>
        ))}
    </Grid>
  </Box>
);

export default SummaryTable;
