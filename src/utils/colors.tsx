import colorUtil from 'color'

export type Color = string

export const atOpacity = (opacity: number) => (color: Color): Color =>
  colorUtil(color)
    .fade(1 - opacity)
    .toString()

export default {
  black: '#000000',
  white: '#ffffff',
  orange: '#ef5d23',
  lightOrangeDot: '#f0825c',
  darkOrangeDot: '#f05d22',
  lightGreenLeaf: '#c9cb42',
  blackStem: '#191125',
}
