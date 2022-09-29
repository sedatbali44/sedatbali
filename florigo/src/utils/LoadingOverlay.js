import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return <>{children}</>;
};

export default LoadingOverlay;
