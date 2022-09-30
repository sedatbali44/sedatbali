import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Typography, Modal, Card, CardActions, CardContent, Divider, TextField } from '@mui/material';
import { CustomButton } from 'components/CustomButtons';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

import useCollapseDrawer from 'hooks/useCollapseDrawer';

import StatusSelector from '../StatusSelector';

const refunds = ['cancelled', 'refund', 'chargeback', 'non_delivery', 'rejection'];

function ActionHeader({ currentStatus, service, orderId, locked, orderExId, preview, suborders = false }) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [reason, setReason] = useState('');
  const [statusParam, setStatusParam] = useState('');

  const { isCollapse, onToggleCollapse } = useCollapseDrawer();
  const navigate = useNavigate();

  const onChange = (val) => {
    setIsLoading(true);
    service.setOrderTagWithReason(orderId, { status: val, reason }).then(() => {
      setStatus(val);
      setIsLoading(false);
    });
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 0.5, boxShadow: 0, p: '20px', width: '100%' }}>
      <Grid container justifyContent="space-between" alignItems="center" rowSpacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <Grid container alignItems="center" columnSpacing="12px">
            <Grid item>
              {!preview && (
                <IconButton
                  size="small"
                  onClick={() => {
                    if (isCollapse) {
                      onToggleCollapse();
                    }
                    navigate(-1);
                  }}
                >
                  <ArrowBack />
                </IconButton>
              )}
            </Grid>
            <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" sx={{ fontWeight: '700', color: blue[500] }}>
                Order #{orderExId}
              </Typography>
              {locked && (
                <Typography variant="h6" color="error" sx={{ marginX: 1 }}>
                  ORDER PREVIEW MODE
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <StatusSelector
            locked={locked}
            status={status}
            setStatus={(e) => {
              setStatusParam(e);
              setOpenModal(true);
            }}
            suborders={suborders}
            isLoading={isLoading}
          ></StatusSelector>
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Card sx={{ padding: 1, borderRadius: 1, minWidth: 360 }}>
              <CardContent>
                <Typography variant="subtitle-1">Order status will be updated! Sure?</Typography>
              </CardContent>
              {refunds.includes(statusParam) && (
                <CardContent>
                  <TextField
                    fullWidth
                    rows={3}
                    multiline
                    label="Reason for Refund"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  ></TextField>
                </CardContent>
              )}
              <Divider></Divider>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CustomButton
                  color="error"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  disabled={refunds.includes(statusParam) && reason.trim() === ''}
                  color="success"
                  onClick={() => {
                    onChange(statusParam);
                    setOpenModal(false);
                  }}
                >
                  Ok
                </CustomButton>
              </CardActions>
            </Card>
          </Modal>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ActionHeader;
