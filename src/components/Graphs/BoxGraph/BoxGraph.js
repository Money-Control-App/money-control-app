import moment from 'moment';
import React, { useState, useEffect } from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  Hint,
  VerticalBarSeries,
} from 'react-vis';

import BoxGraphCalculation from './BoxGraphCalc';

import '../../../css/sourse/default-styles-vis.css';
import '../GraphNav/graph.sass';

export default function BoxGraph(props) {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  );

  const inputsWitinDates = inputSource.filter(
    (record) =>
      Date.parse(record.date) > Date.parse(props.startDate) &&
      Date.parse(record.date) < Date.parse(props.lastDate),
  );

  const datesInput = [
    ...new Set(
      inputsWitinDates
        .map((record) => (record = record.date))
        .sort()
        .map((date) => (date = moment(date).format('L'))),
    ),
  ];

  const categorySource =
    props.source === 'incomes' ? 'incomeCategories' : 'chargeCategories';

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(categorySource.toString())),
  );

  const inputForBoxGraph = BoxGraphCalculation(
    categories,
    datesInput,
    inputsWitinDates,
  );
  const [hint, setHint] = useState(false);

  return (
    <div>
      <XYPlot width={500} height={400} stackBy='y'>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={(v) => datesInput[v]} title='dates' />
        <YAxis />
        {inputForBoxGraph.map(
          (v, index) =>
            (v = (
              <VerticalBarSeries
                data={v}
                key={index}
                onValueMouseOver={(h) => setHint({ sum: h.y })}
                onSeriesMouseOut={(h) => setHint(false)}
              />
            )),
        )}
        {hint !== false && <Hint value={hint} />}
      </XYPlot>
    </div>
  );
}