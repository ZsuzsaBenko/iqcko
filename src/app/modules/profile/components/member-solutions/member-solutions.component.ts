import { Component, Input, OnDestroy } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDice } from '@fortawesome/free-solid-svg-icons/faDice';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { faSquareRootAlt } from '@fortawesome/free-solid-svg-icons/faSquareRootAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { Category } from '../../../../models/enums';
import { Member, Solution } from '../../../../models/interfaces';
import { SolutionService } from '../../../../services/solution.service';
import { translateCategory, translateLevel } from '../../../../util/enum-translation-util';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-member-solutions',
    templateUrl: './member-solutions.component.html',
    styleUrls: ['./member-solutions.component.css']
})
export class MemberSolutionsComponent implements OnDestroy {
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
    readonly faTrash = faTrash as IconProp;
    readonly faEdit = faEdit as IconProp;
    solutions: Array<Solution> = [];
    isVisible = false;
    solutionsLoaded = false;
    private modalRef?: NgbModalRef;
    private modalSubscription?: Subscription;

    constructor(private readonly solutionService: SolutionService,
                private readonly modalService: NgbModal) {
    }

    readonly countSpeed = (seconds: number): string => {
        if (59 < seconds) {
            return `${Math.floor(seconds / 60)} perc ${seconds % 60} másodperc`;
        }
        return `${seconds} másodperc`;
    };

    ngOnDestroy(): void {
        this.modalSubscription?.unsubscribe();
        this.modalRef?.close();
    }

    toggleVisible(): void {
        this.isVisible = !this.isVisible;
        if (!this.solutionsLoaded && this.isVisible) {
            this.getSolutions();
        }
    }

    deleteSolution(solutionId: number): void {
        this.modalRef = this.modalService.open(ConfirmModalComponent,
            {backdrop: 'static', centered: true, keyboard: false});
        this.modalRef.componentInstance.modalRef = this.modalRef;
        this.modalRef.componentInstance.message = 'Biztosan törölni szeretnéd ezt a megoldást?';

        this.modalSubscription = this.modalRef.closed
            .pipe(take(1))
            .subscribe(confirmed => {
                if (confirmed) {
                    this.solutionService.deleteSolution(solutionId)
                        .subscribe(() => {
                            this.solutions = this.solutions.filter(solution => solution.id !== solutionId);
                        });
                }
            });

    }

    private getSolutions(): void {
        if (this.isAdminPage) {
            this.getAllSolutionsByMember(this.member.id);
        } else {
            this.getSolutionsByLoggedInMember();
        }
    }

    private getAllSolutionsByMember(idParam: number): void {
        this.solutionService.getAllSolutionsByMember(idParam).subscribe(solutions => {
            this.solutions = solutions;
            this.solutionsLoaded = true;
        });
    }

    private getSolutionsByLoggedInMember(): void {
        this.solutionService.getAllSolutionsByLoggedInMember().subscribe(solutions => {
            this.solutions = solutions;
            this.solutionsLoaded = true;
        });
    }
}
