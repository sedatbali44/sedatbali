import { Box, Grid, Typography, TableContainer, Table, TableCell, TableRow, TableBody } from '@mui/material';

import { SectionStyle, SectionHeader } from './SectionDetail';

import { useSelector } from 'react-redux';

const PurchaseInfo = () => {
  const user = useSelector((state) => state.auth.user); // eslint-disable-line

  return (
    <Box sx={SectionStyle}>
      <SectionHeader>PURCHASE INFO</SectionHeader>
      <Grid container>
        <Grid item xs={12} sx={{ fontSize: 14, fontWeight: 'bold', paddingY: 2 }}>
          8517-624105-6736 | Merchant : TD Bank | CC Last 5 Digit : 94 2826
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <img
            src="https://terrysflorist.s3.amazonaws.com/images/BF232-11KM.jpg"
            width="100%"
            style={{ maxWidth: 120 }}
            alt=""
          />
        </Grid>
        <Grid item xs={10} sx={{ padding: 2 }}>
          <Typography variant={'h6'} color="primary">
            Blooming Meadow Bouquet
          </Typography>
          <div>
            <strong>SKU : </strong> BF700-11KS
          </div>
          <div>
            <strong>STANDART</strong>
          </div>
          <div>
            <Typography color="primary" variant={'h6'}>
              PRICE: $44.99
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sx={{ fontSize: 14, fontWeight: 'bold', paddingY: 2 }}>
          <TableContainer component={Box} sx={{ background: 'transparent' }}>
            <Table size={'small'}>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0.3 } }}>
                  <TableCell align="center">
                    $44.99 <br />
                    Flower Price
                  </TableCell>
                  <TableCell align="center">
                    $64.13 <br />
                    GRAND TOTAL
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PurchaseInfo;
