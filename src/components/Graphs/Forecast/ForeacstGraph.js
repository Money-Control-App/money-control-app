import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from 'react-vis';

export default function ForecastGraph(props) {


  return (
    <XYPlot width={500} height={400}>
      <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
      <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
      <XAxis
        title=''
        style={{
          line: { stroke: '#ADDDE1' },
          ticks: { stroke: '#ADDDE1' },
          text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
        }}
      />
      <YAxis title='' />
      <LineSeries
        className='first-series'
        data={[
          { x: 1, y: 3 },
          { x: 2, y: 5 },
          { x: 3, y: 15 },
          { x: 4, y: 12 },
        ]}
        style={{
          strokeLinejoin: 'round',
          strokeWidth: 4,
        }}
      />
      <LineSeries
        className='first-series'
        color = '#800000'
        data={[
          { x: 1, y: 7 },
          { x: 2, y: 11 },
          { x: 3, y: 9 },
          { x: 4, y: 2 },
        ]}
        style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
          }}
      />
    </XYPlot>
  );
}
