import _Map from '@config/map.json';

interface MapObject {
  [key: string]: { 
    type: string, 
    zone: string, 
  }
}

const map = _Map as unknown as MapObject

const loadMap = () => {
  const gameMap: Map<string, { type: string, zone: string }> = new Map()
  for (const key in map) {
    gameMap.set(key, map[key])
  }
  return gameMap
}

export const gameMap: Map<string, { type: string, zone: string }> = loadMap();
