import React from "react";
import Charge from "./Charge";
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

  componentDidMount() {}

  clearInputs = () => {
    this.category.current.value = "";
    this.description.current.value = "";
    this.money.current.value = "";
  };

  keyGenerator = createKeyGenerator();

  addCharge = (e) => {
    e.preventDefault();
    if ((this.money.current.value, this.category.current.value &&this.money.current.value>0)) {
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
      <div className="Charges">
        <form>
          <input
            className="input"
            type="text"
            placeholder="Category"
            ref={this.category}
          ></input>
          <input
            className="input"
            type="text"
            placeholder="Description"
            ref={this.description}
          ></input>
          <input
            className="input"
            type="number"
            placeholder="Money"
            ref={this.money}
          ></input>
          <button onClick={this.addCharge} className="btn">
            Додати
          </button>
        </form>
        <table>
          <tbody>
            <tr>
              <th>category</th>
              <th>description</th>
              <th>date</th>
              <th>money</th>
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
