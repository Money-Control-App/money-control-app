import React, {useState, useEffect} from "react";
import {Header} from '../PartsForm/Header';
import {Input} from "../PartsForm/Input";
import {ButtonSubmit} from '../PartsForm/ButtonSubmit'
import {Checkbox} from '@material-ui/core';
import {parseData , setItemsToLocalStorage} from './untils'

import './Reminder.scss'

export const Reminder = () => {
    const data=parseData('limit')
    const [isReminderChecked, setIsReminderChecked] = useState(data!==null?data.remind:false)
    const [limit, setLimit] = useState(data!==null?data.limit:'')

    const sendData=()=>{
        let reminder={}
        if(isReminderChecked && +limit>0){
            reminder={
                limit:limit,
                remind:true
            }
        }
        else  if(!isReminderChecked){
            reminder={
                limit:'',
                remind:false
            }
        }
        setItemsToLocalStorage('limit',reminder)
    }

    return (
        <div className='wrapper'>
            <Header>Reminder</Header>

            <div className='reminder-settings'>
                <Input
                    type='number'
                    value={limit}
                    onChange={e => setLimit(e.target.value)}
                    disabled={!isReminderChecked}
                    />
                <div className='d-flex'>
                    <Checkbox
                        checked={isReminderChecked}
                        onChange={() => setIsReminderChecked(!isReminderChecked)}
                    />
                    <label>remind me when my balance will be lower than limit</label>
                </div>
                {+limit<=0 && limit?<p>Нou have entered a number that is less than or equal to 0</p>:null}

                <button   onClick={sendData} >
                <span>
                    save changes
                </span>
                </button>
            </div>
        </div>
    )
}