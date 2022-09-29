import { Container, Alert } from '@mui/material';

const AlertMessage = ({ severity, message }) => (
  <Container maxWidth={false}>{message && <Alert severity={severity}>{message}</Alert>}</Container>
);

export default AlertMessage;
