import React from 'react';
import Charge from './Charge'

function* createKeyGenerator (){
    let id = 0;
    while (true){
        yield (id++) + 'charge'
    }
}

class Charges extends React.Component{
    constructor(props){
        super(props);
        this.category = React.createRef();
        this.description = React.createRef();
        this.money = React.createRef();
        this.charges = JSON.parse(localStorage.getItem('charges'));
        this.state = {
            charges: [],
        }
    }

    componentDidMount(){

    }

    keyGenerator = createKeyGenerator();

    addCharge = (e) => {
        e.preventDefault();
        this.charges = JSON.parse(localStorage.getItem('charges'));
        this.charges.push({
            chargeKey: this.keyGenerator.next().value,
            category: this.category.current.value,
            description: this.description.current.value,
            money: this.money.current.value,
            date: ( new Date() ).toLocaleDateString().replace(/\./gi,'/')
        });
        console.log(this.charges)
        localStorage.setItem('charges',JSON.stringify(this.charges))
        this.setState({
            charges: JSON.parse(localStorage.getItem('charges')),
        })
    }

    render(){
        return (
            <div className="Charges">
                <form>
                    <input type="text" placeholder="Category" ref={this.category}></input>
                    <input type="text" placeholder="Description" ref={this.description}></input>
                    <input type="text" placeholder="Money" ref={this.money}></input>
                    <button onClick={this.addCharge}>Додати</button>
                </form>
                <table>
                    <tbody>
                        <tr>
                            <th>category</th>
                            <th>description</th>
                            <th>date</th>
                            <th>money</th>
                        </tr>
                        {
                            this.state.charges.map((charge)=><Charge category={charge.category} description={charge.description} date={charge.date} money={charge.money} key={charge.chargeKey}/>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Charges;