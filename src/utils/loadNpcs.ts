import MapNpcs from '@config/mapNpcs.json';

const MapNpcsObject: { [key: string]: { type: string } } = MapNpcs;

const loadNpcs = () => {
  const gameNpcs: Map<string, { type: string }> = new Map()
  for (const key in MapNpcsObject) {
    gameNpcs.set(key, MapNpcsObject[key])
  }
  return gameNpcs
}

export const gameNpcs: Map<string, { type: string }> = loadNpcs();
