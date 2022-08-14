import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../../models/enums';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';

@Component({
    selector: 'app-puzzle-sort',
    templateUrl: './puzzle-sort.component.html',
    styleUrls: ['./puzzle-sort.component.css']
})
export class PuzzleSortComponent {
    @Output() readonly puzzlesSorted = new EventEmitter<Array<Puzzle>>();
    @Input() category!: Category | null;

    constructor(private readonly puzzleService: PuzzleService) {
    }

    onSubmit(form: NgForm): void {
        const sortingParam = form.value.sort;
        if (!!sortingParam) {
            this.puzzleService.getSortedPuzzles(this.category, sortingParam).subscribe(puzzles => {
                this.puzzlesSorted.emit(puzzles);
            });
        }
    }

}
