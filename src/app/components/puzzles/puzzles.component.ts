import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../../services/solution.service';
import { PuzzleService } from '../../services/puzzle.service';
import { Puzzle } from '../../models/Puzzle';
import { Category } from '../../models/Category';
import { Solution } from '../../models/Solution';


@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {
  puzzles: Puzzle[];
  title = '';
  category = null;
  isFetching = true;

  constructor(private puzzleService: PuzzleService,
              private solutionService: SolutionService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const url = this.activatedRoute.snapshot.url.toString();
    if (url.endsWith('all')) {
      this.puzzleService.getAllPuzzles().subscribe(puzzles => {
        this.puzzles = puzzles;
        this.title = 'Összes rejtvény';
        this.isFetching = false;
        this.markSolvedPuzzles();
      });
    } else if (url.endsWith('riddles')) {
      this.puzzleService.getPuzzlesByCategory(Category.RIDDLE).subscribe(puzzles => {
        this.onSuccess(puzzles, Category.RIDDLE, 'Fejtörők, találós kérdések');
      });
    } else if (url.endsWith('math-puzzles')) {
      this.puzzleService.getPuzzlesByCategory(Category.MATH_PUZZLE).subscribe(puzzles => {
        this.onSuccess(puzzles, Category.MATH_PUZZLE, 'Matematikai feladványok');
      });
    } else if (url.endsWith('picture-puzzles')) {
      this.puzzleService.getPuzzlesByCategory(Category.PICTURE_PUZZLE).subscribe(puzzles => {
        this.onSuccess(puzzles, Category.PICTURE_PUZZLE, 'Képrejtvények');
      });
    } else if (url.endsWith('word-puzzles')) {
      this.puzzleService.getPuzzlesByCategory(Category.WORD_PUZZLE).subscribe(puzzles => {
        this.onSuccess(puzzles, Category.WORD_PUZZLE, 'Nyelvi játékok');
      });
    } else if (url.endsWith('ciphers')) {
      this.puzzleService.getPuzzlesByCategory(Category.CIPHER).subscribe(puzzles => {
        this.onSuccess(puzzles, Category.CIPHER, 'Titkosírás');
      });
    }
  }

  onSort(sortedPuzzles: Puzzle[]) {
    this.puzzles = sortedPuzzles;
    this.markSolvedPuzzles();
  }

  private markSolvedPuzzles() {
    this.solutionService.getAllSolutionsByLoggedInMember().subscribe(solutions => {
      this.findSolved(solutions);
    });
  }

  private findSolved(solutions: Solution[]) {
    for (const puzzle of this.puzzles) {
      for (const solution of solutions) {
        if (solution.puzzle.id === puzzle.id) {
          puzzle.solved = true;
          break;
        }
      }
    }
  }

  private onSuccess(puzzles: Puzzle[], category: Category, title: string) {
    this.puzzles = puzzles;
    this.category = category;
    this.title = title;
    this.isFetching = false;
    this.markSolvedPuzzles();
  }

}
