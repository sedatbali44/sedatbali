import { Typography, Divider } from '@mui/material';

export const SectionStyle = {
  width: '100%',
  height: '100%',
  bgcolor: 'rgb(178, 190, 181,0.1)',
  borderRadius: 1,
  padding: 2,
  paddingLeft: 2,
};

const SectionHeader = ({ children }) => (
  <div>
    <Typography variant={'subtitle2'}>{children}</Typography>
    <Divider></Divider>
  </div>
);

export { SectionHeader };
