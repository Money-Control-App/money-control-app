import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar';

import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import AddElementModal from './AddElementModal';
import EditElementModal from './EditElementModal';

import standartPhoto from '../../img/newUser/blank_photo.webp';
import './tables.sass';

const avatarUser = JSON.parse(localStorage.getItem('avatar'));

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'money') {
    if (Number(b[orderBy]) < Number(a[orderBy])) {
      return -1;
    }
    if (Number(b[orderBy]) > Number(a[orderBy])) {
      return 1;
    }
  } else if (orderBy === 'date') {
    if (new Date(b[orderBy]) < new Date(a[orderBy])) {
      return -1;
    }
    if (new Date(b[orderBy]) > new Date(a[orderBy])) {
      return 1;
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'avatar', numeric: false, disablePadding: true, label: 'User' },
  { id: 'category', numeric: false, disablePadding: true, label: 'Category' },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'money', numeric: true, disablePadding: false, label: 'Money' },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
            className='table-header'
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const { selected } = props;
  const { rows, setRows } = props;
  const { title } = props;
  const { setSelected } = props;
  const { setFilterDate, setEditOpen } = props;

  const deleteSelected = () => {
    const reduced = rows.reduce((acc, row) => {
      if (selected.indexOf(row.id) === -1) {
        acc.push(row);
      }
      return acc;
    }, []);
    localStorage.setItem(title + 's', JSON.stringify(reduced));
    setRows(reduced);
    setSelected([])
  };

  const editSelected = () => {
    setEditOpen(true)
  }

  const handleOnChange = (event) => {

    switch (event.target.value) {
      case 'all':
        setFilterDate(new Date(0));
        break;
      case '30':
        let monthAgo = new Date();
        monthAgo.setHours(0, 0, 0, 0);
        monthAgo.setDate(new Date().getDate() - 30);
        setFilterDate(monthAgo);
        break;
      case '7':
        let weekAgo = new Date();
        weekAgo.setHours(0, 0, 0, 0);
        weekAgo.setDate(new Date().getDate() - 7);
        setFilterDate(weekAgo);
        break;
      case 'today':
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        setFilterDate(today);
        break;
      default:
        setFilterDate(new Date(0));
        break;
    }
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
          <Typography
            className={classes.title}
            variant='h5'
            id='tableTitle'
            component='div'
          >
            <Select defaultValue='all' onChange={handleOnChange} style={{ width: '150px' }}>
              <MenuItem selected value='all'>All time</MenuItem>
              <MenuItem value='30'>Last 30 days</MenuItem>
              <MenuItem value='7'>Last 7 days</MenuItem>
              <MenuItem value='today'>Today</MenuItem>
            </Select>
          </Typography>
        )}

      {numSelected > 0 ? (
        <>
          {
            numSelected === 1 ? (<Tooltip title='Edit'>
              <IconButton onClick={editSelected} aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Tooltip>) : (<></>)
          }
          <Tooltip title='Delete'>
            <IconButton onClick={deleteSelected} aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
          <></>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginBottom: '20px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ title, rows, setRows }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('category');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false)
  const [filterDate, setFilterDate] = useState(new Date(0))

  let finArr = [];
  const arrayCategories = JSON.parse(
    localStorage.getItem(title + 'Categories')
  );

  useEffect(() => {
    finArr = JSON.parse(localStorage.getItem(title + 's'));
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const finderIcon = (findName) => {
    const idForCategory = arrayCategories.find(
      (category) => category.name === findName
    );
    return idForCategory ? idForCategory.categoryId : 'none';
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
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

  const byDate = (record) => {
    const date = new Date(record.date);
    return date > filterDate
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form className='table__inputs-add'>
          <ButtonsForTable
            className='btn-add'
            clickBtn={() => setModalOpen(true)}
          >
            Add
          </ButtonsForTable>
        </form>
        <EnhancedTableToolbar
          setFilterDate={setFilterDate}
          setSelected={setSelected}
          title={title}
          selected={selected}
          rows={rows}
          setRows={setRows}
          numSelected={selected.length}
          setEditOpen={setEditOpen}
        />
        <TableContainer>
          <Table
            className={(classes.table, 'table-money')}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              // classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).filter(byDate)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        handleClick(event, row.id);
                      }}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        align='center'
                        component='td'
                        id={labelId}
                        scope='row'
                      >
                        <Avatar src={avatarUser ? avatarUser : standartPhoto} />
                      </TableCell>

                      <TableCell
                        align='center'
                        className='category-row'
                        component='td'
                      >
                        <div
                          className='category-icon'
                          style={{
                            background: `url(/img/${title}/${finderIcon(
                              row.category
                            )}.svg)`,
                          }}
                        />
                        <div>{row.category}</div>
                      </TableCell>
                      <TableCell align='center'>{row.description}</TableCell>
                      <TableCell align='center'>
                        {moment(row.date).format('LL')}
                      </TableCell>
                      <TableCell align='center'>{Number(row.money)}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <AddElementModal
        key={title}
        title={title}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setElements={setRows}
      />
      {isEditOpen ? (<EditElementModal
        key={title + 'e'}
        title={title}
        selected={selected}
        setSelected={setSelected}
        isModalOpen={isEditOpen}
        setModalOpen={setEditOpen}
        setElements={setRows}
      />) : (<></>)}
    </div>
  );
}
