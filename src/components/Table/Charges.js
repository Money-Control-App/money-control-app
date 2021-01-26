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
    { field: 'category', headerName: 'Category', width: 150,  headerAlign: 'center', headerClassName:'table-header' },
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
      <div style={{ height: 400, width: '80%', display: 'flex' }}>
        <DataGrid 
        rows={charges} 
        columns={columns} 
        autoPageSize
        hideFooter/>
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
