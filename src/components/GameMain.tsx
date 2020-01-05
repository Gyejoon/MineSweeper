import React from 'react';
import styled from 'styled-components';
import CellBox from './CellBox';
import useStores from '~helpers/useStores';
import { useObserver } from 'mobx-react';
import { boxValue } from '~utils';

const GameMainBlock = styled.div`
  flex: 1;
  margin-top: 1px;
`;

interface GameMainProps {}

const GameMain: React.SFC<GameMainProps> = () => {
  const { gameStore } = useStores();
  useObserver(() => ({
    opened: gameStore.opened,
    mineCount: gameStore.mineCount,
    boxes: gameStore.boxes,
    isStopGame: gameStore.isStopGame,
    isRestartGame: gameStore.isRestartGame,
  }));
  const {
    opened,
    mineCount,
    boxes,
    isStopGame,
    createFlag,
    deleteFlag,
    startTime,
    updateBox,
    clickNumberBox,
    gameOver,
    gameEnd,
    unRestartGame,
  } = gameStore;

  const expandBox = (key: string) => {
    const row = parseInt(key[0], 10);
    const col = parseInt(key[1], 10);

    const copyObj = Object.assign({}, boxes);
    let copyOpened = 0;

    if (copyObj[key].isFirst === true && isStopGame === false) {
      copyObj[key].isFirst = false;

      // box의 상태가 숫자일 때
      if (copyObj[key].isState > 0) {
        copyObj[key].text = copyObj[key].isState;
        copyObj[key].classList = 'opened';
        copyOpened++;
      }

      // box의 상태가 빈 값(0)일 때
      else if (copyObj[key].isState === 0) {
        copyObj[key].classList = 'opened';
        copyOpened++;

        for (let ii = -1; ii <= 1; ii++) {
          for (let jj = -1; jj <= 1; jj++) {
            if (ii !== 0 || jj !== 0) {
              if (
                boxValue(row + ii, col + jj) !== 9 &&
                boxValue(row + ii, col + jj) !== 'unValue'
              ) {
                expandBox(`${row + ii}${col + jj}`);
              }
            }
          }
        }
      }
    }

    updateBox(copyObj, copyOpened);

    if (opened >= 53) {
      gameEnd();
    }
  };

  const handleBox = (key: string) => {
    if (opened === 0 && isStopGame === false) {
      handleStartTime();
    }

    if (
      boxes[key].text !== '⚑' &&
      boxes[key].isFirst === true &&
      isStopGame === false
    ) {
      if (boxes[key].isState === 0) {
        expandBox(key);
      }

      if (boxes[key].isState > 0 && boxes[key].isState < 9) {
        clickNumberBox(key, boxes[key].isState);
      }

      if (boxes[key].isState === 9) {
        gameOver(key);
      }
    }

    if (opened >= 53) {
      gameEnd();
    }
  };

  const handleStartTime = () => {
    unRestartGame();
    startTime();

    const interval = setInterval(() => {
      if (
        gameStore.opened >= 53 ||
        gameStore.isRestartGame === true ||
        gameStore.isStopGame === true
      ) {
        clearInterval(interval);
      } else {
        startTime();
      }
    }, 1000);
  };

  const handleFlag = (key: string) => {
    if (isStopGame === false && mineCount > 0) {
      if (boxes[key].text === '') {
        createFlag(key);
      } else if (boxes[key].text === '⚑') {
        deleteFlag(key);
      }
    }
  };

  const renderCellBoxList = () => {
    const arrays = Object.keys(boxes).sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10),
    );

    return arrays.map(key => {
      return (
        <CellBox
          id={key}
          text={boxes[key].text}
          className={boxes[key].classList}
          key={key}
          handleBox={handleBox}
          handleFlag={handleFlag}
        />
      );
    });
  };

  return <GameMainBlock>{renderCellBoxList()}</GameMainBlock>;
};

export default GameMain;
