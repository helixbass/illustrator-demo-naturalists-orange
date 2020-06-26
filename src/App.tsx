import React, {FC} from 'react'
import {flowMax, addDisplayName, addWrapper, addProps} from 'ad-hok'
import {addLayoutEffectOnMount} from 'ad-hok-utils'
import gsap from 'gsap'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {addRefs} from 'utils/refs'
import {radiansToDegrees, PI} from 'utils/angles'

const HEIGHT = 360
const WIDTH = 504
const SCALE = 1.8
const SQUARE_WIDTH = 240
const SQUARE_STROKE_WIDTH = 3.3
const SQUARE_OVERLAP = SQUARE_WIDTH * 0.2

interface Point {
  x: number
  y: number
}

interface SquareProps {
  center: Point
  index: number
}

const Square: FC<SquareProps> = flowMax(
  addDisplayName('Square'),
  addRefs,
  addLayoutEffectOnMount(({index, refs}) => () => {
    const {path} = refs
    const DURATION = 0.5
    if (index === 0) {
      gsap.from(path, {
        duration: DURATION,
        rotation: radiansToDegrees(-PI),
        x: -SQUARE_WIDTH * 3,
      })
    }
    if (index === 1) {
      gsap.from(path, {
        duration: DURATION - 0.1,
        y: SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2,
        ease: 'power1.inOut',
        delay: 0.1,
      })
    }
    if (index === 2) {
      gsap.from(path, {
        duration: DURATION,
        rotation: radiansToDegrees(PI),
        x: SQUARE_WIDTH * 3,
      })
    }
    if (index === 3) {
      gsap.from(path, {
        duration: DURATION,
        rotation: radiansToDegrees(PI),
        x: -SQUARE_WIDTH * 3,
      })
    }
    if (index === 4) {
      gsap.from(path, {
        duration: DURATION - 0.1,
        y: -(SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2),
        ease: 'power1.inOut',
        delay: 0.1,
      })
    }
    if (index === 5) {
      gsap.from(path, {
        duration: DURATION,
        rotation: radiansToDegrees(-PI),
        x: SQUARE_WIDTH * 3,
      })
    }
  }),
  addProps(
    ({center: {x, y}}) => ({
      path: `M ${x - SQUARE_WIDTH / 2} ${y} L ${x} ${y - SQUARE_WIDTH / 2} L ${
        x + SQUARE_WIDTH / 2
      } ${y} L ${x} ${y + SQUARE_WIDTH / 2} Z`,
    }),
    ['center'],
  ),
  ({path, setRef, center}) => (
    <path
      ref={setRef('path')}
      d={path}
      stroke={colors.white}
      strokeWidth={SQUARE_STROKE_WIDTH}
      fill="none"
      data-svg-origin={`${center.x} ${center.y}`}
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
          <Square center={center} index={index} key={index} />
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
