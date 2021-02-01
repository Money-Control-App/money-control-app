import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import moment from 'moment';
import React, { useState } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';

import ForecastCalc from './ForecastCalc';

import './forecast.sass';

export default function ForecastGraph() {
  const [incomes, setIncomes] = useState(
    JSON.parse(localStorage.getItem('incomes')),
  );
  const [charges, setCharges] = useState(
    JSON.parse(localStorage.getItem('charges')),
  );

  const startForecast = moment().subtract(28, 'days').calendar();
  const endForecast = moment().add(14, 'days').calendar();

  const inputForIncomesForecast = ForecastCalc(
    incomes,
    startForecast,
    endForecast,
  );
  const inputForChargesForecast = ForecastCalc(
    charges,
    startForecast,
    endForecast,
  );

  const graphLegend = [
    { title: 'Incomes', color: '#2b7634', stroke: '#fff', strokeWidth: '3' },
    { title: 'Expenses', color: '#800000', stroke: '#fff', strokeWidth: '4' },
  ];

  return (
    <div className='forecast-wrapper'>
      <XYPlot width={500} height={300}>
        <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
        <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
        <XAxis
          title='weeks'
          style={{
            line: { stroke: '#ADDDE1' },
            ticks: { stroke: '#ADDDE1' },
            text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
          }}
          tickFormat={(v) => inputForIncomesForecast.dates[v]}
        />
        <YAxis title='money' />
        <LineSeries
          className='first-series'
          color='#2b7634'
          data={inputForIncomesForecast.values}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
          }}
        />
        <LineSeries
          className='first-series'
          color='#800000'
          data={inputForChargesForecast.values}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
          }}
        />
      </XYPlot>
      <DiscreteColorLegend height={200} width={300} items={graphLegend} />
    </div>
  );
}
