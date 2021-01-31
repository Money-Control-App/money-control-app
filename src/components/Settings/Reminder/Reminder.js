import React, { useState } from "react";
import { AlertOwn } from "../PartsForm/Alert";
import { Checkbox } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Header } from "../PartsForm/Header";
import { Input } from "../PartsForm/Input";

import { parseData, setItemsToLocalStorage } from "./untils";

import "./reminder.sass";

export const Reminder = () => {
  const data = parseData("limit");
  const [isReminderChecked, setIsReminderChecked] = useState(
    data !== null ? data.remind : false
  );
  const [limit, setLimit] = useState(data !== null ? data.limit : "");
  const [limitInPercents, setLimitInPercents] = useState(
    data !== null ? data.limitInPercents : ""
  );

  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState(false);

  const resetAlert = () => {
    setOpen(false);
    setAlert(false);
  };

  const createObject = () => {
    let reminder = {};
    if (
      isReminderChecked &&
      +limit >= 0 &&
      limitInPercents >= 0 &&
      limitInPercents <= 100
    ) {
      reminder = {
        limit: limit,
        limitInPercents: limitInPercents,
        remind: true,
      };
    } else if (!isReminderChecked) {
      reminder = {
        limit: "",
        limitInPercents: "",
        remind: false,
      };
    }

    return reminder;
  };

  const sendData = () => {
    const reminder = createObject();
    setAlert(true);
    setOpen(true);
    setTimeout(resetAlert, 2000);
    setItemsToLocalStorage("limit", reminder);
  };

  return (
    <>
      <div className="wrapper">
        <Header type="Reminder" />
        <div className="reminder-settings">
          <Input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            disabled={!isReminderChecked}
            placeholder="Your limit"
            label="Set the value of limit"
          />

          <Input
            type="number"
            value={limitInPercents}
            onChange={(e) => setLimitInPercents(e.target.value)}
            disabled={!isReminderChecked}
            placeholder="Your percentage limit"
            label="Set the value of a percentage limit"
          />

          <div className="d-flex">
            <Checkbox
              checked={isReminderChecked}
              onChange={() => setIsReminderChecked(!isReminderChecked)}
            />
            <label className="remind-check">
              remind me when my balance will be lower than limit
            </label>
          </div>

          {+limit <= 0 && limit ? (
            <p className="m-botton">
              Нou have entered a number that is less than or equal to 0
            </p>
          ) : null}
          {+limitInPercents < 0 || limitInPercents > 100 ? (
            <p className="m-botton">You entered uncorrec percents value</p>
          ) : null}

          <Button variant="contained" fullWidth onClick={sendData}>
            save changes
          </Button>
        </div>
      </div>
      {alert && (
        <AlertOwn open={open} resetAlert={resetAlert} text="Limit saved" />
      )}
    </>
  );
};
