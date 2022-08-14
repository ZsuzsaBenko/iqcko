import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Puzzle, Solution } from 'src/app/models/interfaces';
import { ROUTES } from '../../../../models/constants';
import { Category } from '../../../../models/enums';
import { PuzzleService } from '../../../../services/puzzle.service';
import { SolutionService } from '../../../../services/solution.service';

@Component({
    selector: 'app-puzzles',
    templateUrl: './puzzles.component.html',
    styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {
    puzzles: Array<Puzzle> = [];
    title = '';
    category!: Category;
    isFetching = true;
    private allSolutionsByLoggedInMember?: Array<Solution>;

    constructor(private readonly puzzleService: PuzzleService,
                private readonly solutionService: SolutionService,
                private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loadPuzzles();
    }

    onSort(sortedPuzzles: Array<Puzzle>): void {
        this.puzzles = sortedPuzzles;
        this.findSolvedPuzzles().subscribe();
    }

    private loadPuzzles(): void {
        const url = this.activatedRoute.snapshot.url.toString();
        if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.ALL)) {
            this.getAllPuzzles();
        } else if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.RIDDLES)) {
            this.getPuzzlesByCategory(Category.RIDDLE, 'Fejtörők, találós kérdések');
        } else if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.MATH_PUZZLES)) {
            this.getPuzzlesByCategory(Category.MATH_PUZZLE, 'Matematikai feladványok');
        } else if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.PICTURE_PUZZLES)) {
            this.getPuzzlesByCategory(Category.PICTURE_PUZZLE, 'Képrejtvények');
        } else if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.WORD_PUZZLES)) {
            this.getPuzzlesByCategory(Category.WORD_PUZZLE, 'Nyelvi játékok');
        } else if (url.endsWith(ROUTES.PUZZLE_CATEGORIES.CIPHERS)) {
            this.getPuzzlesByCategory(Category.CIPHER, 'Titkosírás');
        }
    }

    private getAllPuzzles(): void {
        this.puzzleService.getAllPuzzles()
            .pipe(
                tap(puzzles => {
                    this.puzzles = puzzles;
                    this.title = 'Összes rejtvény';
                    this.isFetching = false;
                }),
                switchMap(() => this.findSolvedPuzzles()))
            .subscribe();
    }

    private getPuzzlesByCategory(category: Category, title: string): void {
        this.puzzleService.getPuzzlesByCategory(category)
            .pipe(
                tap(puzzles => {
                    this.puzzles = puzzles;
                    this.category = category;
                    this.title = title;
                    this.isFetching = false;
                }),
                switchMap(() => this.findSolvedPuzzles()))
            .subscribe();
    }

    private findSolvedPuzzles(): Observable<Array<Solution>> {
        if (this.allSolutionsByLoggedInMember) {
            return of(this.allSolutionsByLoggedInMember).pipe(
                tap(() => this.markSolved(this.allSolutionsByLoggedInMember ?? [])));
        }
        return this.solutionService.getAllSolutionsByLoggedInMember()
            .pipe(
                tap(solutions => {
                    this.allSolutionsByLoggedInMember = solutions;
                    this.markSolved(this.allSolutionsByLoggedInMember);
                }));
    }

    private markSolved(solutions: Array<Solution>): void {
        this.puzzles.forEach(puzzle => {
            puzzle.solved = !!solutions.find(solution => solution.puzzle.id === puzzle.id);
        });
    }

}
