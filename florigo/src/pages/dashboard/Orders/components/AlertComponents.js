import { Grid, Typography, Divider, Alert, Button, Iconify, AlertTitle } from '@components';

function AlertComponents({ alerts = [], applyFlorist = () => {} }) {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6">########## ALERTS ##########</Typography>
        <Divider></Divider>
      </Grid>
      <Grid item>
        {alerts &&
          alerts.map((item, index) => (
            <Alert
              sx={{ marginBottom: 1 }}
              key={index}
              severity={item?.severity || 'error'}
              action={
                item.florist && item.florist.type !== 'DNC' ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                      applyFlorist(item.florist);
                    }}
                  >
                    <Iconify icon="fluent:cursor-click-24-filled"></Iconify> Apply
                  </Button>
                ) : null
              }
            >
              {item.florist && <AlertTitle>{item.florist.type}</AlertTitle>}
              {item.description}
              {item.florist && <div>Phone : {item.florist.florist_phone}</div>}
            </Alert>
          ))}
      </Grid>
    </Grid>
  );
}

export default AlertComponents;
