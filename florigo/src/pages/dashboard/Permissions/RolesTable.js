import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ErrorBoundary from 'utils/ErrorBoundary';

import Typography from '@mui/material/Typography';

const Roles = ({ selected, setSelected, roles, touched }) => {
  const { t } = useTranslation();

  return (
    <Grid style={{ height: '100%' }}>
      <Typography variant={'h6'} color="info.light">
        {t('role')}
      </Typography>
      <Divider></Divider>
      <FormControl>
        <ErrorBoundary>
          <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
            {roles &&
              roles.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item}
                  label={item?.title}
                  disabled={touched}
                  control={<Radio checked={index === selected} />}
                  onChange={() => {
                    setSelected(index);
                  }}
                />
              ))}
          </RadioGroup>
        </ErrorBoundary>
      </FormControl>
    </Grid>
  );
};

export default Roles;
