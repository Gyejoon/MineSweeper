import React from 'react';
import styled from 'styled-components';

const GameHeaderBlock = styled.div`
  flex: 1;
  height: 40px;
  display: table;
  border-bottom: 1px solid #000;
  text-align: center;
  .box {
    display: table-cell;
    vertical-align: middle;
    span {
      padding: 10px;
      font-size: 12px;
    }
  }
`;

interface GameHeaderProps {
  mineCount: number;
  progressTime: number;
  restartGame: () => void;
}

const GameHeader: React.SFC<GameHeaderProps> = props => {
  const { mineCount, progressTime, restartGame } = props;
  return (
    <GameHeaderBlock>
      <div className="box">
        <span>남은 지뢰 : {mineCount}</span>
        <button
          type="button"
          onClick={() => {
            restartGame();
          }}
        >
          게임 초기화
        </button>
        <span>진행 시간 : {progressTime}</span>
      </div>
    </GameHeaderBlock>
  );
};

export default GameHeader;
