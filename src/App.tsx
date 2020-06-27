import React, {FC} from 'react'
import {
  flowMax,
  addDisplayName,
  addWrapper,
  addProps,
  addStateHandlers,
  SimplePropsAdder,
} from 'ad-hok'
import {addLayoutEffectOnMount} from 'ad-hok-utils'
import gsap from 'gsap'

import {makeStyles} from 'utils/style'
import colors from 'utils/colors'
import {addRefs, ElementRef, Refs} from 'utils/refs'
import {radiansToDegrees, PI} from 'utils/angles'
import addRenderingDelay from 'utils/addRenderingDelay'
import {DrawSVGPlugin} from 'utils/gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

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

type AddLeavesType = SimplePropsAdder<{
  refs: Refs
  setRef: (name: string) => (ref: ElementRef) => void
}>

const addLeaves: AddLeavesType = flowMax(
  addRenderingDelay(860),
  addRefs({
    leafs: [],
  }),
  addLayoutEffectOnMount(({refs}) => () => {
    const {leftStem, centerStem, rightStem, leafs} = refs

    gsap.from(centerStem, {
      duration: 0.4,
      drawSVG: '100% 100%',
      opacity: 0.8,
    })
    gsap.from([leftStem, rightStem], {
      duration: 0.4,
      drawSVG: '100% 100%',
      opacity: 0.8,
    })
    gsap.from(leafs, {
      duration: 0.45,
      opacity: 0,
      delay: 0.2,
      ease: 'linear',
    })
  }),
)

const TopLeaves: FC = flowMax(
  addDisplayName('TopLeaves'),
  addLeaves,
  ({setRef}) => (
    <g transform={`translate(${WIDTH / 2 - 35}, ${HEIGHT / 2 - 81})`}>
      <path
        ref={setRef('leafs.0')}
        css={styles.leafDarkGreen}
        d="M43.91,34.69c6.58-6.52,19.86-5.88,19.86-5.88s0.09,0.01,0.18,0.01c0.01,0.09,0.01,0.18,0.01,0.18 S64.95,42.25,58.6,49c-6.06,6.44-19.1,6.16-20.28,6.12C38.25,53.96,37.62,40.92,43.91,34.69z"
      />
      <path
        ref={setRef('leafs.1')}
        css={styles.leafDarkGreen}
        d="M32.19,47.03c0-11-14.5-15.58-15.09-26.85C16.67,11.99,26.37,4.54,32.2,0c5.83,4.54,15.53,11.99,15.1,20.18 c-0.59,11.27-15.09,15.86-15.09,26.85"
      />
      <path
        ref={setRef('leafs.2')}
        css={styles.leafDarkGreen}
        d="M25.7,55.12C24.52,55.16,11.48,55.45,5.42,49c-6.35-6.75-5.37-20.01-5.37-20.01s0.01-0.09,0.01-0.18 c0.09,0,0.18-0.01,0.18-0.01s13.28-0.64,19.86,5.88C26.4,40.92,25.77,53.96,25.7,55.12z"
      />
      <path
        ref={setRef('leftStem')}
        css={styles.stem}
        d="M 64.27 47.53 h -38.14"
        transform="matrix(0.6979 -0.7162 0.7162 0.6979 -20.7398 46.8815)"
      />
      <path
        ref={setRef('centerStem')}
        css={styles.stem}
        d="M 31.69 11.19 v 59.85"
      />
      <path
        ref={setRef('rightStem')}
        css={styles.stem}
        d="M 18.32 28.95 v 38.14"
        transform="matrix(0.7162 -0.6979 0.6979 0.7162 -28.1778 26.7582)"
      />
    </g>
  ),
)

