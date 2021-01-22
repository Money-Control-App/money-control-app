import React, { useState, useEffect } from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  Hint,
  AreaSeries,
  LineSeries,
} from 'react-vis';

import '../../css/sourse/default-styles-vis.css';
import './graph.sass';

export default function LinearGraph(props) {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  );

  const inputsWitinDates = inputSource.filter(
    (record) => record.date > props.startDate && record.date < props.endDate,
  );
  /* ADD DATES IN GRAPH COMPONENT AND CHANGE inputSource TO inputsWitinDates */
  const datesInput = [
    ...new Set(inputSource.map((record) => (record = record.date)).sort()),
  ];

  const valuesInput = datesInput.map((date, index) => {
    let totalSum = inputSource
      .filter((input) => input.date == date)
      .reduce((total, input) => {
        return total + +input.money;
      }, 0);
    return {
      x: index,
      y: totalSum,
    };
  });
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
        data={valuesInput}
        onValueMouseOver={(h) => setHint({ date: h.x, sum: h.y })}
        onSeriesMouseOut={(h) => setHint(false)}
      />
      {hint !== false && <Hint value={hint} />}
    </XYPlot>
  );
}
