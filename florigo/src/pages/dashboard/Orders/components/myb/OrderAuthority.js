import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, TextField, CardActions, Autocomplete } from '@components';
import { CustomCancelEventButton, CustomSaveEventButton } from 'components/CustomButtons';

import { Dialog } from '@mui/material';
import employeesService from 'services/employeesService';
import orderService from 'services/ordersService';

function OrderAuthority({ selected, loading, setSelected, setOpen, setLoading, teamIds, orderId, setClaim, open }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      setLoading(true);
      await employeesService
        .getTeamMembers(teamIds)
        .then((employees) => {
          setEmployees(employees);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getTeamMembers();

    return () => {};
  }, []);

  const setAssing = async () => {
    setLoading(true);
    await orderService
      .setOrderClaimed(orderId, selected.id)
      .then((res) => {
        setClaim(res);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2">Please select a transaction authority for the order.</Typography>
          <Divider light></Divider>
        </CardContent>
        <CardContent>
          <Autocomplete
            value={selected}
            options={employees}
            disabled={loading}
            getOptionLabel={(option) => option.firstname.concat(` ${option.lastname}`)}
            isOptionEqualToValue={(option, value) => Number(option.id) === Number(value.employeeId)}
            onChange={(event, value) => setSelected(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select a transaction authority" variant="outlined" fullWidth />
            )}
          />
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomCancelEventButton
            color="error"
            variant={'contained'}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </CustomCancelEventButton>
          <CustomSaveEventButton
            color="primary"
            variant={'contained'}
            onClick={() => {
              setAssing();
            }}
          >
            Save
          </CustomSaveEventButton>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export default OrderAuthority;
