import countBalance from './countBalance';
import { setItemsToLocalStorage } from '../Settings/Reminder/untils';

import './balance.sass';

export default function Balance({ charges, incomes }) {
  const balance = countBalance(charges, incomes);
  const balanceStyle = balance > 0 ? 'balance-positive' : 'balance-negative';

  setItemsToLocalStorage('balance', JSON.stringify(balance));
  return <span className={balanceStyle}>{balance}</span>;
}
