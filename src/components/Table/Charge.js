import React from 'react'

function Charge({category, description, date, money}){
    return  <tr>
        <td>{category}</td>
        <td>{description}</td>
        <td>{date}</td>
        <td>{money}</td>
    </tr>
}

export default Charge;