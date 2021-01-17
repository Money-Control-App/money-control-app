import React, { useEffect, useState } from "react";
import Income from "./Income";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";

function Incomes() {
  const [incomes, setIncomes] = useState(
    JSON.parse(localStorage.getItem("incomes")) || [
      {
        category: "fuck",
        money: "12",
        description: "shit",
        date: new Date().toLocaleDateString(),
        key: "0income",
      },
    ]
  );
  const category = React.createRef();
  const description = React.createRef();
  const money = React.createRef();
  let incomesArr = [];

  useEffect(() => {
    incomesArr = JSON.parse(localStorage.getItem("incomes"));
  });

  function addIncome(e) {
    e.preventDefault();
    console.log(incomesArr);
    if (category.current.value && money.current.value > 0) {
      incomesArr.push({
        key:
          new Date().getDate() + category.current.value + money.current.value,
        category: category.current.value,
        description: description.current.value,
        money: money.current.value,
        date: new Date().toLocaleDateString(),
      });
      category.current.value = "";
      description.current.value = "";
      money.current.value = "";
    }
    console.log(incomesArr);
    localStorage.setItem("incomes", JSON.stringify(incomesArr));
    console.log(JSON.parse(localStorage.getItem("incomes")));
    setIncomes(JSON.parse(localStorage.getItem("incomes")));
  }

  return (
    <div className="incomes table">
      <form className="table__inputs">
        <select id="income-categories" ref={category}>
          <option disabled>Pick category</option>
          {JSON.parse(localStorage.getItem("incomeCategories")).map(
            (category) => (
              <option value={category.name}>{category.name}</option>
            )
          )}
        </select>
        <Input
          ref={description}
          id="description"
          type="text"
          label="Description"
          name="description"
        />
        <Input
          ref={money}
          id="money"
          type="number"
          label="Money"
          name="money"
        />
        <ButtonsForTable clickBtn={addIncome} className="table__btn">
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
    </div>
  );
}

export default Incomes;
