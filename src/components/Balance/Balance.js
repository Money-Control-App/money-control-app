import React, { useState } from 'react';



    const [incomeSum, setIncomeSum] = useState(
      JSON.parse(localStorage.getItem('incomes')),
    );

    const [expenseSum, setExpenseSum] = useState(
        JSON.parse(localStorage.getItem('charges')),
      );

 export let balance = incomeSum - expenseSum

