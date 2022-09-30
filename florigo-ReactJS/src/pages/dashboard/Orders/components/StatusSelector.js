import { MenuItem, Tooltip, Iconify, TextField, Alert } from '@components';

import { useSelector } from 'react-redux';

import useDisabled from 'hooks/useDisabled';

const complates = ['completed', 'refund', 'rejection', 'cancelled', 'chargeback'];

const StatusSelector = ({ status, setStatus, isLoading, locked, suborders }) => {
  const tags = useSelector((state) => state.orders.tags);
  const isDisable = useDisabled();

  const checkDisabled = () => {
    if (isLoading) {
      return true;
    }

    if (complates.includes(status) && !isDisable('UPDATE_ORDER_STATUS')) {
      return false;
    }

    if (complates.includes(status) || locked) {
      return true;
    }

    return false;
  };

  return (
    <>
      <TextField
        fullWidth
        select
        value={status}
        label="Status"
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        options={5}
        size={'small'}
        disabled={checkDisabled()}
      >
        {tags &&
          tags
            .filter((x) => suborders === true || (suborders === false && x.key !== 'completed'))
            .map((item, i) => (
              <MenuItem key={i} value={item.key}>
                <Tooltip title={item.desc || ''} placement="right">
                  <div>
                    {status === item.key ? (
                      <Iconify icon="ant-design:caret-right-outlined" sx={{ color: 'primary' }}></Iconify>
                    ) : (
                      ''
                    )}
                    <span>{item.title}</span>
                  </div>
                </Tooltip>
              </MenuItem>
            ))}
      </TextField>
      {!suborders ? (
        <Alert severity="error">Sub orders Not Completed Yet</Alert>
      ) : (
        <Alert severity="success">Sub orders completed!</Alert>
      )}
    </>
  );
};

export default StatusSelector;
