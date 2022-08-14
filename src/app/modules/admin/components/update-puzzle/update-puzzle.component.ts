import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '../../../../models/constants';
import { Category } from '../../../../models/enums';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { translateCategory, translateLevel } from '../../../../util/enum-translation-util';

@Component({
    selector: 'app-update-puzzle',
    templateUrl: './update-puzzle.component.html',
    styleUrls: ['./update-puzzle.component.css']
})
export class UpdatePuzzleComponent implements OnInit {
    readonly translateCategoryFn = translateCategory;
    readonly translateLevelFn = translateLevel;
    puzzle!: Puzzle;
    isPicturePuzzle!: boolean;
    isCipher!: boolean;

    constructor(private readonly puzzleService: PuzzleService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        const puzzleId = this.activatedRoute.snapshot.params.id;
        this.puzzleService.getPuzzleByIdForAdmin(puzzleId)
            .subscribe((puzzle: Puzzle) => {
                    this.puzzle = puzzle;
                    this.isPicturePuzzle = Category.PICTURE_PUZZLE === puzzle.category;
                    this.isCipher = Category.CIPHER === puzzle.category;
                }
            );
    }

    onSubmit(form: NgForm): void {
        if (form.invalid) {
            return;
        }
        this.puzzleService.updatePuzzle(this.puzzle.id, this.puzzle)
            .subscribe(() => {
                this.router.navigate([`${ROUTES.PUZZLES}/${this.puzzle.id}`]);
            });
    }
}
