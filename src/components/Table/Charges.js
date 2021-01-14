import React from "react";
import Charge from "./Charge";
import { Input } from './PartForTable/Input';
import { ButtonsForTable } from './PartForTable/ButtonsForTable';
import "../../css/elements-style.css";

function* createKeyGenerator() {
  let id = 0;
  while (true) {
    yield id++ + "charge";
  }
}

class Charges extends React.Component {
  constructor(props) {
    super(props);
    this.category = React.createRef();
    this.description = React.createRef();
    this.money = React.createRef();
    this.charges = JSON.parse(localStorage.getItem("charges"));
    this.state = {
      charges: [],
    };
  }

  componentDidMount() { }

  clearInputs = () => {
    this.category.current.value = "";
    this.description.current.value = "";
    this.money.current.value = "";
  };

  keyGenerator = createKeyGenerator();

  addCharge = (e) => {
    e.preventDefault();
    if ((this.money.current.value, this.category.current.value && this.money.current.value > 0)) {
      this.charges = JSON.parse(localStorage.getItem("charges"));
      this.charges.push({
        chargeKey: this.keyGenerator.next().value,
        category: this.category.current.value || "",
        description: this.description.current.value,
        money: this.money.current.value,
        date: new Date().toLocaleDateString().replace(/\./gi, "/"),
      });
      this.clearInputs();
      console.log(this.charges);
      localStorage.setItem("charges", JSON.stringify(this.charges));
      this.setState({
        charges: JSON.parse(localStorage.getItem("charges")),
      });
    }
  };

  render() {
    return (
      <div className="charges table">
        <form className="table__inputs">
          <Input
            ref={this.category}
            id='category'
            type='text'
            label='Category'
            name='category'
          />
          <Input
            ref={this.description}
            id='description'
            type='text'
            label='Description'
            name='description'
          />
          <Input
            ref={this.description}
            id='money'
            type='number'
            label='Money'
            name='money'
          />

          <ButtonsForTable
            clickBtn={this.addCharge}
            className='table__btn'>
            Add
          </ButtonsForTable>
        </form>
        <table>
          <tbody>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Money</th>
            </tr>
            {this.state.charges.map((charge) => (
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
}

export default Charges;
