import countBalance from './countBalance'
import {setItemsToLocalStorage} from "../Settings/Reminder/untils";

export default function Balance ({charges,incomes}) {
    const balance=countBalance(charges,incomes);
    setItemsToLocalStorage('balance',JSON.stringify(balance))
    return <span>{balance}</span>
};