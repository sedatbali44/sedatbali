import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LicenseInfo } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addWeeks, startOfDay, endOfDay } from 'date-fns';

import Iconify from 'components/Iconify';

LicenseInfo.setLicenseKey(
  '61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

const RangeDateInput = ({
  hidetoday = false,
  hidesearch = false,
  startdate = null,
  enddate = null,
  setStartDate = () => {},
  setEndDate = () => {},
  range = 5,
  onSubmit = () => {},
}) => {
  const [value, setValue] = useState(
    startdate && enddate ? [startdate, enddate] : [startOfDay(new Date()), endOfDay(new Date())]
  );
  useEffect(() => {
    if (startdate !== value[0] || enddate !== value[1]) {
      setValue([startdate, enddate]);
    }
  }, [startdate, enddate]);

  useEffect(() => {
    if (value[0]) {
      setStartDate(startOfDay(value[0]).getTime());
    }
    if (value[1]) {
      setEndDate(endOfDay(value[1]).getTime());
    }
  }, [value]);

  return (
    <Box sx={{ display: 'flex', flex: 'row' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          locale={'en'}
          value={value}
          maxDate={getWeeksAfter(value[0], range)}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField size={'small'} {...startProps} sx={{ width: 120, borderRadius: 0 }} />
              <Box sx={{ mx: 0.5 }}> - </Box>
              <TextField size={'small'} {...endProps} sx={{ width: 120, borderRadius: 0 }} />
            </>
          )}
        />
      </LocalizationProvider>
      {!hidetoday && (
        <Button
          sx={{ borderRadius: 0, marginX: 0.5 }}
          variant="contained"
          color="warning"
          startIcon={<Iconify icon="material-symbols:today" />}
          onClick={() => {
            setValue([startOfDay(new Date()), endOfDay(new Date())]);
          }}
        >
          Today
        </Button>
      )}
      {!hidesearch && (
        <Button
          sx={{ borderRadius: 0, marginX: 0.5 }}
          variant="contained"
          color="success"
          startIcon={<Iconify icon="charm:search" />}
          onClick={() => {
            onSubmit();
          }}
        >
          Search
        </Button>
      )}
    </Box>
  );
};

export default RangeDateInput;
