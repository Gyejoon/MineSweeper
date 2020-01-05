import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import useStores from '~helpers/useStores';

const GameResultBlock = styled.div`
  text-align: center;

  .result__save {
    .result__item {
      margin: 5px;
    }

    input {
      background: none;
      border: 0;
      font-size: 22px;
      border-bottom: 2px solid #999;
    }

    input:focus {
      outline: none;
    }

    button {
      all: unset;
      cursor: pointer;
      padding: 5px 0px;
      width: 80px;
      text-align: center;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      border: 2px solid rgba(0, 0, 0, 0.2);
      color: rgba(0, 0, 0, 0.8);
      text-transform: uppercase;
      font-weight: 800;
      font-size: 12px;
    }
  }
`;

interface GameResultProps {
  message: string;
  isSuccess: boolean;
  progressTime: number;
}

const GameResult: React.SFC<GameResultProps> = props => {
  const { message, isSuccess, progressTime } = props;
  const [nickname, setNickName] = useState('');
  const { gameRankingStore, gameStore } = useStores();
  const { registrationRank } = gameRankingStore;
  const { resetGame } = gameStore;

  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleSaveClick = () => {
    if (!nickname) {
      alert('닉네임을 입력하세요.');
      return;
    }

    alert(
      '닉네임 : ' +
        nickname +
        ' 으로 ' +
        progressTime +
        '(초) 기록이 순위에 등록 됩니다.',
    );
    setNickName('');
    registrationRank({
      nickname,
      time: progressTime,
    });
    resetGame();
  };

  return (
    <GameResultBlock>
      <p>{message}</p>
      {isSuccess === true && (
        <>
          <p>기록저장을 하려면 닉네임을 입력하세요.</p>
          <div className="result__save">
            <div className="result__item">
              <input
                type="text"
                value={nickname}
                placeholder="닉네임"
                onChange={handleChangeNickName}
              />
            </div>
            <div className="result__item">
              <button onClick={handleSaveClick}>기록 저장</button>
            </div>
          </div>
        </>
      )}
    </GameResultBlock>
  );
};

export default GameResult;
