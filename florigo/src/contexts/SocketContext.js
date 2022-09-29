import React from 'react';
import { io } from 'socket.io-client';

import { HOST_API } from 'config';

export const socket = io(HOST_API, {
  transports: ['websocket'],
  upgrade: false,
});
export const SocketContext = React.createContext();
