import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { Puzzle } from '../../../models/Puzzle';

@Component({
  selector: 'app-admin-puzzles',
  templateUrl: './admin-puzzles.component.html',
  styleUrls: ['./admin-puzzles.component.css']
})
export class AdminPuzzlesComponent implements OnInit {
  puzzles: Puzzle[];
  errorMessage = null;
  showError = false;

  constructor(private puzzleService: PuzzleService,
              private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.puzzleService.getAllPuzzles().subscribe(puzzles => {
      this.puzzles = puzzles;
    },
    error => {
      this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      this.showError = true;
    });
  }

  refreshPuzzles(deletedPuzzle: Puzzle) {
    this.puzzles = this.puzzles.filter(puzzle => puzzle !== deletedPuzzle);
  }

  onSort(sortedPuzzles: Puzzle[]) {
    this.puzzles = sortedPuzzles;
  }
}
