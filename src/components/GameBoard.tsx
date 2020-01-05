import React from 'react';
import styled from 'styled-components';
import GameHeader from './GameHeader';
import GameMain from './GameMain';
import useStores from '~helpers/useStores';
import { useObserver } from 'mobx-react';

const GameBoardBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  width: 249px;
  height: 290px;
  margin: auto;
`;

interface GameBoardProps {}

const GameBoard: React.SFC<GameBoardProps> = () => {
  const { gameStore } = useStores();
  useObserver(() => ({
    mineCount: gameStore.mineCount,
    progressTime: gameStore.progressTime,
  }));
  const { mineCount, progressTime, restartGame } = gameStore;

  return (
    <GameBoardBlock>
      <GameHeader
        mineCount={mineCount}
        progressTime={progressTime}
        restartGame={restartGame}
      />
      <GameMain />
    </GameBoardBlock>
  );
};

export default GameBoard;
