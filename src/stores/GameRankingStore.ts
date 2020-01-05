import autobind from 'autobind-decorator';
import { observable, action, computed } from 'mobx';
import { getRankers } from '~utils';

export interface Ranker {
  id: number;
  nickname: string;
  time: number;
  recordTime: Date;
}

type RegistrationRankDto = {
  nickname: string;
  time: number;
};

@autobind
export default class GameRankingStore {
  @observable rankers: Ranker[] = getRankers();

  @action
  registrationRank(data: RegistrationRankDto) {
    const size = this.rankers.length;

    this.rankers.push({
      ...data,
      id: size + 1,
      recordTime: new Date(),
    });

    localStorage.setItem('gameRankers', JSON.stringify(this.rankers));
  }

  @computed
  get computedRankers() {
    // 순위 매기는 알고리즘.
    const copyRankers = Object.assign([] as Ranker[], this.rankers);
    const sortedRanker = copyRankers.sort((a, b) => {
      if (a.time > b.time) {
        return 1;
      }

      if (a.time < b.time) {
        return -1;
      }

      return 0;
    });

    // 순위는 10개만 보여준다.
    return sortedRanker.slice(0, 10);
  }
}
