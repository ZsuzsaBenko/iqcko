import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';

@Component({
    selector: 'app-admin-puzzles',
    templateUrl: './admin-puzzles.component.html',
    styleUrls: ['./admin-puzzles.component.css']
})
export class AdminPuzzlesComponent implements OnInit {
    puzzles: Array<Puzzle> = [];

    constructor(private readonly puzzleService: PuzzleService) {
    }

    ngOnInit(): void {
        this.puzzleService.getAllPuzzles()
            .subscribe(puzzles => {
                this.puzzles = puzzles;
            });
    }

    onPuzzleDeleted(deletedPuzzle: Puzzle): void {
        this.puzzles = this.puzzles.filter(puzzle => puzzle !== deletedPuzzle);
    }

    onPuzzlesSorted(sortedPuzzles: Array<Puzzle>): void {
        this.puzzles = sortedPuzzles;
    }
}
