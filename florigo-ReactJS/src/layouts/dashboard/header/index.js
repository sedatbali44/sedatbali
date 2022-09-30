import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Paper, IconButton, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useSelector } from 'react-redux';
//
import { useNavigate } from 'react-router-dom';

// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import useLocationInfo from 'hooks/useLocationPath';
import { useTranslation } from 'react-i18next';

import NotificationsPopover from './NotificationsPopover';
// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocationInfo();
  const isDesktop = useResponsive('up', 'lg');
  const { t, i18n } = useTranslation();
  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '80% !important',
          px: { lg: 5 },
          borderBottom: '.5px solid #d9d9d9',
          marginTop: 0,
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}
        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
        {isAuthenticated && (
          <Paper
            sx={{
              display: 'flex',
              alingItems: 'center',
              flex: 'row',
              backgroundColor: 'transparent',
            }}
          >
            <IconButton
              size={'small'}
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
              sx={{ margin: 1 }}
            >
              <Iconify style={{ fontSize: 24 }} icon="bi:arrow-left-circle" />
            </IconButton>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}>
              {i18n.exists(`sidebar.${location}`) ? t(`sidebar.${location}`) : 'Back To LIST'}
            </Typography>
          </Paper>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
