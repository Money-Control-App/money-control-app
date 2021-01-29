import React, { useEffect, useState } from 'react';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import AddElementModal from './AddElementModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Charges({ charges, setCharges }) {
  const [isModalOpen, setModalOpen] = useState(false);

  let chargesArr = [];

  useEffect(() => {
    chargesArr = JSON.parse(localStorage.getItem('charges'));
  });

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      headerAlign: 'center',
      headerClassName: 'table-header',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 160,
      headerAlign: 'center',
      headerClassName: 'table-header',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 130,
      headerAlign: 'center',
      headerClassName: 'table-header',
    },
    {
      field: 'money',
      headerName: 'Money',
      width: 130,
      headerAlign: 'center',
      headerClassName: 'table-header',
    },
    {
      field: 'user',
      headerName: 'User',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'table-header',
    },
  ];

  const classes = useStyles();
  return (
    <div>
      <form className='table__inputs'>
        <ButtonsForTable clickBtn={() => setModalOpen(true)}>
          Add
        </ButtonsForTable>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Money</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charges.map((charge) => {
              return (
                <TableRow>
                  <TableCell>
                    <Avatar src='../../img/newUser/blank_photowebp' />
                  </TableCell>
                  <TableCell>{charge.category}</TableCell>
                  <TableCell>{charge.category}</TableCell>
                  <TableCell>{charge.description}</TableCell>
                  <TableCell>{charge.date}</TableCell>
                  <TableCell>{charge.money}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AddElementModal
        title='charge'
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setElements={setCharges}
      />
    </div>
  );
}

export default Charges;
