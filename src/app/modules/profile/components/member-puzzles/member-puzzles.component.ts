import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { Category } from '../../../../models/enums';
import { Member, Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { translateCategory, translateLevel } from '../../../../util/enum-translation-util';

@Component({
    selector: 'app-member-puzzles',
    templateUrl: './member-puzzles.component.html',
    styleUrls: ['./member-puzzles.component.css']
})
export class MemberPuzzlesComponent {
    @Input() member!: Member;
    @Input() isAdminPage!: boolean;
    readonly translateCategoryFn = translateCategory;
    readonly translateLevelFn = translateLevel;
    readonly categoryEnum = Category;
    readonly faQuestion = faQuestion as IconProp;
    readonly faSquareRootAlt = faSquareRootAlt as IconProp;
    readonly faDice = faDice as IconProp;
    readonly faFont = faFont as IconProp;
    readonly faPenFancy = faPenFancy as IconProp;
    puzzles: Array<Puzzle> = [];
    isVisible = false;
    puzzlesLoaded = false;

    constructor(private readonly puzzleService: PuzzleService) {
    }

    toggleVisible(): void {
        this.isVisible = !this.isVisible;
        if (!this.puzzlesLoaded && this.isVisible) {
            this.getPuzzles();
        }
    }

    private getPuzzles(): void {
        if (this.isAdminPage) {
            this.puzzleService.getAllPuzzlesByMember(this.member.id).subscribe(puzzles => {
                this.puzzles = puzzles;
                this.puzzlesLoaded = true;
            });
        } else {
            this.puzzleService.getAllPuzzlesByLoggedInMember().subscribe(puzzles => {
                this.puzzles = puzzles;
                this.puzzlesLoaded = true;
            });
        }
    }
}
