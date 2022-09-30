import { Card, CardContent, CardActions, Typography } from '@mui/material';
import {
  red,
  blue,
  green,
  orange,
  purple,
  teal,
  yellow,
  lime,
  amber,
  deepOrange,
  blueGrey,
  pink,
} from '@mui/material/colors';

import Iconify from 'components/Iconify';

const InformationCard = ({ title, subtitle, count, icon, color, onSubmit = () => {}, ...other }) => (
  <Card sx={{ boxShadow: 3, minWidth: 300 }} {...other} variant="outlined" onClick={onSubmit}>
    <CardContent>
      <Typography color={color} variant="h3">
        {title}
      </Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </CardContent>
    <CardActions
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color,
        paddingX: 2,
      }}
    >
      <Typography variant="h4">{count}</Typography>
      <Iconify icon={icon} sx={{ fontSize: 30 }}></Iconify>
    </CardActions>
  </Card>
);

export default InformationCard;

const colors = [
  red[500],
  blue[500],
  green[500],
  orange[500],
  purple[500],
  teal[500],
  yellow[500],
  lime[500],
  amber[500],
  deepOrange[500],
  blueGrey[500],
  pink[500],
];

const shuffle = () => {
  let currentIndex = colors.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;
    // And swap it with the current element.
    [colors[currentIndex], colors[randomIndex]] = [colors[randomIndex], colors[currentIndex]];
  }
  return colors;
};

export { shuffle, colors };
