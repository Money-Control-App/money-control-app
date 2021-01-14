import React from "react";

function Income(props) {
  return (
    <tr>
      <td>{props.category}</td>
      <td>{props.description}</td>
      <td>{props.date}</td>
      <td>{props.money}</td>
    </tr>
  );
}

export default Income;
