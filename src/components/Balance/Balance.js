import React, { useState } from 'react';

export function totalBalance () {
    const incomeSum =  JSON.parse(localStorage.getItem('incomes'));
    const expenseSum = JSON.parse(localStorage.getItem('charges'));
    const totalExpense = expenseSum.reduce((total, expense) => total + (+expense.money), 0);

    const totalIncomes = incomeSum.reduce((total, income) => total + (+income.money), 0);
    console.log(totalIncomes, totalExpense)
    return totalIncomes - totalExpense;
};


