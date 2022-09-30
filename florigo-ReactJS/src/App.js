import { useEffect } from 'react';

import './app.css';
// routes
import Router from './routes';

// theme

import ThemeProvider from './theme';

import * as Sentry from '@sentry/react';

// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { Snackbar, IconButton, Alert } from '@mui/material';
import Iconify from 'components/Iconify';

import { closeSnackbar } from 'redux/slices/generalSlice';
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { SocketContext, socket } from 'contexts/SocketContext';

import { createSocket, clearSocket } from 'redux/slices/socketSlice';

import {
  setOrders,
  updateOrderTag,
  updateOrderSocket,
  updateOrderClaimed,
  addedNewOrder,
  deleteOnList,
} from 'redux/slices/ordersSlice';

import { updateUserPermissions } from 'redux/slices/authSlices';

import { useNavigate } from 'react-router-dom';

import axios from 'utils/axios';

import storage from 'utils/@storage';

// ----------------------------------------------------------------------

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { snackbar, message, severity } = useSelector((state) => state.generals);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { socketId } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearSocket());
      socket.disconnect();
      console.log('socket  connection lost on token => ', socketId);
      navigate('/', { replace: true });
    }
    if (isAuthenticated) {
      socket.connect();
      socket.on('socketId', (e) => {
        console.log('socket connection on token =>', e);
        storage.set('X-socket-id', e);
        axios.defaults.headers.common['X-socket-id'] = e;
        dispatch(createSocket(e));
      });
      socket.on('orders', (val) => {
        dispatch(setOrders(val));
      });

      socket.on('updateOrderTag', (val) => {
        dispatch(updateOrderTag(val));
      });

      socket.on('orderLocked', (val) => {
        dispatch(updateOrderSocket(val));
      });

      socket.on('deleteOnList', (val) => {
        dispatch(deleteOnList(val));
      });

      socket.on('updatePermissions', (val) => {
        if (Array.isArray(val)) {
          dispatch(updateUserPermissions(val));
        }
      });
      socket.on('updateOrderClaimed', (val) => {
        if (val.id && val.claimedBy) {
          dispatch(updateOrderClaimed(val));
        }
      });

      socket.on('listNewOrder', (val) => {
        dispatch(addedNewOrder(val));
      });
    }
  }, [isAuthenticated, socketId]); // eslint-disable-line

  return (
    <ThemeProvider>
      <SocketContext.Provider
        value={{
          socket,
          socketId,
        }}
      >
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <MotionLazyContainer>
                  <Snackbar
                    open={snackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={3000}
                    message={message}
                    action={
                      <IconButton
                        color="primary"
                        onClick={() => {
                          dispatch(closeSnackbar());
                        }}
                      >
                        <Iconify icon="eva:close-circle-outline" />
                      </IconButton>
                    }
                    onClose={() => {
                      dispatch(closeSnackbar());
                    }}
                  >
                    <Alert
                      onClose={() => {
                        dispatch(closeSnackbar());
                      }}
                      severity={severity === '' ? 'success' : severity}
                      sx={{ width: '100%' }}
                    >
                      {message}
                    </Alert>
                  </Snackbar>
                  <ProgressBarStyle />
                  <ChartStyle />
                  <Settings />
                  <ScrollToTop />
                  <Router />
                </MotionLazyContainer>
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default Sentry.withProfiler(App);
