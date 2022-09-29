import { Box, Toolbar, InputBase, IconButton, Typography } from '@mui/material';
import Iconify from 'components/Iconify';

const CustomToolbar = ({ search, setSearch, children, align = 'right', header = '' }) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    {header && (
      <Box sx={{ minWidth: 250, whiteSpace: 'nowrap' }}>
        <Typography variant="h6">{header}</Typography>
      </Box>
    )}
    {align === 'left' && children}
    <Box display="flex" flexDirection="row" flexWrap="nowrap" sx={{ marginBottom: 1, paddingTop: 1, flex: 1 }}></Box>
    <InputBase
      value={search}
      sx={{ minWidth: '200px', border: '1px solid #d5d5d5', paddingX: '10px', paddingY: '3px', borderRadius: 0 }}
      placeholder="Search"
      inputProps={{ 'aria-label': 'search google maps' }}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      endAdornment={
        <IconButton
          type="submit"
          sx={{ p: '5px' }}
          aria-label="search"
          onClick={() => {
            setSearch('');
          }}
        >
          <Iconify icon="la:times-circle-solid"></Iconify>
        </IconButton>
      }
      startAdornment={
        <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
          <Iconify icon="ant-design:search-outlined"></Iconify>
        </IconButton>
      }
    />

    {align === 'right' && children}
  </Toolbar>
);

export default CustomToolbar;