const BottomLeaves: FC = flowMax(
  addDisplayName('BottomLeaves'),
  addLeaves,
  ({setRef}) => (
    <g transform={`translate(${WIDTH / 2 - 35}, ${HEIGHT / 2 + 12})`}>
      <path
        ref={setRef('leafs.0')}
        css={styles.leafDarkGreen}
        d="M20.11,36.34c-6.58,6.52-19.86,5.88-19.86,5.88s-0.09-0.01-0.18-0.01c-0.01-0.09-0.01-0.18-0.01-0.18 s-0.98-13.26,5.37-20.01c6.06-6.44,19.1-6.16,20.28-6.12C25.77,17.07,26.4,30.11,20.11,36.34z"
      />
      <path
        ref={setRef('leafs.1')}
        css={styles.leafDarkGreen}
        d="M31.83,24c0,11,14.5,15.58,15.09,26.85c0.43,8.19-9.27,15.64-15.1,20.18c-5.83-4.54-15.53-11.99-15.1-20.18 C17.31,39.57,31.81,34.99,31.81,24"
      />
      <path
        ref={setRef('leafs.2')}
        css={styles.leafDarkGreen}
        d="M38.32,15.9c1.18-0.04,14.22-0.32,20.28,6.12c6.35,6.75,5.37,20.01,5.37,20.01s-0.01,0.09-0.01,0.18 c-0.09,0-0.18,0.01-0.18,0.01s-13.28,0.64-19.86-5.88C37.62,30.11,38.25,17.07,38.32,15.9z"
      />
      <path
        ref={setRef('leftStem')}
        css={styles.stem}
        d="M -0.26 22.51 h 38.14"
        transform="matrix(0.6979 -0.7162 0.7162 0.6979 -10.7881 20.4203)"
      />
      <path
        ref={setRef('centerStem')}
        css={styles.stem}
        d="M 31.37 59.85 V 0"
      />
      <path
        ref={setRef('rightStem')}
        css={styles.stem}
        d="M 44.71 42.07 v -38.14"
        transform="matrix(0.7162 -0.6979 0.6979 0.7162 -3.2218 38.0745)"
      />
    </g>
  ),
)

type AddLeafType = SimplePropsAdder<{
  refs: Refs
  setRef: (name: string) => (ref: ElementRef) => void
}>

const addLeaf: AddLeafType = flowMax(
  addRefs(),
  addRenderingDelay(900),
  addLayoutEffectOnMount(({refs}) => () => {
    const {stem, leaf} = refs

    gsap.from(stem, {
      duration: 0.4,
      drawSVG: '100% 100%',
      opacity: 0.8,
    })
    gsap.from(leaf, {
      duration: 0.6,
      opacity: 0,
      delay: 0.1,
    })
  }),
)

const LeafLeft: FC = flowMax(
  addDisplayName('LeafLeft'),
  addLeaf,
  ({setRef}) => (
    <g transform={`translate(${WIDTH / 2 - 92}, ${HEIGHT / 2 - 11.5})`}>
      <path
        ref={setRef('leaf')}
        css={styles.leafLightGreen}
        d="M44.12,13.86c-0.84,2.63-2.43,6.43-5.49,9.42c-7.03,6.86-16.41,4.08-21.13,2.68C8.96,23.42,3.11,17.57,0,13.85 c3.11-3.72,8.96-9.57,17.5-12.1c4.73-1.4,14.1-4.18,21.13,2.68C41.69,7.42,43.28,11.23,44.12,13.86"
      />
      <path ref={setRef('stem')} css={styles.stem} d="M 3.12 13.75 h 44.23" />
    </g>
  ),
)

const LeafRight: FC = flowMax(
  addDisplayName('LeafRight'),
  addLeaf,
  ({setRef}) => (
    <g transform={`translate(${WIDTH / 2 + 44}, ${HEIGHT / 2 - 11.5})`}>
      <path
        ref={setRef('leaf')}
        css={styles.leafLightGreen}
        d="M3.23,13.85c0.84-2.63,2.43-6.43,5.49-9.42c7.03-6.86,16.41-4.08,21.13-2.68c8.54,2.53,14.39,8.38,17.5,12.1 c-3.11,3.72-8.96,9.57-17.5,12.1c-4.73,1.4-14.1,4.18-21.13-2.68C5.66,20.29,4.07,16.48,3.23,13.85"
      />
      <path ref={setRef('stem')} css={styles.stem} d="M 44.23 13.75 H 0" />
    </g>
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
  addProps({
    translateY: HEIGHT / 2 - 2,
  }),
  addLayoutEffectOnMount(({refs, translateY}) => () => {
    const {g} = refs
    gsap.from(g, {
      duration: 1.2,
      opacity: 0,
      scaleX: 0.6,
      y: translateY - 2,
    })
  }),
  ({setRef, translateY}) => (
    <g
      ref={setRef('g')}
      transform={`translate(${WIDTH / 2 - 37}, ${translateY})`}
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
          <LeafLeft />
          <LeafRight />
          <TopLeaves />
          <BottomLeaves />
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
  leafLightGreen: {
    fill: colors.lightGreenLeaf,
  },
  leafDarkGreen: {
    fill: colors.darkGreenLeaf,
  },
  stem: {
    stroke: colors.blackStem,
    strokeWidth: 1.2,
  },
})
