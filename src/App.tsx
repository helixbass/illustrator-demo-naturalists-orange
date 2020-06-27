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
import {addRefs, ElementRef} from 'utils/refs'
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
  addRefs(),
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

const Dots: FC = flowMax(
  addDisplayName('Dots'),
  addRenderingDelay(300),
  addRefs({circles: []}),
  addLayoutEffectOnMount(({refs}) => () => {
    const circles = refs.circles as ElementRef[]
    const indexOrder = [5, 7, 1, 2, 4, 11, 0, 10, 8, 6, 9, 3]
    indexOrder.forEach((circleIndex, orderIndex) => {
      gsap.from(circles[circleIndex], {
        duration: 0.2,
        opacity: 0,
        scale: 0.9,
        delay: orderIndex * 0.1,
      })
    })
  }),
  ({setRef}) => (
    <g transform={`translate(${WIDTH / 2 - 57}, ${HEIGHT / 2 - 41})`}>
      <circle
        ref={setRef('circles.0')}
        css={styles.dotLightOrange}
        cx="6.91"
        cy="8.38"
        r="6.91"
      />
      <circle
        ref={setRef('circles.1')}
        css={styles.dotLightOrange}
        cx="96.67"
        cy="66.42"
        r="6.91"
      />
      <circle
        ref={setRef('circles.2')}
        css={styles.dotDarkOrange}
        cx="17.92"
        cy="17.92"
        r="3.62"
      />
      <circle
        ref={setRef('circles.3')}
        css={styles.dotDarkOrange}
        cx="6.91"
        cy="21.54"
        r="2.3"
      />
      <circle
        ref={setRef('circles.4')}
        css={styles.dotDarkOrange}
        cx="108.02"
        cy="83.52"
        r="2.3"
      />
      <circle
        ref={setRef('circles.5')}
        css={styles.dotLightOrange}
        cx="25.32"
        cy="61.98"
        r="2.3"
      />
      <circle
        ref={setRef('circles.6')}
        css={styles.dotLightOrange}
        cx="20.22"
        cy="71.52"
        r="2.3"
      />
      <circle
        ref={setRef('circles.7')}
        css={styles.dotDarkOrange}
        cx="104.4"
        cy="7.73"
        r="7.73"
      />
      <circle
        ref={setRef('circles.8')}
        css={styles.dotDarkOrange}
        cx="6.91"
        cy="67.41"
        r="5.43"
      />
      <circle
        ref={setRef('circles.9')}
        css={styles.dotLightOrange}
        cx="91.58"
        cy="16.93"
        r="2.63"
      />
      <circle
        ref={setRef('circles.10')}
        css={styles.dotDarkOrange}
        cx="101.11"
        cy="24"
        r="4.46"
      />
      <circle
        ref={setRef('circles.11')}
        css={styles.dotDarkOrange}
        cx="112.46"
        cy="66.42"
        r="4.46"
      />
    </g>
  ),
)

