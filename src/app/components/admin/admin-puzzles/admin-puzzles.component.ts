import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { Puzzle } from '../../../models/Puzzle';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';

@Component({
  selector: 'app-admin-puzzles',
  templateUrl: './admin-puzzles.component.html',
  styleUrls: ['./admin-puzzles.component.css']
})
export class AdminPuzzlesComponent implements OnInit {
  puzzles: Puzzle[];
  errorMessage = null;
  showError = false;
  faTrash = faTrash;
  faEdit = faEdit;
  faQuestion = faQuestion;
  faSquareRootAlt = faSquareRootAlt;
  faDice = faDice;
  faFont = faFont;
  faPenFancy = faPenFancy;

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

  deletePuzzle(puzzleId: number) {
    if (!confirm('Biztosan törölni akarod ezt a rejtvényt?')) {
      return;
    }

    this.puzzleService.deletePuzzle(puzzleId).subscribe( () => {
      this.puzzles = this.puzzles.filter(puzzle => puzzle.id !== puzzleId);
    },
    error => {
      this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      this.showError = true;
    });
  }

}
