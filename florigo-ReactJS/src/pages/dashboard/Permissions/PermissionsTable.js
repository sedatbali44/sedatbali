import { useState } from 'react';
import { Grid, Divider, FormGroup, Checkbox, FormControlLabel, Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { openSnackbar } from 'redux/slices/generalSlice';

import roleService from 'services/roleService';

import { CustomSaveEventButton, CustomCancelEventButton } from 'components/CustomButtons';

const PermissionsTable = ({ permissions, object, setTouched, touched }) => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(object);

  const { t } = useTranslation();

  const updatePermission = (permission) => {
    if (role.permissions && role.permissions.includes(permission)) {
      const obj = { ...role };
      const index = obj.permissions.indexOf(permission);
      obj.permissions.splice(index, 1);
      setRole(obj);
    } else {
      const obj = { ...role };
      obj.permissions.push(permission);
      setRole(obj);
    }
  };

  const updateRolePermissions = (role) => {
    roleService
      .updateRole(role.id, role)
      .then(() => {
        dispatch(openSnackbar({ message: t('messages.update'), severity: 'success' }));
        setTouched(false);
      })
      .catch((err) => {
        dispatch(openSnackbar({ message: err.message, severity: 'error' }));
      });
  };

  const updateAllPermission = (e) => {
    if (e) {
      const obj = role;
      obj.permissions = [];
      permissions.map((item) => {
        obj.permissions.push(item.key);
        return item;
      });
      setRole(obj);
    } else {
      const obj = role;
      obj.permissions = [];
      setRole(obj);
    }
  };

  const selectAllChecked = () => {
    let status = false;

    // eslint-disable-next-line
    const diffrence = permissions.filter((item) => {
      if (!role?.permissions.includes(item.key)) {
        return item;
      }
    });

    if (diffrence.length === 0) status = true;

    return status;
  };

  const RenderPermission = ({ permission }) => (
    <Grid item xs={12} md={6}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={role?.permissions && role?.permissions.includes(permission.key)}
              onChange={() => {
                updatePermission(permission.key);
                setTouched(true);
              }}
            />
          }
          label={permission.description}
        />
      </FormGroup>
    </Grid>
  );

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid item xs={12}>
        <Typography color={'info.light'} variant="h6">
          {t(`permissions:has`, { role: object?.title })}
        </Typography>
        <Divider></Divider>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Grid container spacing={0.3}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAllChecked()}
                    onChange={(e) => {
                      setTouched(true);
                      updateAllPermission(e.target.checked);
                    }}
                  />
                }
                label={'Select All Permissions'}
              />
            </FormGroup>
          </Grid>
          {permissions.map((permission, i) => (
            <RenderPermission key={i} permission={permission}></RenderPermission>
          ))}
        </Grid>
      </Grid>
      {touched && (
        <Grid xs={12} sx={{ marginY: 1 }}>
          <Alert severity="warning">{t('permissions:detected_changes')} </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Divider light sx={{ marginY: 1 }} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomCancelEventButton
          other={{ disabled: !touched }}
          disabled={!touched}
          onClick={() => {
            setRole(object);
            setTouched(false);
          }}
        ></CustomCancelEventButton>
        <CustomSaveEventButton
          other={{ disabled: !touched }}
          variant={'outlined'}
          onClick={() => {
            updateRolePermissions(role);
          }}
        ></CustomSaveEventButton>
      </Grid>
    </Grid>
  );
};

export default PermissionsTable;
