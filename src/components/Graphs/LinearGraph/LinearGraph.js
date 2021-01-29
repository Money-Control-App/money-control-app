import moment from 'moment';
import React, { useState, useEffect } from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  Hint,
  AreaSeries,
} from 'react-vis';

import LinearGraphCalculation from './LinearGraphCalc';

import '../../../css/sourse/default-styles-vis.css';
import '../GraphNav/graph.sass';

export default function LinearGraph(props) {
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

  const inputForLinearGraph = LinearGraphCalculation(
    datesInput,
    inputsWitinDates,
  );

  const [hint, setHint] = useState(false);

  return (
    <XYPlot width={500} height={400}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickFormat={(v) => datesInput[v]} title='dates' />
      <YAxis />
      <AreaSeries
        className='area-series-example'
        curve='curveMonotoneX'
        data={inputForLinearGraph}
        onValueMouseOver={(h) => setHint({ date: h.x, sum: h.y })}
        onSeriesMouseOut={(h) => setHint(false)}
      />
      {hint !== false && <Hint value={hint} />}
    </XYPlot>
  );
}
