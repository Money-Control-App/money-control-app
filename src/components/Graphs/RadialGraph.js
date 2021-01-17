import React from 'react'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import '../../css/sourse/graph.css'

const valuesInput = [
  {
    id: 'type1',
    value: 20,
  },
  {
    id: 'type2',
    value: 40,
  },
  {
    id: 'type3',
    value: 50,
  },
]

const RadialGraph = () => {
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
<p>here will be a legend with keys to the grapg</p>
    </Box>
    </Box>
  )
}

export default RadialGraph
