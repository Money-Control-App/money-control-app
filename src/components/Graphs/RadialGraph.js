import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './graph.css';

const RadialGraph = (props) => {
  const [inputSource, setInputSource] = useState(
    JSON.parse(localStorage.getItem(props.source.toString())),
  )

  const categorySource =
    props.source === 'incomes' ? 'incomeCategories' : 'chargeCategories'

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(categorySource.toString())),
  )

  const valuesInput = categories.map((category) => {
    let totalSum = inputSource.reduce((total, input) => {
      return total + +input.money
    }, 0)

    let catSum = inputSource
      .filter((input) => input.category == category.name)
      .reduce((total, input) => {
        return total + +input.money
      }, 0)

    return {
      id: category.name,
      value: Math.round((+catSum / +totalSum) * 100),
    }
  })

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    circle: {
      gridRow: 1,
      gridColumn: 1,
      display: 'grid',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    bar: {
      gridRow: 1,
      gridColumn: 1,
      margin: '0 auto',
      zIndex: 1,
    },
    track: {
      gridRow: 1,
      gridColumn: 1,
      margin: '0 auto',
      color: theme.palette.action.hover,
    },
  }))

  const classes = useStyles()

  return (
    <Box className='radial-wrapper'>
      <Box className={classes.root}>
        {valuesInput.map((input, index) => {
          const size = 100 - (index / valuesInput.length) * 100

          const thickness =
            ((10 / valuesInput.length) * 10) /
            (10 - index * (10 / valuesInput.length))
          return (
            <Box key={index} className={classes.circle}>
              <CircularProgress
                size={`${size}%`}
                value={input.value}
                thickness={thickness}
                variant='determinate'
                color='primary'
                className={classes.bar}
              />
              <CircularProgress
                size={`${size}%`}
                value={100}
                thickness={thickness}
                variant='determinate'
                className={classes.track}
              />
            </Box>
          )
        })}
      </Box>
      <Box className='radial-legend'>
        <p>here will be a legend with keys to the graph</p>
      </Box>
    </Box>
  )
}

export default RadialGraph
