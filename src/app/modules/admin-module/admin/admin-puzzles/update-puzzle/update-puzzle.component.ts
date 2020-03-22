import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../../../../../models/Puzzle';
import { PuzzleService } from '../../../../../services/puzzle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../../models/Category';

@Component({
  selector: 'app-update-puzzle',
  templateUrl: './update-puzzle.component.html',
  styleUrls: ['./update-puzzle.component.css']
})
export class UpdatePuzzleComponent implements OnInit {
  puzzle = new Puzzle();
  isPicturePuzzle: boolean;
  isCipher: boolean;

  constructor(public puzzleService: PuzzleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const puzzleId = this.activatedRoute.snapshot.params.id;
    this.puzzleService.getPuzzleByIdForAdmin(puzzleId).subscribe((puzzle: Puzzle) => {
      this.puzzle = puzzle;
      this.isPicturePuzzle = Category.PICTURE_PUZZLE === puzzle.category;
      this.isCipher = Category.CIPHER === puzzle.category;
    });
  }

  onSubmit() {
    this.puzzleService.updatePuzzle(this.puzzle.id, this.puzzle).subscribe(() => {
      this.router.navigate([`puzzles/${this.puzzle.id}`]);
    });
  }
}
