import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PuzzleService } from '../../../services/puzzle.service';
import { Category } from '../../../models/Category';
import { Puzzle } from '../../../models/Puzzle';

@Component({
  selector: 'app-puzzle-sort',
  templateUrl: './puzzle-sort.component.html',
  styleUrls: ['./puzzle-sort.component.css']
})
export class PuzzleSortComponent implements OnInit {
  @Input() category: Category;
  @Output() puzzlesSorted = new EventEmitter<Puzzle[]>();

  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const sortingParam = form.value.sort;
    if (sortingParam !== '') {
      this.puzzleService.getSortedPuzzles(this.category, sortingParam).subscribe(puzzles => {
        this.puzzlesSorted.emit(puzzles);
      });
    }
  }

}
