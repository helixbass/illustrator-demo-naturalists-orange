import React, {FC} from 'react'
import {
  flowMax,
  addDisplayName,
  addWrapper,
  addProps,
  addStateHandlers,
} from 'ad-hok'
import {addLayoutEffectOnMount} from 'ad-hok-utils'
import gsap from 'gsap'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {addRefs} from 'utils/refs'
import {radiansToDegrees, PI} from 'utils/angles'
import addRenderingDelay from 'utils/addRenderingDelay'

const HEIGHT = 360
const WIDTH = 504
const SCALE = 1.8
const SQUARE_WIDTH = 240
const SQUARE_STROKE_WIDTH = 3.3
const SQUARE_OVERLAP = SQUARE_WIDTH * 0.2

const SQUARE_ENTRANCE_DURATION = 0.5

interface Point {
  x: number
  y: number
}

type AddSquarePathType = <TProps extends {center: Point}>(
  props: TProps,
) => TProps & {path: string}

const addSquarePath: AddSquarePathType = addProps(
  ({center: {x, y}}) => ({
    path: `M ${x - SQUARE_WIDTH / 2} ${y} L ${x} ${y - SQUARE_WIDTH / 2} L ${
      x + SQUARE_WIDTH / 2
    } ${y} L ${x} ${y + SQUARE_WIDTH / 2} Z`,
  }),
  ['center'],
)

interface SquareProps {
  center: Point
  index: number
  onEntranceComplete: () => void
}

const Square: FC<SquareProps> = flowMax(
  addDisplayName('Square'),
  addRefs,
  addLayoutEffectOnMount(({index, refs, onEntranceComplete}) => () => {
    const {path} = refs
    if (index === 0) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION,
        rotation: radiansToDegrees(-PI),
        x: -SQUARE_WIDTH * 3,
        onUpdate: function () {
          if (this.progress() > 0.3) onEntranceComplete()
        },
      })
    }
    if (index === 1) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION - 0.1,
        y: SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2,
        ease: 'power1.inOut',
        delay: 0.1,
      })
    }
    if (index === 2) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION,
        rotation: radiansToDegrees(PI),
        x: SQUARE_WIDTH * 3,
      })
    }
    if (index === 3) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION,
        rotation: radiansToDegrees(PI),
        x: -SQUARE_WIDTH * 3,
      })
    }
    if (index === 4) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION - 0.1,
        y: -(SQUARE_WIDTH / 2 - SQUARE_OVERLAP / 2),
        ease: 'power1.inOut',
        delay: 0.1,
      })
    }
    if (index === 5) {
      gsap.from(path, {
        duration: SQUARE_ENTRANCE_DURATION,
        rotation: radiansToDegrees(-PI),
        x: SQUARE_WIDTH * 3,
      })
    }
  }),
  addSquarePath,
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

const CenterSquare: FC = flowMax(
  addDisplayName('CenterSquare'),
  addProps({
    center: {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    },
  }),
  addSquarePath,
  addRefs,
  addRenderingDelay(200),
  addLayoutEffectOnMount(({refs}) => () => {
    const {path} = refs
    gsap.from(path, {
      duration: 0.5,
      opacity: 0,
      scale: 0.6,
      ease: 'back.out(1.5)',
    })
  }),
  ({path, center, setRef}) => (
    <path
      ref={setRef('path')}
      d={path}
      stroke={colors.white}
      strokeWidth={SQUARE_STROKE_WIDTH}
      fill={colors.white}
      data-svg-origin={`${center.x} ${center.y}`}
    />
  ),
)

const App: FC = flowMax(
  addDisplayName('App'),
  addWrapper((render) => <div css={styles.page}>{render()}</div>),
  addWrapper((render) => (
    <div css={styles.container}>
      <svg
        height={HEIGHT * SCALE}
        width={WIDTH * SCALE}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        {render()}
      </svg>
    </div>
  )),
  addRenderingDelay(1000),
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
  addStateHandlers(
    {
      isSquareEntranceComplete: false,
    },
    {
      onSquareEntranceComplete: () => () => ({
        isSquareEntranceComplete: true,
      }),
    },
  ),
  ({squareCenters, onSquareEntranceComplete, isSquareEntranceComplete}) => (
    <>
      {squareCenters.map((center, index) => (
        <Square
          center={center}
          index={index}
          onEntranceComplete={onSquareEntranceComplete}
          key={index}
        />
      ))}
      {isSquareEntranceComplete && <CenterSquare />}
    </>
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
