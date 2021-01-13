import React from 'react'

function Charge(props){
    return  <tr>
        <th>{props.category}</th>
        <th>{props.description}</th>
        <th>{props.date}</th>
        <th>{props.money}</th>
    </tr>
}

export default Charge;