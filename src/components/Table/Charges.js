import React, { useEffect, useState } from "react";
import Charge from "./Charge";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";
import AddElementModal from "./AddElementModal"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Charges({charges,setCharges}) {
  const [isModalOpen,setModalOpen] = useState(false);
  
  let chargesArr = [];

  useEffect(() => {
    chargesArr = JSON.parse(localStorage.getItem("charges"));
  });

  return (
    <div className="charges table">
      <form className="table__inputs table__charges">
      <ButtonsForTable clickBtn={()=>setModalOpen(true)}>
          Add
        </ButtonsForTable>
      </form>
      <Select>
        <MenuItem value='today'>Today</MenuItem>
        <MenuItem value='today'>Today</MenuItem>
        <MenuItem value='today'>Today</MenuItem>
      </Select>
      <table>
        <tbody>
          <tr key="head">
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Money</th>
          </tr>
          {charges.map((charge) => (
            <Charge
              category={charge.category}
              description={charge.description}
              date={charge.date}
              money={charge.money}
              key={charge.chargeKey}
            />
          ))}
        </tbody>
      </table>
      <AddElementModal title="charge" isModalOpen={isModalOpen} setModalOpen={setModalOpen} setElements={setCharges} />
    </div>
  );
}

export default Charges;
