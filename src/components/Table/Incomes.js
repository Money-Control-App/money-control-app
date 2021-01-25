import React, { useEffect, useState } from 'react';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import AddElementModal from './AddElementModal';
import { DataGrid } from '@material-ui/data-grid';

function Incomes({ incomes, setIncomes }) {
  const [isModalOpen, setModalOpen] = useState(false);
  let incomesArr = [];

  useEffect(() => {
    incomesArr = JSON.parse(localStorage.getItem('incomes'));
  });

  const columns = [
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'description', headerName: 'Description', width: 160 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'money', headerName: 'Money', width: 130 },
  ];

  return (
    <div>
      <form className='table__inputs'>
        <ButtonsForTable clickBtn={() => setModalOpen(true)}>
          Add
        </ButtonsForTable>
      </form>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={incomes} columns={columns} />
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
