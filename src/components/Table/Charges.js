import React, { useEffect, useState } from "react";
import Charge from "./Charge";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";

function Charges() {
  const chargeCategory = React.createRef();
  const chargeDescription = React.createRef();
  const chargeMoney = React.createRef();
  const [charges, setCharges] = useState(
    JSON.parse(localStorage.getItem("charges"))
  );
  let chargesArr = [];

  useEffect(() => {
    chargesArr = JSON.parse(localStorage.getItem("charges"));
  });

  function addCharge(e) {
    e.preventDefault();
    console.log(chargesArr);
    if (chargeCategory.current.value && chargeMoney.current.value > 0) {
      chargesArr.push({
        key:
          new Date().getDate() +
          chargeCategory.current.value +
          chargeMoney.current.value,
        category: chargeCategory.current.value,
        description: chargeDescription.current.value,
        money: chargeMoney.current.value,
        date: new Date().toLocaleDateString(),
      });
      chargeDescription.current.value = "";
      chargeMoney.current.value = "";
    }
    console.log(chargesArr);
    localStorage.setItem("charges", JSON.stringify(chargesArr));
    setCharges(JSON.parse(localStorage.getItem("charges")));
  }

  return (
    <div className="charges table">
      <form className="table__inputs table__charges">
        <select id="charge-categories" ref={chargeCategory}>
          <option disabled>Pick category</option>
          {JSON.parse(localStorage.getItem("chargeCategories")).map(
            (category) => (
              <option value={category.name} key={category.categoryId}>
                {category.name}
              </option>
            )
          )}
        </select>
        <Input
          key="6gd4fg5d6f4gd3fg4df5g4"
          ref={chargeDescription}
          id="description"
          type="text"
          label="Description"
          name="description"
        />
        <Input
          key="d7fg68fgd6f8g76"
          ref={chargeMoney}
          id="money"
          type="number"
          label="Money"
          name="money"
        />
        <ButtonsForTable clickBtn={addCharge} className="table__btn">
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
    </div>
  );
}

export default Charges;
