import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, disabled = false, helperTextMessage, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={''}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          disabled={disabled}
          {...field}
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!error}
          helperText={error?.message || helperTextMessage}
          {...other}
        />
      )}
    />
  );
}
