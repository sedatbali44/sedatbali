import { useSelector } from 'react-redux';

const Permissions = ({ has, children }) => {
  const user = useSelector((state) => state.auth.user);

  // eslint-disable-next-line
  const permissions = user?.permissions || [];

  if (has) {
    if (Array.isArray(has)) {
      if (has.some((item) => permissions.includes(item))) {
        return children;
      }
    } else if (permissions.includes(has)) {
      return children;
    }
    return children; // will be delete after permission event complate
  }

  return null;
};

export default Permissions;
