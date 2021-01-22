import { RadialChart, Hint } from 'react-vis';
import React, { useState, useEffect } from 'react';

import './graph.sass';

const RadialGraph = (props) => {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  );

  const categorySource =
    props.source === 'incomes' ? 'incomeCategories' : 'chargeCategories';

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(categorySource.toString())),
  );

  const valuesInput = categories.map((category) => {
    let totalSum = inputSource.reduce((total, input) => {
      return total + +input.money;
    }, 0);

    let catSum = inputSource
      .filter((input) => input.category == category.name)
      .reduce((total, input) => {
        return total + +input.money;
      }, 0);

    return {
      category: category.name,
      sum: Math.round((+catSum / +totalSum) * 100),
    };
  });

  const [hint, setHint] = useState(false);

  return (
    <RadialChart
      className={'donut-chart'}
      innerRadius={100}
      radius={140}
      getAngle={(d) => d.sum}
      data={valuesInput}
      onValueMouseOver={(h) => setHint({ category: h.category, sum: h.sum })}
      onSeriesMouseOut={(h) => setHint(false)}
      width={500}
      height={400}
      padAngle={0.04}
    >
      {hint !== false && <Hint value={hint} />}
    </RadialChart>
  );
};

export default RadialGraph;
