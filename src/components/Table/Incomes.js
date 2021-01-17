import React, { useEffect, useState } from "react";
import Income from "./Income";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";

function Incomes() {
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
        <select id="income-categories" ref={incomeCategory}>
          <option disabled>Pick category</option>
          {JSON.parse(localStorage.getItem("incomeCategories")).map(
            (category) => (
              <option value={category.name} key={category.categoryId}>
                {category.name}
              </option>
            )
          )}
        </select>
        <Input
          key="9iu8o78kj9hj79kh87jkh"
          ref={incomeDescription}
          id="description"
          type="text"
          label="Description"
          name="description"
        />
        <Input
          key="21xvc5v1cv23b4ghg5"
          ref={incomeMoney}
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
