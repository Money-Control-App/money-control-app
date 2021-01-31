import moment from 'moment'
import { RadialChart, Hint } from 'react-vis';
import React, { useState } from 'react';

import RadialGraphCalculation from './RadialGraphCalc';

import '../GraphNav/graph.sass';

const RadialGraph = (props) => {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  );

  const categorySource =
    props.source === 'incomes' ? 'incomeCategories' : 'chargeCategories';

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(categorySource.toString())),
  );

  const inputsWitinDates = inputSource.filter(
    (record) =>
      Date.parse(record.date) > Date.parse(props.startDate) &&
      Date.parse(record.date) < Date.parse(props.lastDate),
  );

  const inputForRadialGraph = RadialGraphCalculation(categories, inputsWitinDates);

  const [hint, setHint] = useState(false);

  return (
    <RadialChart
      className={'donut-chart'}
      innerRadius={100}
      radius={140}
      getAngle={(d) => d.sum}
      data={inputForRadialGraph}
      onValueMouseOver={(h) => setHint({ category: h.category, sum: h.sum })}
      onSeriesMouseOut={(h) => setHint(false)}
      width={500}
      height={300}
      padAngle={0.04}
    >
      {hint !== false && <Hint value={hint} />}
    </RadialChart>
  );
};

export default RadialGraph;
