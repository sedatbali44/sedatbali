import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Typography, LinearProgress, IconButton } from '@mui/material';
//
import useSelectedColor from 'hooks/useSelectedColor';

import useCollapseDrawer from 'hooks/useCollapseDrawer';

import { useSelector } from 'react-redux';

import Iconify from 'components/Iconify';

HeaderBreadcrumbs.propTypes = {
  heading: PropTypes.string,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HeaderBreadcrumbs({ heading, sx }) {
  const { isLoading } = useSelector((state) => state.generals);

  const { isCollapse, onToggleCollapse } = useCollapseDrawer();
  const navigate = useNavigate();
  const color = useSelectedColor();

  return (
    <Box sx={{ mb: 3, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1, textTransform: 'uppercase' }}>
          <Typography
            variant="h6"
            color={'primary'}
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
          >
            <IconButton
              size={'small'}
              variant="outlined"
              color={'primary'}
              onClick={() => {
                if (isCollapse) {
                  onToggleCollapse();
                }
                navigate(-1);
              }}
              sx={{ marginX: 0.5 }}
            >
              <Iconify style={{ fontSize: 24 }} icon="bi:arrow-left-circle" />
            </IconButton>
            {heading}
          </Typography>
        </Box>
      </Box>
      {isLoading ? (
        <LinearProgress sx={{ height: 2 }} />
      ) : (
        <div style={{ borderBottom: `2px solid ${color || '#d9d9d9'}`, borderRadius: 5 }} />
      )}
    </Box>
  );
}
