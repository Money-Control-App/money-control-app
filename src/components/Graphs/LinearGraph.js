import React from 'react';

 import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  LineSeries
} from 'react-vis';

import '../../css/sourse/default-styles-vis.css'

export default function LinearGraph(props) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]}
      />
    </XYPlot>
  );
}