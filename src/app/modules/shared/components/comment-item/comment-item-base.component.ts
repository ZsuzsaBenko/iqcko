import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-comment-item-base',
    template: ''
})
export class CommentItemBaseComponent implements OnDestroy {
    @Output() readonly commentDeleted = new EventEmitter<PuzzleComment>();
    @Input() comment!: PuzzleComment;
    isEditable = false;
    private modalRef?: NgbModalRef;
    private modalSubscription?: Subscription;

    constructor(protected readonly commentService: CommentService,
                protected readonly modalService: NgbModal) {
    }

    ngOnDestroy(): void {
        this.modalSubscription?.unsubscribe();
        this.modalRef?.close();
    }

    deleteComment(id: number): void {
        this.modalRef = this.modalService.open(ConfirmModalComponent,
            {backdrop: 'static', centered: true, keyboard: false});
        this.modalRef.componentInstance.modalRef = this.modalRef;
        this.modalRef.componentInstance.message = 'Biztosan törölni szeretnéd ezt a hozzászólást?';

        this.modalSubscription = this.modalRef.closed
            .pipe(take(1))
            .subscribe(confirmed => {
                if (confirmed) {
                    this.commentService.deleteComment(id).subscribe(() => {
                        this.commentDeleted.emit(this.comment);
                    });
                }
            });
    }

    toggleEditable(): void {
        this.isEditable = !this.isEditable;
    }

    updateComment(id: number): void {
        this.isEditable = false;
        const element: HTMLElement | null = document.querySelector(`.messageText-${id}`);
        const message = element?.textContent?.trim();
        if (message?.length) {
            this.comment.message = message;
            this.sendUpdate(id, this.comment);
        } else if (element) {
            element.textContent = this.comment.message;
        }
    }

    private sendUpdate(id: number, updatedComment: PuzzleComment): void {
        this.commentService.updateComment(id, updatedComment).subscribe((result: PuzzleComment) => {
            updatedComment = result;
        });
    }

}
