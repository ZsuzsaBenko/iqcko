import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuzzleComment } from '../../../../../models/interfaces';
import { AuthService } from '../../../../../services/auth.service';
import { CommentService } from '../../../../../services/comment.service';
import { CommentItemBaseComponent } from '../comment-item-base.component';

@Component({
    selector: 'app-profile-comment-item',
    templateUrl: './profile-comment-item.component.html',
    styleUrls: ['./profile-comment-item.component.css']
})
export class ProfileCommentItemComponent extends CommentItemBaseComponent implements OnInit, OnDestroy {
    @Input() override comment!: PuzzleComment;
    readonly faEdit = faEdit as IconProp;
    readonly faTrash = faTrash as IconProp;
    isAdmin = false;

    constructor(protected override readonly commentService: CommentService,
                protected override readonly modalService: NgbModal) {
        super(commentService, modalService);
    }

    ngOnInit(): void {
        this.isAdmin = AuthService.isAdmin();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
