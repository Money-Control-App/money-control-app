import React, { useEffect, useState } from "react";
import Charge from "./Charge";
import { Input } from "./PartForTable/Input";
import { ButtonsForTable } from "./PartForTable/ButtonsForTable";
import AddElementModal from "./AddElementModal"

function Charges() {
  const chargeCategory = React.createRef();
  const chargeDescription = React.createRef();
  const chargeMoney = React.createRef();
  const [isModalOpen,setModalOpen] = useState(false);
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
