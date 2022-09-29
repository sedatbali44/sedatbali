import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

import useLocationInfo from 'hooks/useLocationPath';

// @mui
// @mui
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const Page = forwardRef(({ title, children, loading = false, meta, ...other }, ref) => {
  const { t } = useTranslation();
  const location = useLocationInfo();
  return (
    <>
      <Helmet>
        <title>{title !== undefined ? `${title} | CRM Florigo` : `${t(`sidebar.${location}`)} | CRM Florigo`}</title>
        {meta}
      </Helmet>
      <Box ref={ref} {...other}>
        <Container maxWidth={false}>{children}</Container>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading || false}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
};

export default Page;
