import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import addDays from 'date-fns/addDays';

import { IconButton, Box, Button, InputBase, Grid, Divider } from '@mui/material';
import Iconify from 'components/Iconify';

import { useNavigate } from 'react-router';

const CustomDatePicker = ({ value, setValue, setSearch, search, searchable }) => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ paddingX: 1 }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}
      >
        <Box display="flex" flexDirection="row" flexWrap="nowrap" sx={{ marginBottom: 1, paddingTop: 1 }}>
          {searchable && (
            <>
              <InputBase
                value={search}
                sx={{ minWidth: '280px' }}
                placeholder="Search Order"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <Iconify icon="el:search-alt"></Iconify>
              </IconButton>
            </>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          sx={{ paddingTop: 2, height: 44, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <IconButton
            onClick={() => {
              setValue(addDays(value.setUTCHours(0, 0, 0, 0), -1));
            }}
          >
            <Iconify icon="bi:arrow-left-square"></Iconify>
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Selected Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField style={{ minWidth: 120 }} {...params} variant="outlined" size={'small'} />
              )}
            />
          </LocalizationProvider>
          <IconButton
            onClick={() => {
              setValue(addDays(value.setUTCHours(0, 0, 0, 0), 1));
            }}
          >
            <Iconify icon="bi:arrow-right-square"></Iconify>
          </IconButton>
          <Box sx={{ width: 10 }}></Box>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box sx={{ width: 10 }}></Box>
          <Button
            variant="contained"
            onClick={() => {
              const dt = new Date();
              setValue(new Date(dt.setUTCHours(0, 0, 0, 0)));
            }}
            startIcon={<Iconify icon="clarity:new-line"></Iconify>}
          >
            Today
          </Button>
          {searchable && (
            <Button
              variant="contained"
              onClick={() => {
                navigate('/main/orders/daily_reports');
              }}
              startIcon={<Iconify icon="ant-design:dot-chart-outlined"></Iconify>}
              sx={{ marginLeft: 1 }}
            >
              Report
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomDatePicker;
