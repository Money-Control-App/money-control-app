const countBalance = (charges, incomes) => {
    const totalExpense = charges.reduce((total, expense) => total + (+expense.money), 0);
    const totalIncomes = incomes.reduce((total, income) => total + (+income.money), 0);
    return totalIncomes - totalExpense;
}

export default countBalance;