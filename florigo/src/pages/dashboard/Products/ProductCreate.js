import { Container, Grid } from '@mui/material';
import useSettings from 'hooks/useSettings';
import ProductForm from './ProductForm';

export default function ProductCreate() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <ProductForm />
      </Grid>
    </Container>
  );
}
