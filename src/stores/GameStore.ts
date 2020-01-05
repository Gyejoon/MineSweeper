import autobind from 'autobind-decorator';
import { observable, action, reaction } from 'mobx';
import { setRandomMines } from '~utils';

@autobind
export default class GameStore {
  initMineCount = 10;
  @observable boxes: any = setRandomMines(this.initMineCount);
  @observable opened: number = 0;
  @observable isStopGame: boolean = false;
  @observable isRestartGame: boolean = false;
  @observable isSuccessGame: boolean = false;
  @observable progressTime: number = 0;
  @observable mineCount: number = this.initMineCount;
  @observable message: string = '';

  constructor() {
    reaction(
      () => this.opened,
      opened => {
        if (opened >= 53) {
          this.gameEnd();
        }
      },
    );
  }

  @action
  resetGame() {
    this.boxes = setRandomMines(this.initMineCount);
    this.opened = 0;
    this.isStopGame = false;
    this.progressTime = 0;
    this.mineCount = this.initMineCount;
    this.message = '';
    this.isSuccessGame = false;
  }

  @action
  createFlag(key: string) {
    this.boxes[key] = {
      ...this.boxes[key],
      text: '⚑',
      isFirst: false,
    };
    this.mineCount--;
  }

  @action
  deleteFlag(key: string) {
    this.boxes[key] = {
      ...this.boxes[key],
      text: '',
      isFirst: true,
    };
    this.mineCount++;
  }

  @action
  updateBox(boxes: any, opened: number) {
    this.boxes = boxes;
    this.opened = this.opened + opened;
  }

  clickNumberBox(key: string, num: number) {
    this.boxes[key] = {
      ...this.boxes[key],
      classList: 'opened',
      text: num,
      isFirst: false,
    };

    this.opened++;
  }

  @action
  startTime() {
    this.progressTime++;
  }

  @action
  unRestartGame() {
    this.isRestartGame = false;
  }

  @action
  restartGame() {
    this.resetGame();
    this.isRestartGame = true;
  }

  @action
  gameEnd() {
    // 열린 박스가 53개 이상 인경우
    this.isStopGame = true;
    this.isSuccessGame = true;
    this.message = '축하합니다! 모든 지뢰를 찾았습니다.';
  }

  @action
  gameOver(key: string) {
    let copyBox = {};

    for (const [key, value] of Object.entries(this.boxes)) {
      if (value.isState === 9) {
        copyBox[key] = {
          ...value,
          text: '⊗',
          isFirst: false,
          classList: 'opened',
        };
      } else {
        copyBox[key] = value;
      }
    }

    copyBox[key] = {
      ...this.boxes[key],
      text: '⊗',
      isFirst: false,
      classList: 'opened mine',
    };

    this.boxes = copyBox;
    this.isStopGame = true;
    this.message = '게임 오버! 지뢰를 밟았습니다.';
  }
}
