import { Card, Stack, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { blueGrey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Iconify from 'components/Iconify';

const QuickAccess = ({ type = 'menages' }) => {
  const links = {
    menages: [
      { title: 'Create New Employee', link: '' },
      { title: 'Create New Department', link: '' },
      { title: 'Create New Contact', link: '' },
      { title: 'Create New Contact Type', link: '' },
      { title: 'Create New Team ', link: '' },
      { title: 'Create New Role ', link: '' },
      { title: 'Set Permissions ', link: '' },
    ],
  };

  const handleListItemClick = () => {};

  const ListItem = ({ item }) => (
    <ListItemButton onClick={(event) => handleListItemClick(event, item)}>
      <ListItemIcon>
        <Iconify icon="bx:link-external" />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '12px' }} primary={item?.title} />
    </ListItemButton>
  );

  return (
    <div>
      <Card sx={{ mb: 4 }}>
        <Stack spacing={1} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color={blueGrey[500]}>
            Quick Access
          </Typography>
          <Divider />
          <List component="nav">{links && links[type].map((item) => <ListItem key={item?.title} item={item} />)}</List>
        </Stack>
      </Card>
    </div>
  );
};
export default QuickAccess;
