import { useState, useEffect } from 'react';

import ErrorBoundary from 'utils/ErrorBoundary';

import { Grid, Card, CardContent } from '@mui/material';

import Page from 'components/Page';

import RolesTable from './RolesTable';
import PermissionsTable from './PermissionsTable';

import permissionService from 'services/permissionsService';

import i18n from 'i18next';
import en from './i18n/en.json';

import './permissions.css';

i18n.addResourceBundle('en', 'permissions', en);

export default function Permissions() {
  const [isTouched, setIsTouched] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = () => {
      permissionList();
    };
    getRoles();
  }, []);

  useEffect(() => {
    if (isTouched === false) {
      permissionList();
    }
  }, [isTouched]);

  const [selectedRole, setSelectedRole] = useState(0);

  const updatePermissions = () => {};

  const permissionList = () => {
    permissionService.getPermissions().then((res) => {
      setPermissions(res.permissions);
      setRoles(res.roles);
    });
  };

  return (
    <Page className="bg-orange">
      <Card>
        <CardContent>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              {roles && (
                <RolesTable
                  roles={roles}
                  selected={selectedRole}
                  setSelected={setSelectedRole}
                  touched={isTouched}
                ></RolesTable>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              lg={9}
              xl={9}
              sx={{
                alignItems: 'stretch',
              }}
            >
              {permissions && roles && (
                <ErrorBoundary>
                  <PermissionsTable
                    key={new Date().getTime()}
                    permissions={permissions}
                    object={roles[selectedRole]}
                    setTouched={(e) => {
                      setIsTouched(e);
                    }}
                    touched={isTouched}
                    updatePermissions={(object) => {
                      updatePermissions(object);
                    }}
                  />
                </ErrorBoundary>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Page>
  );
}
