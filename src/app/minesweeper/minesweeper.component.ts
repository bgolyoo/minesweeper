import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MineCounterComponent } from './mine-counter/mine-counter.component';
import { Minesweeper } from './minesweeper';
import { TimeCounterComponent } from './time-counter/time-counter.component';

type Params = { width: number; height: number; mineCount: number };

const BEGINNER: Params = { width: 8, height: 8, mineCount: 10 };
const INTERMEDIATE: Params = { width: 16, height: 16, mineCount: 40 };
const EXPERT: Params = { width: 30, height: 16, mineCount: 99 };

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimeCounterComponent, MineCounterComponent],
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperComponent {
  minesweeper = new Minesweeper(8, 8, 10);
  private lastParams: Params = BEGINNER;

  onClick(x: number, y: number) {
    if (this.minesweeper.pristine) {
      this.minesweeper = this.generateGame(this.lastParams, x, y);
    }
    this.minesweeper.open(x, y);
  }

  onRightClick(event: MouseEvent, x: number, y: number) {
    event.preventDefault();
    this.minesweeper.toggleFlag(x, y);
  }

  startBeginnerGame(x?: number, y?: number) {
    this.minesweeper = this.generateGame(BEGINNER, x, y);
    this.lastParams = BEGINNER;
  }

  startIntermediateGame(x?: number, y?: number) {
    this.minesweeper = this.generateGame(INTERMEDIATE, x, y);
    this.lastParams = INTERMEDIATE;
  }

  startExpertGame(x?: number, y?: number) {
    this.minesweeper = this.generateGame(EXPERT, x, y);
    this.lastParams = EXPERT;
  }

  private generateGame(params: Params, x?: number, y?: number) {
    return new Minesweeper(params.width, params.height, params.mineCount, x, y);
  }
}
