import React, { useEffect, useState } from "react";
import Income from "./Income";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";
import AddElementModal from "./AddElementModal"

function Incomes({incomes, setIncomes}) {
  const [isModalOpen,setModalOpen] = useState(false);
  let incomesArr = [];

  useEffect(() => {
    incomesArr = JSON.parse(localStorage.getItem("incomes"));
  });

  return (
    <div className="incomes table">
      <form className="table__inputs">
        <ButtonsForTable clickBtn={()=>setModalOpen(true)}>
          Add
        </ButtonsForTable>
      </form>
      <table>
        <tbody>
          <tr key="head">
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Money</th>
          </tr>
          {incomes.map((income) => (
            <Income
              category={income.category}
              description={income.description}
              date={income.date}
              money={income.money}
              key={income.incomeKey}
            />
          ))}
        </tbody>
      </table>
      <AddElementModal title="income" isModalOpen={isModalOpen} setModalOpen={setModalOpen} setElements={setIncomes} />
    </div>
  );
}

export default Incomes;
