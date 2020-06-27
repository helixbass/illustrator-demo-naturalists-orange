import {addState, addHandlers, CurriedPropsAdder, flowMax} from 'ad-hok'
import {set as setMutate} from 'lodash'
import {cleanupProps} from 'ad-hok-utils'

export type ElementRef = HTMLElement | SVGElement | null
export type Refs = {
  [name: string]: ElementRef | Refs | ElementRef[]
}

type AddRefsType = <TProps>(
  initial?: Refs,
) => CurriedPropsAdder<
  TProps,
  {
    refs: Refs
    setRef: (name: string) => (ref: ElementRef) => void
  }
>

export const addRefs: AddRefsType = (initial = {}) =>
  flowMax(
    addState('refs', 'setRefs', initial),
    addHandlers({
      setRef: ({refs}) => (name: string) => (ref: ElementRef) => {
        setMutate(refs, name, ref)
      },
    }),
    cleanupProps(['setRefs']),
  )
