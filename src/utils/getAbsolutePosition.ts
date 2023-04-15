import { Position } from "@config/types/Position"
import { symbolSize } from "@config/variables/variables"

export const getAbsolutePosition = ({x, y}: Position) => {
  const roundTo25 = (i: number) => Math.round(i / 25)*25;
  const map = document.querySelector('div.map')
  const mapCords = map!.getBoundingClientRect()
  const [mapX, mapY] = [roundTo25(mapCords!.x), roundTo25(mapCords!.y)]
  const [playerX, playerY] = [x * symbolSize + mapX + symbolSize / 2, y * symbolSize + mapY + symbolSize / 2]
  return [playerX, playerY]
}