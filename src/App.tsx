import React from 'react';
import GameBoard from '~components/GameBoard';
import GameResult from '~components/GameResult';
import GameRanking from '~components/GameRanking';
import useStores from '~helpers/useStores';
import { useObserver } from 'mobx-react';

const App: React.FC = () => {
  const { gameStore } = useStores();
  useObserver(() => ({
    progressTime: gameStore.progressTime,
    isSuccessGame: gameStore.isSuccessGame,
    message: gameStore.message,
  }));
  const { message, isSuccessGame, progressTime } = gameStore;
  return (
    <>
      <GameBoard />
      <GameResult
        isSuccess={isSuccessGame}
        message={message}
        progressTime={progressTime}
      />
      <GameRanking />
    </>
  );
};

export default App;
