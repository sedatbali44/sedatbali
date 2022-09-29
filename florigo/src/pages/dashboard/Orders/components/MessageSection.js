import { useState } from 'react';
import { Box, Grid, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';

import { SectionStyle, SectionHeader } from './SectionDetail';

import { useSelector } from 'react-redux';

import MessageRow from './MessageRow';

import Scrollbar from 'components/Scrollbar';

import orderService from 'services/ordersService';

import Iconify from 'components/Iconify';

const MessageSection = ({ messages = [], setMessages, orderId }) => {
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
        setMessage('');
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  return (
    <Box sx={SectionStyle}>
      <SectionHeader>CUSTOM ORDERS LOG</SectionHeader>
      <Grid container sx={{ marginY: 2 }}>
        <Grid item xs={12} sx={{ borderRadius: 1, bgcolor: 'rgb(200,200,200,0.1)', padding: 2 }}>
          <TextField
            disabled={isLoading}
            variant={'outlined'}
            size={'small'}
            label={'Type You Note and Hit Enter'}
            multiline
            rows={2}
            fullWidth
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isLoading ? (
                    <CircularProgress size={28} color="primary"></CircularProgress>
                  ) : (
                    <IconButton
                      onClick={() => {
                        sendMessage();
                      }}
                    >
                      <Iconify icon={'bi:send-check'}></Iconify>
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: 'grey', padding: 1, height: 500 }}>
          <Scrollbar>
            <ul style={{ margin: 0, padding: 0, overflow: 'auto' }}>
              {messages.map((item, index) => (
                <li key={index} style={{ marginTop: 3 }}>
                  <MessageRow message={item} />
                </li>
              ))}
            </ul>
          </Scrollbar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageSection;
