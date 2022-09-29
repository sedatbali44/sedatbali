import * as React from 'react';

import { DialogAnimate } from 'components/animate';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import success from 'assets/gif/success.gif';
import warn from 'assets/gif/warn.gif';
import fail from 'assets/gif/fail.gif';

export default function Modal({ isOpenModal, onCancel, onEvent, obj, param }) {
  const ImagePath = () => {
    let path = success;

    if (obj?.status === 'warn') path = warn;

    if (obj?.status === 'fail') path = fail;

    return path;
  };

  const title = () => {
    let setTitle = 'Successful';

    if (obj?.status === 'warn') {
      setTitle = 'Warning';
    }

    if (obj?.status === 'fail') {
      setTitle = 'Failure';
    }

    return setTitle;
  };

  return (
    <DialogAnimate open={isOpenModal} onClose={onCancel}>
      <Card>
        <CardHeader
          sx={{
            margin: 0,
            padding: 2,
          }}
          avatar={
            <Avatar sx={{ width: 48, height: 48 }} aria-label="recipe">
              <img src={ImagePath()} alt="" width="48px" height="48px" />
            </Avatar>
          }
          title={title()}
        />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {obj?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color="error"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onEvent(param);
            }}
          >
            Confirm
          </Button>
        </CardActions>
      </Card>
    </DialogAnimate>
  );
}
