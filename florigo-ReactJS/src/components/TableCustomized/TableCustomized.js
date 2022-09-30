import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { useTheme, styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import useSearchEngine from 'hooks/useSearchEngine';

import CustomTollbar from 'components/Toolbar/CustomToolbar';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    borderRadius: 0,
    padding: 0,
    boxShadow: 'none',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
    borderRadius: 0,
    margin: 0,
    boxShadow: 'none',
    backgroundColor: theme.palette.common.light,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, fontFamily: 'arial', fontSize: '10px', alignItems: 'center' }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

const TableCustomized = ({
  rows,
  headCells,
  date = '',
  clear = '',
  children,
  align,
  setSearchText = () => {},
  perpage = 25,
  rowsperpage = [25, 50, 100, { label: 'All', value: -1 }],
  header = '',
}) => {
  const searchEngine = useSearchEngine();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perpage);
  const [headList] = useState(headCells.map((item) => item.id));
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (date !== '') {
      setSearch(date);
    }
  }, [date]);

  useEffect(() => {
    if (clear === '') {
      setSearch('');
    }
  }, [clear]);

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = List.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const List = useMemo(() => searchEngine(rows, search), [rows, search]);

  const Row = ({ row, title }) => {
    const col = headCells.find((item) => item.id === title);

    if (col.component) {
      return col.component(row, title);
    }

    return <div>{row[title]}</div>;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - List.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomTollbar search={search} setSearch={setSearch} align={align} header={header}>
          {children}
        </CustomTollbar>
        <TableContainer component={Paper}>
          <Table aria-labelledby="tableTitle" size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={List.length}
              headCells={headCells}
            />
            <TableBody sx={{ minHeight: 250 }}>
              {stableSort(List, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ margin: '2px', borderBottom: '.1px solid #d5d5d5cf' }}
                  >
                    {headList.map((item, i) => {
                      const { align } = headCells.find((x) => x.id === item);
                      return (
                        <TableCell key={i} align={align}>
                          <Row title={item} row={row}></Row>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 40 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={rowsperpage}
                  colSpan={headCells.length}
                  count={List.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: false,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TableCustomized;
