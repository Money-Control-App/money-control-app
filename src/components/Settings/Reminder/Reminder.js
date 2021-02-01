import React, { useState } from "react";
import { Checkbox } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { AlertOwn } from "../PartsForm/Alert";
import { Header } from "../PartsForm/Header";
import { Input } from "../PartsForm/Input";
import { parseData, setItemsToLocalStorage } from "./untils";

import "./reminder.sass";

const DELAY_FOR_ALERT = 2000;

export const Reminder = () => {
  const data = parseData("limit");
  const [isReminderChecked, setIsReminderChecked] = useState(
    data !== null ? data.remind : false
  );
  const [enteredSum, setEnteredSum] = useState(data !== null ? data.limitValue : '')
  const [limitInUah, setLimitInUah] = useState(data !== null ? data.limitInUah : true)
  const [limitInPercents, setLimitInPercents] = useState(data !== null ? data.limitInPercents : false)
  const [isCorrectData, setIsCorrectData] = useState(false)

  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState(false);

  const resetAlert = () => {
    setOpen(false);
    setAlert(false);
  };

  const createObject = () => {
    let reminder = {};
    if (isReminderChecked) {
      setIsCorrectData(true)
      reminder = { limitValue: enteredSum, limitInUah: limitInUah, limitInPercents: limitInPercents, remind: true }
    }
    else {
      setIsCorrectData(true)
      reminder = { limitValue: '', limitInUah: true, limitInPercents: false, remind: false }
    }
    return reminder;
  }

  const isEnteredSumCorrect = (enteredSum) => {
    if (limitInUah && (enteredSum > 0)) return true
    if (limitInPercents && (enteredSum > 0 && enteredSum <= 100)) return true
    return false
  }

  const sendData = () => {
    if (!isReminderChecked || (isReminderChecked && isEnteredSumCorrect(enteredSum))) {
      const reminder = createObject();
      setAlert(true);
      setOpen(true);
      setTimeout(resetAlert, DELAY_FOR_ALERT);
      setItemsToLocalStorage("limit", reminder);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Header type="Reminder" />
        <div className="reminder-settings">
          <Input
            type="number"
            value={enteredSum}
            onChange={(e) => setEnteredSum(e.target.value)}
            disabled={!isReminderChecked}
            placeholder="Your limit"
            label="Set the value of limit"
          />

          <div className='d-flex'>
            <input
              type='checkbox'
              disabled={!isReminderChecked}
              onChange={() => {
                setLimitInUah(!limitInUah)
                setLimitInPercents(!limitInPercents);
              }}
              checked={limitInUah}
            />
            <label className='type-limit'>limit in UAH</label>
          </div>
          <div className='d-flex'>
            <input
              type='checkbox'
              disabled={!isReminderChecked}
              onChange={() => {
                setLimitInPercents(!limitInPercents);
                setLimitInUah(!limitInUah)
              }}
              checked={limitInPercents}
            />
            <label className='type-limit'>limit in percents</label>
          </div>

          <div className="d-flex">
            <Checkbox
              checked={isReminderChecked}
              onChange={() => setIsReminderChecked(!isReminderChecked)}
            />
            <label className="remind-check checkbox-text">
              Remind me when my balance will be lower than limit
            </label>
          </div>

          {limitInUah && enteredSum < 0 ? (<p className='m-botton color-red'>You entered a negative number or equal to 0</p>) : null}
          {limitInPercents && (enteredSum < 0 || enteredSum > 100) ? <p className="m-botton color-red">You entered incorrect percents value</p> : null}

          <Button variant="contained" fullWidth onClick={sendData}>
            save changes
          </Button>
        </div>
      </div>
      {isCorrectData ? (
        alert && (
          <AlertOwn open={open} resetAlert={resetAlert} text="Limit saved" />
        )
      ) : null
      }
    </>
  );
};
