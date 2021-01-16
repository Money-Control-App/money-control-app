import React from 'react';

 import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas
} from 'react-vis';

import '../../css/sourse/default-styles-vis.css'

export default class BoxGraph extends React.Component {
    state = {
      useCanvas: false
    };
    render() {
      const {useCanvas} = this.state;
      const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
      const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
      return (
        <div>
        s
          <XYPlot width={300} height={300} stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <BarSeries data={[{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}]} />
            <BarSeries data={[{x: 2, y: 12}, {x: 4, y: 2}, {x: 5, y: 11}]} />
          </XYPlot>
        </div>
      );
    }
  }