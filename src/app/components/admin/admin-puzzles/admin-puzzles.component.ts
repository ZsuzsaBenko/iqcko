import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../../../services/puzzle.service';
import { Puzzle } from '../../../models/Puzzle';

@Component({
  selector: 'app-admin-puzzles',
  templateUrl: './admin-puzzles.component.html',
  styleUrls: ['./admin-puzzles.component.css']
})
export class AdminPuzzlesComponent implements OnInit {
  puzzles: Puzzle[];

  constructor(private puzzleService: PuzzleService) {
  }

  ngOnInit() {
    this.puzzleService.getAllPuzzles().subscribe(puzzles => {
      this.puzzles = puzzles;
    });
  }

  refreshPuzzles(deletedPuzzle: Puzzle) {
    this.puzzles = this.puzzles.filter(puzzle => puzzle !== deletedPuzzle);
  }

  onSort(sortedPuzzles: Puzzle[]) {
    this.puzzles = sortedPuzzles;
  }
}
