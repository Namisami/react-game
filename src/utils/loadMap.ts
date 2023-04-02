import MapObjectJSON from '@config/map.json';

const MapObject: { [key: string]: { type: string } } = MapObjectJSON.map;

export const loadMap = () => {
  const gameMap: Map<string, { type: string }> = new Map()
  for (const key in MapObject) {
    // let blockPosition = key.split(',').map(el => parseInt(el))
    gameMap.set(key, MapObject[key])
  }
  return gameMap
}
