import { Box, Grid, Typography } from '@mui/material';

import { format } from 'date-fns';

import { useSelector } from 'react-redux';

const MessageRow = ({ message }) => {
  const { user } = useSelector((state) => state.auth);


  return (
    <Box sx={{ borderRadius: 1, padding: 1, bgcolor: 'RGB(200, 200, 200,0.2)' }}>
      <Grid container>
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Typography variant={'body1'}>{message.message}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', borderTop: 1, borderColor: '#d2d2d2cf' }}>
          {message.employee.id === user.id && (
            <Typography variant={'caption'} color="lightGreen" sx={{ fontWeight: 'bold' }}>
              {`${message.employee?.firstname} ${message.employee?.lastname}`} -{' '}
              {format(new Date(message.createdAt), 'MM-dd-yyyy HH-mm')}
            </Typography>
          )}
          {!message.employee.id === user.id && (
            <Typography variant={'caption'} color="orange" sx={{ fontWeight: 'bold' }}>
              {`${message.employee?.firstname} ${message.employee?.lastname}`} -{' '}
              {format(new Date(message.createdAt), 'MM-dd-yyyy HH-mm')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageRow;
