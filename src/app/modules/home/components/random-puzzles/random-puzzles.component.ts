import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { translateCategory, translateLevel } from '../../../../util/enum-translation-util';

@Component({
    selector: 'app-random-puzzles',
    templateUrl: './random-puzzles.component.html',
    styleUrls: ['./random-puzzles.component.css']
})
export class RandomPuzzlesComponent implements OnInit {
    readonly translateCategoryFn = translateCategory;
    readonly translateLevelFn = translateLevel;
    readonly faChevronLeft = faChevronLeft as IconProp;
    readonly faChevronRight = faChevronRight as IconProp;
    puzzles: Array<Puzzle> = [];
    currentPuzzle!: Puzzle;
    hasPrevious = false;
    hasNext = false;
    isFetching = true;

    constructor(public puzzleService: PuzzleService) {
    }

    ngOnInit(): void {
        this.getRandomPuzzles();
    }

    stepRight(): void {
        if (!this.hasNext) {
            return;
        }

        let index = this.puzzles.indexOf(this.currentPuzzle);
        if (index < this.puzzles.length - 1) {
            this.currentPuzzle = this.puzzles[index + 1];
            this.hasPrevious = true;
            index += 1;
        }
        if (index === this.puzzles.length - 1) {
            this.hasNext = false;
        }
    }

    stepLeft(): void {
        if (!this.hasPrevious) {
            return;
        }

        let index = this.puzzles.indexOf(this.currentPuzzle);
        if (0 < index) {
            this.currentPuzzle = this.puzzles[index - 1];
            this.hasNext = true;
            index -= 1;
        }
        if (0 === index) {
            this.hasPrevious = false;
        }
    }

    private getRandomPuzzles(): void {
        this.puzzleService.getRandomPuzzles()
            .subscribe(puzzles => {
                this.puzzles = puzzles;
                this.isFetching = false;

                if (this.puzzles.length) {
                    this.currentPuzzle = puzzles[0];
                    if (1 < this.puzzles.length) {
                        this.hasNext = true;
                    }
                }
            });
    }

}
