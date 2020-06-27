import {flowMax, addHandlers, addState, SimplePropsAdder} from 'ad-hok'
import {addEffectOnMount, cleanupProps} from 'ad-hok-utils'

type AddWindowSizeType = SimplePropsAdder<{
  windowSize: {
    width: number
    height: number
  }
}>

const addWindowSize: AddWindowSizeType = flowMax(
  addHandlers(
    {
      getWindowSize: () => () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    },
    [],
  ),
  addState('windowSize', 'setWindowSize', ({getWindowSize}) => getWindowSize()),
  addEffectOnMount(({setWindowSize, getWindowSize}) => () => {
    const handleResize = () => {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }),
  cleanupProps(['getWindowSize', 'setWindowSize']),
)

export default addWindowSize
