import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, IconButton, Box } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

CopyClipboard.propTypes = {
  value: PropTypes.any,
};

export default function CopyClipboard({ value }) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    value,
    copied: false,
  });

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar('Copied!');
    }
  };

  return (
    <Box sx={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
      <div className="mx-1">{state.value}</div>
      {state.value && typeof state.value === 'string' && (
        <CopyToClipboard text={String(state.value)} onCopy={onCopy}>
          <Tooltip title="Copy" placement="right">
            <IconButton>
              <Iconify icon={'eva:copy-fill'} width={12} height={12} />
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      )}
    </Box>
  );
}
