
import React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { Card, CardContent, Box, Button, Divider, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import Iconify from 'components/Iconify';

export default function FilterComponent({
  period,
  setPeriod = () => {},
  startDate,
  setStartDate = () => {},
  endDate,
  setEndDate = () => {},
  onReset,
  onEvent = () => {},
  zipcode,
  setZipcode = () => {},
}) {
  return (
    <Card>
      <CardContent sx={{ paddingX: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {startDate && endDate && (
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} />}
                sx={{ margin: 1 }}
              />
              <div className="m-1"></div>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} />}
                sx={{ margin: 1 }}
              />
            </Box>
          )}
          {period && (
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Time Period</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={period}
                  label="Time Period"
                  onChange={(e) => {
                    setPeriod(e.target.value);
                  }}
                >
                  <MenuItem value={'hourly'}>Hourly</MenuItem>
                  <MenuItem value={'daily'}>Daily</MenuItem>
                  <MenuItem value={'weekly'}>Weekly</MenuItem>
                  <MenuItem value={'montly'}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {zipcode !== null && zipcode !== undefined && (
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 4 }}>
              <TextField
                fullWidth
                label="Zip Code"
                variant="outlined"
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </Box>
          )}

          <Divider light sx={{ marginY: 1 }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Iconify icon="charm:search"></Iconify>}
              onClick={() => {
                onEvent();
              }}
            >
              Search
            </Button>

            {onReset && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Iconify icon="fluent:delete-arrow-back-16-filled"></Iconify>}
                onClick={() => {
                  onReset();
                }}
              >
                Reset
              </Button>
            )}
          </Box>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
