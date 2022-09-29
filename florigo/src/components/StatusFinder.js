import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const StatusFinder = ({ children }) => {
  const tags = useSelector((state) => state.orders.tags);

  const TagsFinder = (tag) => tags.find((item) => item.key === tag)?.title;

  return <Box>{TagsFinder(children)}</Box>;
};

export default StatusFinder;
