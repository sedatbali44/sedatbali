import { useSelector } from 'react-redux';

const useIsDisabled = () => {
  const user = useSelector((state) => state.auth.user);

  const permissions = user?.permissions || [];

  // eslint-disable-next-line consistent-return

  const isDisable = (has) => {
    if (permissions.includes(has)) {
      return false;
    }

    return true;
  };

  return isDisable;
};

export default useIsDisabled;
