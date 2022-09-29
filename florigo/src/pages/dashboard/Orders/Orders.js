import { Outlet } from 'react-router-dom';

import i18n from 'i18next';
import en from './i18n/en.json';

i18n.addResourceBundle('en', 'orders', en);

const Orders = () => <Outlet />;

export default Orders;
