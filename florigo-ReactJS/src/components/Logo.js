import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid } from '@mui/material';
import Icon from '../assets/_logos/icon.png';
// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Grid container>
      <Box sx={{ width: 40, height: 40, ...sx }}>
        <img src={Icon} alt="" style={{ width: '100%', height: '100%' }} />
      </Box>
    </Grid>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
