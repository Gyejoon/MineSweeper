import React from 'react';
import { observer } from 'mobx-react';

const GameRankingItem = observer(({ ranker, rank }) => {
  return (
    <div className="row center">
      <span className="cell col1">{rank + 1}</span>
      <span className="cell col2">{ranker.nickname}</span>
      <span className="cell col3">{ranker.time}</span>
      <span className="cell col4">
        {`${ranker.recordTime.toLocaleDateString()} ${ranker.recordTime.toLocaleTimeString()}`}
      </span>
    </div>
  );
});
export default GameRankingItem;
