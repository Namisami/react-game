import { gameMap } from "@utils/loadMap";
import store from "@store/index";
import { newMob } from "@store/slices/mobsSlice";

export const loadMobs = () => {
  Array.from(gameMap).map(([blockPosition, { zone: blockZone }]) => {
    if (blockZone !== "ms") {
      return
    }
    let [x, y] = blockPosition.split(',').map(el => parseInt(el))
    // Check because before save file meant new loadMobs call
    if (!store.getState().mobs.mobs.find((mob) => (mob.position.x === x) && (mob.position.y === y))) {
      store.dispatch(newMob({position: {x, y}, hp: 20}));
    }
  })
}