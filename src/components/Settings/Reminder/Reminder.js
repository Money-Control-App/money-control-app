import React, { useState } from "react";
import { AlertOwn } from "../PartsForm/Alert";
import { Checkbox } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Header } from '../PartsForm/Header';
import { Input } from "../PartsForm/Input";

import { parseData, setItemsToLocalStorage } from './untils'

import './reminder.sass';

export const Reminder = () => {
    const data = parseData('limit')
    const [isReminderChecked, setIsReminderChecked] = useState(data !== null ? data.remind : false)
    const [limit, setLimit] = useState(data !== null ? data.limit : '')

    const [open, setOpen] = useState(true);
    const [alert, setAlert] = useState(false);

    const resetAlert = () => {
        setOpen(false);
        setAlert(false);
    };

    const sendData = () => {
        let reminder = {};
        if (isReminderChecked && +limit > 0) {
            reminder = {
                limit: limit,
                remind: true
            }
        } else if (!isReminderChecked) {
            reminder = {
                limit: '',
                remind: false
            }
        }
        setAlert(true);
        setOpen(true);
        setTimeout(resetAlert, 2000);
        setItemsToLocalStorage('limit', reminder);
    }

    return (
        <>
            <div className='wrapper'>
                <Header type='Reminder' />
                <div className='reminder-settings'>
                    <Input
                        type='number'
                        value={limit}
                        onChange={e => setLimit(e.target.value)}
                        disabled={!isReminderChecked}
                        placeholder='Your limit'
                        label='Set the value of limit'
                    />
                    <div className='d-flex'>
                        <Checkbox
                            checked={isReminderChecked}
                            onChange={() => setIsReminderChecked(!isReminderChecked)}
                        />
                        <label className='remind-check'>remind me when my balance will be lower than limit</label>
                    </div>
                    {+limit <= 0 && limit ? <p>Нou have entered a number that is less than or equal to 0</p> : null}

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={sendData}>
                        save changes
                    </Button>
                </div>
            </div>
            {alert &&
                <AlertOwn
                    open={open}
                    resetAlert={resetAlert}
                    text='Limit saved'
                />
            }
        </>
    )
}