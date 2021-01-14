import React, { useEffect, useState } from "react";
import Income from "./Income";
import { Input } from './PartForTable/Input';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';

function* createKeyGenerator() {
  let id = 0;
  while (true) {
    yield id++ + "income";
  }
}

function Incomes() {
  const [incomes, setIncomes] = useState(
    JSON.parse(localStorage.getItem("incomes")) || [
      {
        category: "fuck",
        money: "12",
        description: "shit",
        date: new Date().toLocaleDateString().replace(/\./gi, "/"),
        key: "0income",
      },
    ]
  );
  const category = React.createRef();
  const description = React.createRef();
  const money = React.createRef();
  const keyGenerator = createKeyGenerator();
  let incomesArr = [];

  useEffect(() => {
    if (!localStorage.getItem("incomes")) {
      localStorage.setItem(
        "incomes",
        JSON.stringify([
          {
            category: "fuck",
            money: "12",
            description: "shit",
            date: new Date().toLocaleDateString().replace(/\./gi, "/"),
            key: "0income",
          },
        ])
      );
    }
    incomesArr = JSON.parse(localStorage.getItem("incomes"));
  });

  function addIncome(e) {
    e.preventDefault();
    console.log(incomesArr);
    if (category.current.value && money.current.value > 0) {
      incomesArr.push({
        key: keyGenerator.next().value,
        category: category.current.value,
        description: description.current.value,
        money: money.current.value,
        date: new Date().toLocaleDateString().replace(/\./gi, "/"),
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
        <Input
          ref={category}
          id='category'
          type='text'
          label='Category'
          name='category'
        />
        <Input
          ref={description}
          id='description'
          type='text'
          label='Description'
          name='description'
        />
        <Input
          ref={money}
          id='money'
          type='number'
          label='Money'
          name='money'
          className='input__number'
        />
        <ButtonsForTable
          clickBtn={addIncome}
          className='table__btn'>
          Add
        </ButtonsForTable>
      </form>
      <table>
        <tbody>
          <tr key='head'>
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
