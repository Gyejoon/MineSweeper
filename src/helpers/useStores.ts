import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import GameStore from '~stores/GameStore';
import GameRankingStore from '~stores/GameRankingStore';

interface Store {
  gameStore: GameStore;
  gameRankingStore: GameRankingStore;
}

export default function useStores(): Store {
  return React.useContext<Store>(MobXProviderContext);
}
