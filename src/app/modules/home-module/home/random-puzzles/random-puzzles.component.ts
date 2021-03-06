import { Component, OnInit } from '@angular/core';

import { Puzzle } from '../../../../models/Puzzle';
import { PuzzleService } from '../../../../services/puzzle.service';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

@Component({
  selector: 'app-random-puzzles',
  templateUrl: './random-puzzles.component.html',
  styleUrls: ['./random-puzzles.component.css']
})
export class RandomPuzzlesComponent implements OnInit {
  puzzles: Puzzle[];
  currentPuzzle = new Puzzle();
  isPrevious = false;
  isNext = true;
  isFetching = true;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this.puzzleService.getRandomPuzzles().subscribe(puzzles => {
      this.puzzles = puzzles;
      this.currentPuzzle = puzzles[0];
      this.isFetching = false;
    });
  }

  stepRight() {
    if (!this.isNext) {
      return;
    }

    const index = this.puzzles.indexOf(this.currentPuzzle);
    if (index < this.puzzles.length - 1) {
      this.currentPuzzle = this.puzzles[index + 1];
      this.isPrevious = true;
    }
    if (index === this.puzzles.length - 1) {
      this.isNext = false;
    }
  }

  stepLeft() {
    if (!this.isPrevious) {
      return;
    }

    const index = this.puzzles.indexOf(this.currentPuzzle);
    if (index > 0) {
      this.currentPuzzle = this.puzzles[index - 1];
      this.isNext = true;
    }
    if (index === 0) {
      this.isPrevious = false;
    }
  }

}
