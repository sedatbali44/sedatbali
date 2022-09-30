import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
// routes
import { PATH_DASHBOARD } from '../routes/paths';

import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
