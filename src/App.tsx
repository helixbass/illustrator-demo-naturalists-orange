import React, {FC} from 'react'
import {flowMax, addDisplayName, addWrapper, addProps} from 'ad-hok'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'

const HEIGHT = 360
const WIDTH = 504
const SCALE = 1.8
// const {sqrt} = Math
const SQUARE_WIDTH = 240
const SQUARE_STROKE_WIDTH = 4
const SQUARE_OVERLAP = SQUARE_WIDTH * 0.14

interface Point {
  x: number
  y: number
}

interface SquareProps {
  center: Point
}

const Square: FC<SquareProps> = flowMax(
  addDisplayName('Square'),
  addProps(
    ({center: {x, y}}) => ({
      path: `M ${x - SQUARE_WIDTH / 2} ${y} L ${x} ${y - SQUARE_WIDTH / 2} L ${
        x + SQUARE_WIDTH / 2
      } ${y} L ${x} ${y + SQUARE_WIDTH / 2} Z`,
    }),
    ['center'],
  ),
  ({path}) => (
    <path
      d={path}
      stroke={colors.white}
      strokeWidth={SQUARE_STROKE_WIDTH}
      fill="none"
    />
  ),
)

const App: FC = flowMax(
  addDisplayName('App'),
  addWrapper((render) => <div css={styles.page}>{render()}</div>),
  addProps({
    squareCenters: [
      {
        x: WIDTH / 2 - SQUARE_WIDTH + SQUARE_OVERLAP,
        y: HEIGHT / 2 - SQUARE_WIDTH / 2 + SQUARE_OVERLAP / 2,
      },
      {
        x: WIDTH / 2,
        y: HEIGHT / 2 - SQUARE_WIDTH / 2 + SQUARE_OVERLAP / 2,
      },
      {
        x: WIDTH / 2 + SQUARE_WIDTH - SQUARE_OVERLAP,
        y: HEIGHT / 2 - SQUARE_WIDTH / 2 + SQUARE_OVERLAP / 2,
      },
      {
        x: WIDTH / 2 - SQUARE_WIDTH + SQUARE_OVERLAP,
        y: HEIGHT / 2 + SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2,
      },
      {
        x: WIDTH / 2,
        y: HEIGHT / 2 + SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2,
      },
      {
        x: WIDTH / 2 + SQUARE_WIDTH - SQUARE_OVERLAP,
        y: HEIGHT / 2 + SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2,
      },
    ],
  }),
  ({squareCenters}) => (
    <div css={styles.container}>
      <svg
        height={HEIGHT * SCALE}
        width={WIDTH * SCALE}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        {squareCenters.map((center, index) => (
          <Square center={center} key={index} />
        ))}
      </svg>
    </div>
  ),
)

export default App

const styles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    color: colors.white,
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    height: HEIGHT * SCALE,
    width: WIDTH * SCALE,
  },
})
