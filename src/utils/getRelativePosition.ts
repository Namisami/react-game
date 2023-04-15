import { Position } from "@config/types/Position"
import { symbolSize } from "@config/variables/variables"

export const getRelativePosition = ({x, y}: Position) => {
  function div(val: number, by: number){
    return (val - val % by) / by;
  }
  const roundTo25 = (i: number) => Math.ceil(i/25)*25;
  const map = document.querySelector('div.map')
  const mapCords = map!.getBoundingClientRect()
  const [mapX, mapY] = [roundTo25(mapCords!.x), roundTo25(mapCords!.y)]
  const [relativeX, relativeY] = [div(x + symbolSize / 2 - mapX, symbolSize) , div(y + symbolSize / 2 - mapY, symbolSize)]
  return [relativeX, relativeY]
}