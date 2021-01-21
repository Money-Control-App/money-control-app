import React, { useEffect, useState } from "react";
import Income from "./Income";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";
import AddElementModal from "./AddElementModal"

function Incomes() {
  const [isModalOpen,setModalOpen] = useState(false);
  const [incomes, setIncomes] = useState(
    JSON.parse(localStorage.getItem("incomes"))
  );
  const incomeCategory = React.createRef();
  const incomeDescription = React.createRef();
  const incomeMoney = React.createRef();
  let incomesArr = [];

  useEffect(() => {
    incomesArr = JSON.parse(localStorage.getItem("incomes"));
  });

  function addIncome(e) {
    e.preventDefault();
    if (incomeCategory.current.value && incomeMoney.current.value > 0) {
      incomesArr.push({
        key:
          new Date().getDate() +
          incomeCategory.current.value +
          incomeMoney.current.value,
        category: incomeCategory.current.value,
        description: incomeDescription.current.value,
        money: incomeMoney.current.value,
        date: new Date().toLocaleDateString(),
      });
      incomeDescription.current.value = "";
      incomeMoney.current.value = "";
    }
    console.log(incomesArr);
    localStorage.setItem("incomes", JSON.stringify(incomesArr));
    setIncomes(JSON.parse(localStorage.getItem("incomes")));
  }

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
