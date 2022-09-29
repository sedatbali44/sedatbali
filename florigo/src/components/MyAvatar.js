// utils

import { useMemo } from 'react';
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function MyAvatar({ profile = null, name = null, ...other }) {
  const user = useSelector((state) => state.auth.user);

  const value = useMemo(() => user, [user]);

  return (
    <Avatar
      key={value?.details?.photoUrl}
      src={`${process.env.REACT_APP_HOST_API_KEY}${profile !== null ? profile : value?.details?.photoUrl}`}
      alt={value?.firstname}
      color={'default'}
      {...other}
    >
      {name && createAvatar(name).name}
      {!name && createAvatar(value?.firstname).name}
    </Avatar>
  );
}
