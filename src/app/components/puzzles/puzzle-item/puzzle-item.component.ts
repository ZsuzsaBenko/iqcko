import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { Puzzle } from '../../../models/Puzzle';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-puzzle-item',
  templateUrl: './puzzle-item.component.html',
  styleUrls: ['./puzzle-item.component.css']
})
export class PuzzleItemComponent implements OnInit {
  @Input() puzzle: Puzzle;
  @Output() puzzleDeleted = new EventEmitter<Puzzle>();
  errorMessage = null;
  isAdmin = false;
  faCheck = faCheck;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private puzzleService: PuzzleService,
              private errorHandlerService: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isAdmin = this.activatedRoute.snapshot.url.toString().startsWith('admin');
  }

  deletePuzzle(puzzleId: number) {
    if (!confirm('Biztosan törölni akarod ezt a rejtvényt?')) {
      return;
    }

    this.puzzleService.deletePuzzle(puzzleId).subscribe( () => {
      this.puzzleDeleted.emit(this.puzzle);
      },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
        console.log(this.errorMessage);
      });
  }
}
