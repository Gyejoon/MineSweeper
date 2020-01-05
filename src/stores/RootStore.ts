import GameStore from './GameStore';
import GameRankingStore from './GameRankingStore';

export default class RootStore {
  static instance: RootStore;

  gameStore = new GameStore();
  gameRankingStore = new GameRankingStore();
}