const Name: FC = flowMax(
  addDisplayName('Name'),
  addRefs(),
  addLayoutEffectOnMount(({refs}) => () => {
    const {g} = refs
    gsap.from(g, {
      duration: 1.2,
      opacity: 0,
      scaleX: 0.6,
      y: HEIGHT / 2 - 3,
    })
  }),
  ({setRef}) => (
    <g
      ref={setRef('g')}
      transform={`translate(${WIDTH / 2 - 37}, ${HEIGHT / 2 - 1})`}
      data-svg-origin={`${WIDTH / 2} ${HEIGHT / 2}`}
    >
      <path
        css={styles.orangePath}
        d="M0,5.44V0.15h1.38l2.54,3.24V0.15h1.37v5.29H3.92L1.38,2.2v3.24H0z"
      />
      <path
        css={styles.orangePath}
        d="M12.02,4.52h-1.96L9.74,5.44H8.27l2.01-5.29h1.5l2.01,5.29h-1.47L12.02,4.52z M11.66,3.47l-0.62-1.76 l-0.62,1.76H11.66z"
      />
      <path
        css={styles.orangePath}
        d="M18.8,1.31v4.13h-1.38V1.31h-1.13V0.15h3.64v1.17H18.8z"
      />
      <path
        css={styles.orangePath}
        d="M24.3,0.15v2.88c0,0.15,0.01,0.31,0.02,0.47c0.01,0.16,0.05,0.31,0.11,0.44s0.15,0.24,0.28,0.32 s0.3,0.12,0.53,0.12s0.41-0.04,0.53-0.12s0.22-0.19,0.28-0.32c0.06-0.13,0.1-0.28,0.11-0.44c0.01-0.16,0.02-0.32,0.02-0.47V0.15 h1.37v3.07c0,0.82-0.19,1.42-0.56,1.8c-0.38,0.38-0.96,0.57-1.74,0.57S23.87,5.4,23.5,5.02c-0.38-0.38-0.57-0.98-0.57-1.8V0.15 H24.3z"
      />
      <path
        css={styles.orangePath}
        d="M35.43,5.44h-1.71L32.41,3.4v2.04h-1.38V0.15h2.14c0.29,0,0.55,0.04,0.77,0.13s0.4,0.21,0.54,0.35 s0.25,0.32,0.32,0.52c0.07,0.2,0.11,0.41,0.11,0.63c0,0.4-0.1,0.73-0.29,0.98s-0.48,0.42-0.86,0.51L35.43,5.44z M32.41,2.51h0.26 c0.27,0,0.48-0.06,0.62-0.17c0.14-0.11,0.22-0.27,0.22-0.48c0-0.21-0.07-0.37-0.22-0.48c-0.15-0.11-0.35-0.17-0.62-0.17h-0.26V2.51 z"
      />
      <path
        css={styles.orangePath}
        d="M41.64,4.52h-1.96l-0.32,0.92h-1.47l2.01-5.29h1.5l2.01,5.29h-1.47L41.64,4.52z M41.27,3.47l-0.62-1.76 l-0.62,1.76H41.27z"
      />
      <path
        css={styles.orangePath}
        d="M47.78,0.15v4.13h1.65v1.17h-3.02V0.15H47.78z"
      />
      <path css={styles.orangePath} d="M53.9,0.15v5.29h-1.38V0.15H53.9z" />
      <path
        css={styles.orangePath}
        d="M60.3,1.5c-0.15-0.12-0.3-0.21-0.45-0.27c-0.15-0.06-0.29-0.09-0.44-0.09c-0.18,0-0.32,0.04-0.43,0.13 s-0.17,0.19-0.17,0.33c0,0.09,0.03,0.17,0.08,0.23c0.06,0.06,0.13,0.11,0.22,0.16c0.09,0.04,0.19,0.08,0.31,0.12 c0.12,0.03,0.23,0.07,0.34,0.11c0.45,0.15,0.78,0.35,0.99,0.6c0.21,0.25,0.31,0.58,0.31,0.98c0,0.27-0.04,0.52-0.14,0.74 c-0.09,0.22-0.22,0.41-0.4,0.56c-0.18,0.16-0.39,0.28-0.65,0.37c-0.25,0.09-0.54,0.13-0.87,0.13c-0.67,0-1.29-0.2-1.86-0.6 l0.59-1.11c0.21,0.18,0.41,0.32,0.61,0.41s0.4,0.13,0.6,0.13c0.22,0,0.39-0.05,0.5-0.15c0.11-0.1,0.17-0.22,0.17-0.35 c0-0.08-0.01-0.15-0.04-0.21c-0.03-0.06-0.08-0.11-0.14-0.16s-0.15-0.09-0.26-0.14s-0.23-0.09-0.38-0.14 c-0.18-0.06-0.35-0.12-0.52-0.19c-0.17-0.07-0.32-0.16-0.46-0.27c-0.13-0.11-0.24-0.25-0.32-0.42S57.38,2,57.38,1.74 c0-0.26,0.04-0.5,0.13-0.71s0.21-0.4,0.37-0.55c0.16-0.15,0.35-0.27,0.58-0.35C58.67,0.04,58.93,0,59.21,0 c0.26,0,0.54,0.04,0.82,0.11c0.29,0.07,0.56,0.18,0.82,0.32L60.3,1.5z"
      />
      <path
        css={styles.orangePath}
        d="M66.32,1.31v4.13h-1.38V1.31h-1.13V0.15h3.64v1.17H66.32z"
      />
      <path
        css={styles.orangePath}
        d="M73.35,1.5c-0.15-0.12-0.3-0.21-0.45-0.27c-0.15-0.06-0.29-0.09-0.44-0.09c-0.18,0-0.32,0.04-0.43,0.13 s-0.17,0.19-0.17,0.33c0,0.09,0.03,0.17,0.08,0.23c0.06,0.06,0.13,0.11,0.22,0.16c0.09,0.04,0.19,0.08,0.31,0.12 c0.12,0.03,0.23,0.07,0.34,0.11c0.45,0.15,0.78,0.35,0.99,0.6c0.21,0.25,0.31,0.58,0.31,0.98c0,0.27-0.04,0.52-0.14,0.74 c-0.09,0.22-0.22,0.41-0.4,0.56c-0.18,0.16-0.39,0.28-0.65,0.37c-0.25,0.09-0.54,0.13-0.87,0.13c-0.67,0-1.29-0.2-1.86-0.6 l0.59-1.11c0.21,0.18,0.41,0.32,0.61,0.41s0.4,0.13,0.6,0.13c0.22,0,0.39-0.05,0.5-0.15c0.11-0.1,0.17-0.22,0.17-0.35 c0-0.08-0.01-0.15-0.04-0.21c-0.03-0.06-0.08-0.11-0.14-0.16s-0.15-0.09-0.26-0.14S72,3.32,71.85,3.27 c-0.18-0.06-0.35-0.12-0.52-0.19c-0.17-0.07-0.32-0.16-0.46-0.27c-0.13-0.11-0.24-0.25-0.32-0.42S70.43,2,70.43,1.74 c0-0.26,0.04-0.5,0.13-0.71s0.21-0.4,0.37-0.55c0.16-0.15,0.35-0.27,0.58-0.35C71.72,0.04,71.98,0,72.26,0 c0.26,0,0.54,0.04,0.82,0.11c0.29,0.07,0.56,0.18,0.82,0.32L73.35,1.5z"
      />
    </g>
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
  addRefs(),
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
      {isSquareEntranceComplete && (
        <>
          <CenterSquare />
          <Name />
          <Dots />
        </>
      )}
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
  orangePath: {
    fill: colors.orange,
    stroke: colors.orange,
    strokeWidth: 0.2,
  },
  dotLightOrange: {
    fill: colors.lightOrangeDot,
  },
  dotDarkOrange: {
    fill: colors.darkOrangeDot,
  },
})
