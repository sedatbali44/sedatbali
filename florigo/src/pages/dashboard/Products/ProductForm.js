import * as React from 'react';
import { useState, useRef } from 'react';
import {
  Grid,
  Container,
  Divider,
  ButtonBase,
  CardActions,
  TextField,
  Iconify,
  Typography,
  InputAdornment,
} from '@components';
import { CustomUpdateEventButton } from 'components/CustomButtons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import en from './i18n/en.json';
import { openSnackbar } from 'redux/slices/generalSlice';
import ProductsService from 'services/productsService';
import useSettings from 'hooks/useSettings';

i18n.addResourceBundle('en', 'products', en);

export default function ProductForm({ product }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [prod, setProd] = useState(product);

  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  const onSubmit = async () => {
    ProductsService.updateProduct(product.id, prod).then(() => {
      dispatch(openSnackbar({ message: t('messages.productFormUpdate'), severity: 'success' }));
    });
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{ display: 'flex ', justifyContent: 'center', flexDirection: 'row' }}>
          <Grid item xs={12} sm={8} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Media
                </Typography>
                <Divider></Divider>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: 2,
                  minHeight: 200,
                }}
              >
                <ButtonBase
                  id="icon-button-file"
                  component="label"
                  onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
                  sx={{
                    width: 300,
                    height: 300,
                    border: '.3px solid #d9d9d9',
                    background: 'transparent',
                    backgroundImage: `url(${product.url})`,
                    backgroundSize: '300px 300px',
                  }}
                >
                  <Iconify icon="bi:file-earmark-plus" size={24}></Iconify>
                  <input ref={ref} type="file" accept="image/*" hidden />
                </ButtonBase>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Product Details
                </Typography>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={prod.name}
                  onChange={(e) => {
                    setProd({
                      ...prod,
                      name: e.target.value,
                    });
                  }}
                  label="Product"
                  size="small"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={prod.description}
                  onChange={(e) => {
                    setProd({
                      ...prod,
                      description: e.target.value,
                    });
                  }}
                  label="Description"
                  size="small"
                  rows={6}
                  multiline
                ></TextField>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginY: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Variants
                </Typography>
                <Divider></Divider>
              </Grid>
              {prod.sku_types.map((sku) => (
                <Grid key={sku.skuId} item xs={12}>
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    fullWidth
                    label={sku.skuTypeName}
                    value={prod.prices[sku.skuId].price.replace('$', '')}
                    onChange={(e) => {
                      setProd({
                        ...prod,
                        price: sku.skuTypeName === prod.sku_type ? e.target.value.replace('$', '') : prod.price,
                        prices: {
                          ...prod.prices,

                          [sku.skuId]: { ...prod.prices[sku.skuId], price: e.target.value },
                        },
                      });
                    }}
                    size={'small'}
                  ></TextField>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <CustomUpdateEventButton
                    onClick={() => {
                      onSubmit();
                    }}
                  ></CustomUpdateEventButton>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
