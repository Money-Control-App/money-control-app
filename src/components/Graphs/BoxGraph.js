import React, { useState, useEffect } from 'react'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
} from 'react-vis'

import '../../css/sourse/default-styles-vis.css'

export default function BoxGraph(props) {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  )

  const inputsWitinDates = inputSource.filter(
    (record) => record.date > props.startDate && record.date < props.endDate,
  )
  /* ADD DATES IN GRAPH COMPONENT AND CHANGE inputSource TO inputsWitinDates */
  const datesInput = [
    ...new Set(inputSource.map((record) => (record = record.date)).sort()),
  ]
  const categorySource =
    props.source === 'incomes' ? 'incomeCategories' : 'chargeCategories'
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(categorySource.toString())),
  )
  const valuesInput = categories.map((category) => {
    let result = datesInput.map((date, index) => {
      let sum = inputSource
        .filter(
          (input) => input.category == category.name && input.date == date,
        )
        .reduce((total, input) => {
          return total + +input.money
        }, 0)
      return {
        x: index,
        y: sum,
      }
    })
    return result
  })

  return (
    <div>
      <XYPlot width={700} height={500} stackBy='y'>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={(v) => datesInput[v]} title='dates' />
        <YAxis />
        {valuesInput.map((v, index) => v = <VerticalBarSeries data={v} key={index}/>)}
      </XYPlot>
    </div>
  )
}
