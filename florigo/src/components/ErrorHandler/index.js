import { Box, Button } from '@mui/material';

const ErrorHandler = ({ errorMessage, onClick }) => (
  <Box sx={{ border: '.5px solid red', borderRadius: 1, padding: 1 }}>
    {errorMessage} <Box sx={{ flexGrow: 1 }} />
    <Button
      onClick={() => {
        onClick();
      }}
    >
      Sil{' '}
    </Button>
  </Box>
);

export default ErrorHandler;
