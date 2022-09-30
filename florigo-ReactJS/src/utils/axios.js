import axios from 'axios';
// config
import { HOST_API } from '../config';
import { dispatch } from 'redux/store';
import { logout } from 'redux/slices/authSlices';
import { openSnackbar } from 'redux/slices/generalSlice';
import storage from 'utils/@storage';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

export const session = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const clearSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('X-socket-id');
  delete axiosInstance.defaults.headers.common.Authorization;
};

axiosInstance.interceptors.request.use((config) => {
  axiosInstance.defaults.headers.common['X-set-lang'] = storage.get('i18nextLng') || 'en';
  axiosInstance.defaults.headers.common['X-socket-id'] = storage.get('X-socket-id');

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError && error.response.status === 401) {
      dispatch(logout());

      return;
    }

    if (error.isAxiosError && error.response.status === 406) {
      dispatch(openSnackbar({ severity: 'error', message: error.response.data.message }));
    }

    if (error.isAxiosError && error.response.status === 404) {
      dispatch(openSnackbar({ severity: 'error', message: 'Page Not Found' }));
    }
  }
);

export default axiosInstance;
