import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PuzzleService } from '../../../services/puzzle.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { Puzzle } from '../../../models/Puzzle';

import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';

@Component({
  selector: 'app-my-puzzles',
  templateUrl: './my-puzzles.component.html',
  styleUrls: ['./my-puzzles.component.css']
})
export class MyPuzzlesComponent implements OnInit {
  isVisible = false;
  puzzles: Puzzle[];
  errorMessage = '';
  faQuestion = faQuestion;
  faSquareRootAlt = faSquareRootAlt;
  faDice = faDice;
  faFont = faFont;
  faPenFancy = faPenFancy;

  constructor(private puzzleService: PuzzleService,
              private errorHandlerService: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.url.toString().startsWith('admin')) {
      this.puzzleService.getAllPuzzlesByMember(this.activatedRoute.snapshot.params.id).subscribe(puzzles => {
        this.puzzles = puzzles;
      },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
    } else {
      this.puzzleService.getAllPuzzlesByLoggedInMember().subscribe(puzzles => {
        this.puzzles = puzzles;
        },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
    }
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
}
