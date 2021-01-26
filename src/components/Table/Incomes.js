import React, { useEffect, useState } from 'react';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import AddElementModal from './AddElementModal';
import { Container } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import './tables.sass';
function Incomes({ incomes, setIncomes }) {
  const [isModalOpen, setModalOpen] = useState(false);
  let incomesArr = [];

  useEffect(() => {
    incomesArr = JSON.parse(localStorage.getItem('incomes'));
  });

  const columns = [
    { field: 'category', headerName: 'Category', width: 130,  headerAlign: 'center', headerClassName:'table-header' },
    { field: 'description', headerName: 'Description', width: 160,  headerAlign: 'center', headerClassName: 'table-header' },
    { field: 'date', headerName: 'Date',  width: 130,  headerAlign: 'center', headerClassName: 'table-header' },
    { field: 'money', headerName: 'Money',  width: 130,  headerAlign: 'center', headerClassName:'table-header' },
    { field: 'user', headerName: 'User',  width: 100,  headerAlign: 'center', headerClassName: 'table-header' },
  ];

  return (
    <div>
      <form className='table__inputs'>
        <ButtonsForTable clickBtn={() => setModalOpen(true)}>
          Add
        </ButtonsForTable>
      </form>
      <div style={{ height: 300}}>
        <DataGrid
          rows={incomes}
          columns={columns}
          autoPageSize
          hideFooter
          autoHeight={true}
          disableColumnMenu
        />
      </div>
      <AddElementModal
        title='income'
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        setElements={setIncomes}
      />
    </div>
  );
}

export default Incomes;
