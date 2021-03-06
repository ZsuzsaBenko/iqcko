import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { SolutionService } from '../../../services/solution.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { Puzzle } from '../../../models/Puzzle';
import { Solution } from '../../../models/Solution';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.css']
})
export class PuzzleGameComponent implements OnInit {
  puzzle = new Puzzle();
  start: Date;
  rating = 5;
  isFetching = true;
  isSolved = false;
  isIncorrect = false;

  constructor(private puzzleService: PuzzleService,
              private solutionService: SolutionService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.start = new Date();
    const id = this.activatedRoute.snapshot.params.id;
    this.puzzleService.getPuzzleById(id).subscribe(puzzle => {
      this.puzzle = puzzle;
      this.isFetching = false;
    });
  }

  onCancel() {
    this.location.back();
  }

  onCheckAnswer(form: NgForm) {
    let answer = form.value.answer;
    answer = answer.trim().toLowerCase();

    form.reset();

    this.puzzleService.checkAnswer(this.puzzle.id, answer).subscribe(isCorrect => {
      if (isCorrect) {
        this.isSolved = true;
      } else {
        this.isIncorrect = true;
        setTimeout(() => this.isIncorrect = false, 3000);
      }
    });
  }

  onSendSolution() {
    const end = new Date();
    const diff = Math.round((end.getTime() - this.start.getTime()) / 1000);

    const solution = new Solution();
    solution.puzzle = this.puzzle;
    solution.seconds = diff;
    solution.rating = this.rating;

    this.solutionService.saveSolution(solution).subscribe(() => {
      this.location.back();
    });
  }
}
