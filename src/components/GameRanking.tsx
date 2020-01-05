import React from 'react';
import styled from 'styled-components';
import useStores from '~helpers/useStores';
import { useObserver } from 'mobx-react';
import GameRankingItem from './GameRankingItem';

const GameRakingBlock = styled.div`
  margin: auto;
  display: table;
  .row {
    display: table-row;

    &.head {
      font-weight: 600;
    }
  }

  .cell {
    display: table-cell;
    padding: 3px;
    border-bottom: 1px solid #ddd;
  }

  .center {
    text-align: center;
  }

  .col1 {
    width: 10%;
  }

  .col2 {
    width: 30%;
  }

  .col3 {
    width: 20%;
  }

  .col4 {
    width: 35%;
  }
`;

interface GameRakingProps {}

const GameRaking: React.SFC<GameRakingProps> = () => {
  const { gameRankingStore } = useStores();
  useObserver(() => ({
    computedRankers: gameRankingStore.computedRankers,
  }));
  const { computedRankers } = gameRankingStore;

  const rankerList = () => {
    return computedRankers.map((ranker, index) => (
      <GameRankingItem key={ranker.id} ranker={ranker} rank={index} />
    ));
  };

  return (
    <GameRakingBlock>
      <div className="row head center">
        <span className="cell col1">순위</span>
        <span className="cell col2">닉네임</span>
        <span className="cell col3">기록(초)</span>
        <span className="cell col4">저장시간</span>
      </div>
      {rankerList()}
    </GameRakingBlock>
  );
};

export default GameRaking;
