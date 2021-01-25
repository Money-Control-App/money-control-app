import React, { useEffect, useState } from 'react';

import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import AddElementModal from './AddElementModal';
import { DataGrid } from '@material-ui/data-grid';

function Charges({ charges, setCharges }) {
  const [isModalOpen, setModalOpen] = useState(false);

  let chargesArr = [];

  useEffect(() => {
    chargesArr = JSON.parse(localStorage.getItem('charges'));
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
        <DataGrid rows={charges} columns={columns} />
      </div>
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
