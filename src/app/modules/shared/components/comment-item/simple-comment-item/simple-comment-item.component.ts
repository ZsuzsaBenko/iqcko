import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from '../../../../../models/interfaces';
import { CommentService } from '../../../../../services/comment.service';
import { CommentItemBaseComponent } from '../comment-item-base.component';

@Component({
    selector: 'app-simple-comment-item',
    templateUrl: './simple-comment-item.component.html',
    styleUrls: ['./simple-comment-item.component.css']
})
export class SimpleCommentItemComponent extends CommentItemBaseComponent implements OnChanges, OnDestroy {
    @Input() loggedInMember!: Member;
    readonly faEdit = faEdit as IconProp;
    isOwnComment!: boolean;

    constructor(protected override readonly commentService: CommentService,
                protected override readonly modalService: NgbModal) {
        super(commentService, modalService);
    }

    ngOnChanges(): void {
        this.isOwnComment = this.comment?.member.id === this.loggedInMember?.id;
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
