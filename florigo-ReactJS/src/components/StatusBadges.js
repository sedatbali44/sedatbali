import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import {
  blue,
  indigo,
  red,
  green,
  deepOrange,
  orange,
  blueGrey,
  lightGreen,
  lime,
  teal,
  purple,
} from '@mui/material/colors';

const StatusBadges = ({ status }) => {
  const { t } = useTranslation();

  const getBG = (status) => {
    let badge;

    switch (status) {
      case 'order_sent':
        badge = green[900];
        break;

      case 'pending_status':
        badge = blue[900];
        break;

      case 'new_order':
        badge = lightGreen[900];
        break;

      case 'non_funural':
        badge = deepOrange[700];
        break;

      case 'funural_prio':
        badge = deepOrange[900];
        break;

      case 'fs_pending_1':
        badge = indigo[900];
        break;

      case 'fs_pending_2':
        badge = indigo[700];
        break;

      case 'holiday':
        badge = deepOrange[700];
        break;

      case 'same_week_funural':
        badge = teal[700];
        break;

      case 'cx_more_info':
        badge = red[700];
        break;

      case 'cx_approved':
        badge = purple[700];
        break;

      case 'future_order':
        badge = green[700];
        break;

      case 'non_delivery':
        badge = orange[700];
        break;

      case 'inquires':
        badge = blueGrey[700];
        break;

      case 'fs_approved_1':
        badge = blue[700];
        break;

      case 'fs_approved_2':
        badge = blue[900];
        break;

      case 'rejection':
        badge = red[900];
        break;

      case 'fraud':
        badge = red[900];
        break;

      case 'funeral_verification':
        badge = blue[400];
        break;

      case 'refund':
        badge = deepOrange[700];
        break;

      case 'chargeback':
        badge = lime[900];
        break;

      case 'cancelled':
        badge = deepOrange[600];
        break;

      case 'locked':
        badge = red[600];
        break;

      case 'free':
        badge = green[600];
        break;

      case '1':
        badge = green[600];
        break;

      case '0':
        badge = red[600];
        break;

      default:
        badge = lightGreen[900];
        break;
    }

    return badge;
  };

  return (
    <span className={clsx('badge ms-1')} style={{ backgroundColor: getBG(status) }}>
      {t(`status.${status}`)}
    </span>
  );
};

export default StatusBadges;
