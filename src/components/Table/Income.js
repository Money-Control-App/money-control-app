import React from "react";

function Income({category, description, date, money}) {
  return (
    <tr>
      <td>{category}</td>
      <td>{description}</td>
      <td>{date}</td>
      <td>{money}</td>
    </tr>
  );
}

export default Income;
