import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { ROUTES } from '../../../../models/constants';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { translateCategory, translateLevel } from '../../../../util/enum-translation-util';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-puzzle-item',
    templateUrl: './puzzle-item.component.html',
    styleUrls: ['./puzzle-item.component.css']
})
export class PuzzleItemComponent implements OnInit, OnDestroy {
    @Output() readonly puzzleDeleted = new EventEmitter<Puzzle>();
    @Input() puzzle!: Puzzle;
    readonly updateLink = `/${ROUTES.ADMIN}/${ROUTES.PUZZLES}/${ROUTES.UPDATE}`;
    readonly translateCategoryFn = translateCategory;
    readonly translateLevelFn = translateLevel;
    readonly faCheck = faCheck as IconProp;
    readonly faTrash = faTrash as IconProp;
    readonly faEdit = faEdit as IconProp;
    isAdmin = false;
    private modalRef?: NgbModalRef;
    private modalSubscription?: Subscription;

    constructor(private readonly puzzleService: PuzzleService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.isAdmin = ROUTES.PUZZLES === this.activatedRoute.snapshot.url.toString();
    }

    ngOnDestroy(): void {
        this.modalSubscription?.unsubscribe();
        this.modalRef?.close();
    }

    deletePuzzle(puzzleId: number): void {
        this.modalRef = this.modalService.open(ConfirmModalComponent,
            {backdrop: 'static', centered: true, keyboard: false});
        this.modalRef.componentInstance.modalRef = this.modalRef;
        this.modalRef.componentInstance.message = 'Biztosan törölni szeretnéd ezt a rejtvényt?';

        this.modalSubscription = this.modalRef.closed
            .pipe(take(1))
            .subscribe(confirmed => {
                if (confirmed) {
                    this.puzzleService.deletePuzzle(puzzleId).subscribe(() => {
                        this.puzzleDeleted.emit(this.puzzle);
                    });
                }
            });
    }
}
