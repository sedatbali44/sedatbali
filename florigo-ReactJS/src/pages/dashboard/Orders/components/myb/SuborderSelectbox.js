import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';

import _ from 'lodash';

function SuborderSelectbox({ setSelectedOrder, orderLength, selectedOrder }) {
  return (
    <FormControl fullWidth size={'small'}>
      <InputLabel id="subOrder">Suborder</InputLabel>
      <Select
        labelId="subOrder"
        value={selectedOrder}
        label="Suborder"
        onChange={(e) => {
          setSelectedOrder(e.target.value);
        }}
      >
        <MenuItem value={0}>Sub Order 1</MenuItem>
        {_.times(orderLength - 1, (e) => (
          <MenuItem key={e} value={e + 1}>
            Sub Order {e + 2}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SuborderSelectbox;
