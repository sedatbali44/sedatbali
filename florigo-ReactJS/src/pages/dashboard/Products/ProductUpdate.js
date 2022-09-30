import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import { useLocation } from 'react-router-dom';
import ProductForm from './ProductForm';

export default function ProductUpdate() {
  const { themeStretch } = useSettings();
  const location = useLocation();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <ProductForm product={location.state.product} />
      </Grid>
    </Container>
  );
}
