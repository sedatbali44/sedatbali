import { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material';

import Scrollbar from 'components/Scrollbar';

import { SendOutlined, AccountCircle } from '@mui/icons-material';

import { format } from 'date-fns';

import orderService from 'services/ordersService';

import { useSelector } from 'react-redux';

function CustomOrderLog({ messages = [], setMessages, orderId, locked }) {
  const user = useSelector((state) => state.auth.user); // eslint-disable-line
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }
    setLoading(true);
    const obj = {
      orderId,
      message,
      employee: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
    orderService
      .setOrderMessage(obj)
      .then((resp) => {
        const mss = [...messages];
        mss.unshift(resp);
        setMessages(mss);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setMessage('');
        }, 200);
      });
  };

  return (
    <>
      <Grid container direction="column" spacing="16px">
        <Grid item>
          <Typography variant="h6">Custom Order Log</Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Type you note and hit enter</InputLabel>
            <OutlinedInput
              label="Type you note and hit enter"
              id="outlined-adornment-password"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isLoading || locked}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    <SendOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ height: '400px !important', padding: 0 }}>
            <Scrollbar>
              {messages &&
                messages.map((item, i) => (
                  <Paper key={i} sx={{ backgroundColor: 'rgba(33,43,54,0.1)', padding: 1, marginBottom: 0.5 }}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Avatar sx={{ backgroundColor: '#e0e1e1' }}>
                              <AccountCircle />
                            </Avatar>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">{`${item.employee.firstname}  ${item.employee.lastname}`}</Typography>
                            <Typography sx={{ fontSize: '13px' }}>{item.message}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Typography variant="caption">
                          {format(new Date(item.createdAt), 'dd-MM-yyyy HH:mm')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
            </Scrollbar>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default CustomOrderLog;
