import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, of } from 'rxjs';
import { Category } from '../../../../models/enums';
import { Puzzle, Solution } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { SolutionService } from '../../../../services/solution.service';

@Component({
    selector: 'app-puzzle-game',
    templateUrl: './puzzle-game.component.html',
    styleUrls: ['./puzzle-game.component.css']
})
export class PuzzleGameComponent implements OnInit {
    readonly categoryEnum = Category;
    puzzle!: Puzzle;
    rating = 5;
    isFetching = true;
    isSolved = false;
    isIncorrect = false;
    private readonly start = new Date();

    constructor(private readonly puzzleService: PuzzleService,
                private readonly solutionService: SolutionService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly location: Location) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.id;
        this.puzzleService.getPuzzleById(id).subscribe(puzzle => {
            this.puzzle = puzzle;
            this.isFetching = false;
        });
    }

    cancel(): void {
        this.location.back();
    }

    checkAnswer(form: NgForm): void {
        const answer = form.value.answer?.trim().toLowerCase();
        if (answer) {
            form.reset();
            this.checkCorrectAnswer(answer);
        }
    }

    sendSolution(): void {
        if (!this.isSolved) {
            return;
        }

        const end = new Date();
        const diff = Math.round((end.getTime() - this.start.getTime()) / 1000);

        const solution = {
            puzzle: this.puzzle,
            seconds: diff,
            rating: this.rating
        } as unknown as Solution;

        this.solutionService.saveSolution(solution).subscribe(() => {
            this.location.back();
        });
    }

    private checkCorrectAnswer(answer: string): void {
        this.puzzleService.checkAnswer(this.puzzle.id, answer).subscribe(isCorrect => {
            if (isCorrect) {
                this.isSolved = true;
            } else {
                this.isIncorrect = true;
                of('incorrect')
                    .pipe(delay(5000))
                    .subscribe(() => this.isIncorrect = false);
            }
        });
    }
}
